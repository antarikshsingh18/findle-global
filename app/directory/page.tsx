"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import {useSearchParams} from 'next/navigation';
import {Suspense} from 'react';
import Footer from '../components/Footer';
import ShareButton from '../components/ShareButton';
import SiteNavbar from '../components/SiteNavbar';

interface Project {
  id: string;
  title: string;
  price_text: string;
  beds_text: string;
  sqft_text: string;
  image_url: string;
  video_url?: string; // Optional — when present, cards render this instead of image_url
  city: string;
  developer: string;
  selling_status: string;
  is_featured?: boolean;
  neighborhood?: string;
  completionYear?: string;
  is_c21?: boolean;
  highlights?: string[];
  document_links?: string[];
}

// Reusable media block — renders video when video_url is set, otherwise falls back to image.
// Used by both the featured card and the grid cards so the behavior stays consistent.
function PropertyMedia({
  videoUrl,
  imageUrl,
  title,
  className,
}: {
  videoUrl?: string;
  imageUrl?: string;
  title: string;
  className: string;
}) {
  if (videoUrl) {
    return (
      <video
        src={videoUrl}
        className={className}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    );
  }

  if (imageUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={imageUrl} alt={title} className={className} />;
  }

  return (
    <div className="w-full h-full flex items-center justify-center font-mono text-[9px] text-slate-700">
      NO_IMG_MATRIX
    </div>
  );
}

// Trimmed to match your ACTUAL Supabase schema for each table.
// projects has no is_featured / neighborhood columns — c21_portal_listings does.
const PROJECTS_SELECT =
  'id, title, price_text, beds_text, sqft_text, image_url, video_url, city, developer, selling_status';
const C21_SELECT =
  'id, title, price_text, beds_text, sqft_text, image_url, video_url, city, developer, selling_status, is_featured, neighborhood, highlights, document_links';

// Known cities the platform serves — used to detect a city mention in free text.
// Keep this in sync with the city dropdown list further down.
const KNOWN_CITIES = [
  'TORONTO', 'MISSISSAUGA', 'OAKVILLE', 'BRAMPTON', 'WHITBY', 'BARRIE', 'VAUGHAN',
  'BURLINGTON', 'OSHAWA', 'PICKERING', 'RICHMOND HILL', 'MARKHAM', 'CALEDON',
  'NEWMARKET', 'GUELPH', 'MILTON', 'CAMBRIDGE', 'KITCHENER', 'ADJALA-TOSORONTIO',
  'STOUFFVILLE', 'BOWMANVILLE', 'WOODSTOCK', 'ORANGEVILLE', 'ALLISTON', 'WELLAND',
];

const STATUS_KEYWORDS: Record<string, string> = {
  'selling': 'SELLING',
  'sale': 'SELLING',
  'active': 'ACTIVE',
  'registration': 'REGISTRATION',
  'register': 'REGISTRATION',
  'construction': 'CONSTRUCTION',
  'sold out': 'SOLD OUT',
  'sold': 'SOLD OUT',
};

type LocalFilters = {
  city: string | null;
  maxPrice: number | null;
  bedrooms: number | null;
  sellingStatus: string[] | null;
};

// Lightweight local parser — covers structured patterns real users type
// ("2-bed condo under 900k in Brampton") with zero network latency, zero
// AI cost. Anything not matched here (like a property title) is left to
// the plain text fallback in filteredProperties, which ALWAYS runs
// alongside this — so title searches never get silently overridden.
function parseSearchQueryLocally(rawQuery: string): LocalFilters {
  const query = rawQuery.toLowerCase();
  const filters: LocalFilters = {
    city: null,
    maxPrice: null,
    bedrooms: null,
    sellingStatus: null,
  };

  const matchedCity = KNOWN_CITIES.find((city) => query.includes(city.toLowerCase()));
  if (matchedCity) filters.city = matchedCity;

  const priceMatch = query.match(/(?:under|below|max|up to)\s*\$?\s*([\d,.]+)\s*(k|m)?/);
  if (priceMatch) {
    let value = parseFloat(priceMatch[1].replace(/,/g, ''));
    const unit = priceMatch[2];
    if (unit === 'k') value *= 1_000;
    if (unit === 'm') value *= 1_000_000;
    if (!isNaN(value) && value > 0) filters.maxPrice = value;
  }

  const bedMatch = query.match(/(\d+)\s*[-\s]?(?:bed|br|bedroom)/);
  if (bedMatch) {
    const beds = parseInt(bedMatch[1], 10);
    if (!isNaN(beds)) filters.bedrooms = beds;
  }

  const statusHit = Object.keys(STATUS_KEYWORDS).find((kw) => query.includes(kw));
  if (statusHit) filters.sellingStatus = [STATUS_KEYWORDS[statusHit]];

  return filters;
}

 function DirectoryPage() {
  useEffect(() => {
    document.title = "Listings | Findle Global";
  }, []);

  // --- Live Database States ---
  const [properties, setProperties] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchInputRef=useRef<HTMLInputElement>(null);

  // Fetch Live Items from BOTH Supabase tables on Mount
useEffect(() => {
  async function fetchCloudData() {
    try {
      setLoading(true);

      // 🚀 Fetch from both tables in parallel, trimmed to needed columns only
      const [projectsResponse, c21Response] = await Promise.all([
        supabase.from('projects').select(PROJECTS_SELECT),
        supabase.from('c21_portal_listings').select(C21_SELECT)
      ]);

      if (projectsResponse.error) throw projectsResponse.error;
      if (c21Response.error) throw c21Response.error;

      const projectData = projectsResponse.data || [];
      const c21Data = c21Response.data || [];

      // 1. Keep your original table listings exactly as they were
      const normalizedProjects = projectData.map((item: any) => ({
        ...item,
        is_c21: false
      }));

      // 2. Map your new C21 listing columns into your frontend Project shape
      const normalizedC21 = c21Data.map((item: any) => ({
        id: `c21-${item.id}`, // Add a prefix to prevent key clashing
        title: item.title,
        price_text: item.price_text || "CONTACT FOR PRICING",
        beds_text: item.beds_text || "See Specs",
        sqft_text: item.sqft_text || "Spacious",
        image_url: item.image_url || "/fallback-estate.jpg",
        video_url: item.video_url || undefined,
        city: item.city,
        developer: item.developer || "Century 21 Partner",
        selling_status: item.selling_status || "ACTIVE",
        is_featured: item.is_featured || false,
        neighborhood: item.neighborhood || "",
        is_c21: true,
        highlights: item.highlights || [],          //Pass down your new array layers
        document_links: item.document_links || []
      }));

      // 🔄 Combine them together into your unified feed state
      setProperties([...normalizedProjects, ...normalizedC21]);

    } catch (err) {
      console.error('Error fetching database nodes:', err);
    } finally {
      setLoading(false);
    }
  }
  
  fetchCloudData();
}, []);

useEffect(() => {
  if (searchParams.get('focus') === 'search') {
    setTimeout(() => {
      searchInputRef.current?.focus();
      searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }
}, [searchParams]);
  
  // --- Filtering Engine States ---
  const [searchQuery, setSearchQuery] = useState('');
  // Debounced copy used for filtering, so we don't re-filter the whole array
  // on every keystroke. The input itself still updates instantly via
  // searchQuery / onChange below.
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [aiFilters, setAiFilters] = useState<{
    title: string | null;
    city: string | null;
    maxPrice: number | null;
    bedrooms: number | null;
    sellingStatus: string[] | null;
    developer: string | null;
  } | null>(null);

  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const cityFromUrl = searchParams.get('city');
  const [selectedCity, setSelectedCity] = useState<string>(
    cityFromUrl ? cityFromUrl.toUpperCase() : 'ALL'
  );

  useEffect(() => {
    if (cityFromUrl) {
      setSelectedCity(cityFromUrl.toUpperCase());
    } else {
      setSelectedCity('ALL');
    }
  }, [cityFromUrl]);

  const [selectedStage, setSelectedStage] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'GRID' | 'MAP'>('GRID');

  // Debounce the raw search text before it drives filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery.trim());
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Trigger LLM parsing with a debounce when search query changes.
  // The local parser (below) still runs instantly in the meantime, so the
  // UI isn't waiting on the network for basic filtering to work.
  useEffect(() => {
    const query = searchQuery.trim();
    if (!query) {
      setAiFilters(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch('/api/parse-search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        });
        const data = await res.json();
        if (data.filters) {
          setAiFilters(data.filters);
        }
      } catch (err) {
        console.error("Failed to parse search via AI:", err);
        setAiFilters(null); // fall back to local parser + text match on failure
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // --- Natural Language & Standard Filtering Engine Logic ---
  const localFilters = useMemo(
    () => parseSearchQueryLocally(debouncedSearchQuery),
    [debouncedSearchQuery]
  );

  // Memoized so this only recomputes when something that actually affects
  // the result set changes — not on every unrelated re-render (e.g. card
  // hover state, view mode toggle).
  const filteredProperties = useMemo(() => {
    const query = debouncedSearchQuery.toLowerCase().trim();

    // AI-extracted values win when present; local parser fills in anything
    // the AI call hasn't returned yet (or failed on). Either way, structured
    // filters and text matching are independent — never either/or.
    const effectiveCity = aiFilters?.city ?? localFilters.city;
    const effectiveMaxPrice = aiFilters?.maxPrice ?? localFilters.maxPrice;
    const effectiveBedrooms = aiFilters?.bedrooms ?? localFilters.bedrooms;
    const effectiveStatus = aiFilters?.sellingStatus ?? localFilters.sellingStatus;
    const effectiveDeveloper = aiFilters?.developer ?? null;
    const effectiveTitle = aiFilters?.title ?? null;

    return properties.filter((property) => {
      // 1. Structured filters — applied whenever detected, from AI or local parser
      if (effectiveMaxPrice !== null && property.price_text) {
        const propPriceNum = parseInt(property.price_text.replace(/[^0-9]/g, '')) || 0;
        if (propPriceNum > 0 && propPriceNum > effectiveMaxPrice) return false;
      }

      if (effectiveBedrooms !== null && effectiveBedrooms !== undefined && property.beds_text) {
        const hasBedMatch = property.beds_text.includes(String(effectiveBedrooms));
        if (!hasBedMatch) return false;
      }

      if (effectiveStatus && effectiveStatus.length > 0) {
        const matchesStatus = effectiveStatus.some(status =>
          (property.selling_status || '').toLowerCase().includes(status.toLowerCase())
        );
        if (!matchesStatus) return false;
      }

      if (effectiveDeveloper && property.developer) {
        if (!property.developer.toLowerCase().includes(effectiveDeveloper.toLowerCase())) return false;
      }

      // 2. Text match ALWAYS applies when there's a query — this is the fix.
      // Previously this only ran when aiFilters was null, so a resolved AI
      // response (even with every field null) silently disabled title search.
      if (query) {
        const titleMatch = property.title?.toLowerCase().includes(query) || false;
        const developerMatch = property.developer?.toLowerCase().includes(query) || false;
        const locationMatch = (property.neighborhood || property.city || '').toLowerCase().includes(query);
        const cityMatch = effectiveCity
          ? (property.city || '').toLowerCase().includes(effectiveCity.toLowerCase())
          : false;
        const aiTitleMatch = effectiveTitle
          ? (property.title || '').toLowerCase().includes(effectiveTitle.toLowerCase())
          : false;
        if (!titleMatch && !developerMatch && !locationMatch && !cityMatch && !aiTitleMatch) return false;
      }

      // 3. UI Dropdown filters (Dropdown overrides take priority)
      const matchesCity = selectedCity === 'ALL' || (property.city && property.city.toUpperCase() === selectedCity.toUpperCase());

      const currentStatus = property.selling_status || 'SELLING';
      const matchesStage = selectedStage === 'ALL' ||
        (selectedStage === 'SELLING' && currentStatus.toUpperCase() === 'ACTIVE') ||
        currentStatus.toUpperCase() === selectedStage.toUpperCase();

      return matchesCity && matchesStage;
    });
  }, [properties, aiFilters, localFilters, debouncedSearchQuery, selectedCity, selectedStage]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#030305] text-slate-100 selection:bg-indigo-500 selection:text-white antialiased relative overflow-x-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-indigo-950/10 via-transparent to-transparent pointer-events-none z-0" />
        <SiteNavbar />
        <div className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-3 font-mono text-xs tracking-widest text-slate-500">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-500/20 border-t-indigo-500" />
          LOADING...
        </div>
      </main>
    );
  }

  return (
    
    <main className="min-h-screen bg-[#030305] text-slate-100 selection:bg-indigo-500 selection:text-white antialiased relative overflow-x-hidden">
      
      {/* Abstract Background Tech Grids */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-indigo-950/10 via-transparent to-transparent pointer-events-none z-0" />
      

    <SiteNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        {/* Page Identity Header */}
        <header className="mb-10 border-b border-slate-800/60 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono tracking-[0.2em] text-indigo-400 uppercase mb-2">
              CANADA PIPELINE DIRECTORY
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase font-mono">
              Pre-Construction Listings
            </h1>
          </div>
          <div className="font-mono text-xs text-slate-400 bg-slate-900/40 border border-slate-800 px-4 py-2 rounded-lg">
            TOTAL LISTINGS: <span className="text-emerald-400 font-bold">{filteredProperties.length} ACTIVE PROPERTIES</span>
          </div>
        </header>

        {/* Sponsored Rows */}
        <section className="mb-12">
          <div className="text-[15px] font-mono tracking-[0.25em] text-amber-400 uppercase mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
            [ Coming soon.. ]
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {(properties.some(p => p.is_featured) ? properties.filter(p => p.is_featured) : properties.slice(0, 1)).map((featured: any) => (
              <Link 
                key={`featured-${featured.id}`}
                href={`/directory/${featured.id}`}
                onTouchStart={() => setActiveCardId(featured.id)}
                onTouchEnd={() => setActiveCardId(null)}
                className={`block relative overflow-hidden rounded-xl border p-1 group transition-all duration-500 shadow-[0_0_25px_rgba(245,158,11,0.05)] cursor-pointer ${activeCardId === featured.id ? 'border-amber-500/60 bg-gradient-to-r from-amber-950/20 via-slate-900/50 to-slate-900/20' : 'border-amber-500/30 bg-gradient-to-r from-amber-950/10 via-slate-900/40 to-slate-900/10 hover:border-amber-500/60'}`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/20 transition duration-500" />
                
                <div className="flex flex-col lg:flex-row gap-6 items-center rounded-lg overflow-hidden bg-slate-950/60 backdrop-blur-md p-4 lg:p-6">
                  
                  <div className="w-full lg:w-1/3 aspect-[16/10] rounded-lg overflow-hidden relative border border-slate-800">
                    <PropertyMedia
                      videoUrl={featured.video_url}
                      imageUrl={featured.image_url || "/fallback-estate.jpg"}
                      title={featured.title}
                      className={`h-full w-full object-cover transition duration-700 ${activeCardId === featured.id ? 'scale-105 opacity-90' : 'opacity-80 group-hover:scale-105 group-hover:opacity-90'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 bg-amber-500 text-slate-950 text-[8px] font-mono uppercase font-black tracking-widest px-2 py-0.5 rounded shadow-lg">
                      FEATURED ASSET
                    </span>
                  </div>

                  <div className="w-full lg:w-2/3 flex flex-col lg:flex-row justify-between lg:items-center gap-6 font-mono">
                    <div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-widest">
                        DEVELOPER // {featured.developer || 'Independent Builder'}
                      </div>
                      <h2 className="text-xl font-bold tracking-tight text-white uppercase mt-1 group-hover:text-amber-300 transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-xs text-slate-400 mt-2 max-w-xl font-sans leading-relaxed">
                       An exclusive enclave of 59 executive two-car garage detached homes by award winning Hallett Homes. Coming very soon to South Brampton at Mississauga Road and Steeles.
                      </p>
                      
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-[11px]">
                        <span className="text-slate-500">ZONE: <strong className="text-slate-300 uppercase">{featured.city}</strong></span>
                        <span className="text-slate-500">STAGE: <strong className="text-purple-400 uppercase">● {featured.selling_status || 'Active'}</strong></span>
                        <span className="text-slate-500">LAYOUT: <strong className="text-slate-300">{featured.beds_text}</strong></span>
                      </div>
                    </div>

                    <div className="lg:text-right flex lg:flex-col items-end justify-between lg:justify-center border-t lg:border-t-0 border-slate-800 pt-4 lg:pt-0 w-full lg:w-auto">
                      <div>
                        <span className="block text-[8px] text-slate-500 uppercase tracking-widest mb-0.5">STARTING PRICE</span>
                        <span className="text-2xl font-black text-amber-400 tracking-tight">
                          {featured.price_text}
                        </span>
                      </div>
                      
                      
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ================= INTERACTIVE HUD FILTER CONTROLLER ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-12 font-mono text-xs">
          
          <div className="lg:col-span-2 relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="SEARCH BY PROJECT, DEVELOPER, OR CITY..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/40 border border-slate-700/60 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 outline-none focus:border-indigo-500/80 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition duration-300 uppercase tracking-wider text-[11px]"
            />
            <span className="absolute right-4 top-4 text-slate-600">⌨</span>
          </div>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-slate-900/40 border border-slate-700/60 rounded-xl px-4 py-3.5 text-white font-mono text-[10px] tracking-wider uppercase outline-none focus:border-indigo-500/80 transition duration-300 w-full cursor-pointer"
          >
            {['ALL', 'TORONTO', 'MISSISSAUGA', 'OAKVILLE', 'BRAMPTON', 'WHITBY', 'BARRIE', 'VAUGHAN', 'BURLINGTON', 'OSHAWA', 'PICKERING', 'RICHMOND HILL', 'MARKHAM', 'CALEDON', 'NEWMARKET', 'GUELPH', 'MILTON', 'CAMBRIDGE', 'KITCHENER', 'ADJALA-TOSORONTIO', 'STOUFFVILLE', 'BOWMANVILLE', 'WOODSTOCK', 'ORANGEVILLE', 'ALLISTON', 'WELLAND'].map((city) => (
              <option key={city} value={city} className="bg-slate-950 text-white">
                {city === 'ALL' ? 'ALL CITIES' : city}
              </option>
            ))}
          </select>

          <div className="bg-slate-900/40 border border-slate-700/60 rounded-xl p-1.5 flex gap-1 items-center">
            {['ALL', 'REGISTRATION', 'SELLING', 'CONSTRUCTION'].map((stage) => (
              <button
                key={stage}
                type="button"
                onClick={() => setSelectedStage(stage)}
                className={`flex-1 px-2 py-2 rounded-lg text-[9px] tracking-widest uppercase transition-all duration-200 ${
                  selectedStage === stage 
                    ? 'bg-purple-600 text-white font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)]' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {stage === 'REGISTRATION' ? 'REG' : stage === 'SELLING' ? 'SELL' : stage === 'CONSTRUCTION' ? 'CONST' : stage}
              </button>
            ))}
          </div>

        </div>

        <div className="flex justify-end mb-6 font-mono text-[10px] tracking-widest">
          <div className="bg-slate-950 border border-slate-800 p-1 rounded-xl flex gap-1">
            <button
              type="button"
              onClick={() => setViewMode('GRID')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                viewMode === 'GRID'
                  ? 'bg-indigo-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.2)]'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              [DATA_GRID]
            </button>
            <button
              type="button"
              onClick={() => setViewMode('MAP')}
              className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'MAP'
                  ? 'bg-amber-500 text-slate-950 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full bg-amber-400 ${viewMode === 'MAP' ? 'animate-ping' : ''}`} />
              [GEO_RADAR_MAP]
            </button>
          </div>
        </div>

        {/* Live filtered grid output */}
        {filteredProperties.length > 0 ? (
         viewMode === 'GRID' ? (
            <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProperties.map((property) => (
                <Link 
                  key={property.id} 
                  href={`/directory/${property.id}`}
                  onTouchStart={() => setActiveCardId(property.id)}
                  onTouchEnd={() => setActiveCardId(null)}
                  className={`group relative flex flex-col overflow-hidden rounded-xl border transition-all duration-500 cursor-pointer ${activeCardId === property.id ? 'border-indigo-500/50 bg-slate-900/60 shadow-[0_0_40px_rgba(99,102,241,0.15)]' : 'border-slate-700/60 bg-slate-900/40 hover:border-indigo-500/50 hover:bg-slate-900/60 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]'}`}
                >
                  <div className="aspect-[16/10] w-full bg-slate-950 relative overflow-hidden border-b border-slate-700/40">
                    <PropertyMedia
                      videoUrl={property.video_url}
                      imageUrl={property.image_url}
                      title={property.title}
                      className={`h-full w-full object-cover object-center transition-all duration-700 ${activeCardId === property.id ? 'scale-110 opacity-100' : 'opacity-85 group-hover:scale-110 group-hover:opacity-100'}`}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center rounded-lg px-3 py-1 text-[9px] font-mono tracking-widest uppercase font-bold bg-black/80 border backdrop-blur-sm border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        ● {property.selling_status || 'Active'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex-1">
                      <div className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">
                        DEV // {property.developer || 'Independent'}
                      </div>
                      <h3 className="mt-2 text-lg font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors font-mono uppercase line-clamp-1">
                        {property.title}
                      </h3>
                      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-700/40 pt-4 text-xs font-mono">
                        <div>
                          <span className="block text-[8px] text-slate-500 uppercase tracking-widest">REGION</span>
                          <span className="font-medium text-slate-300 uppercase mt-1 block tracking-wider truncate">{property.city || 'Ontario'}</span>
                        </div>
                        <div>
                          <span className="block text-[8px] text-slate-500 uppercase tracking-widest">FOOTPRINT</span>
                          <span className="font-medium text-slate-300 mt-1 block tracking-wider truncate">{property.sqft_text}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-slate-700/40 flex items-center justify-between">
                      <div>
                        <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest">STARTING PRICE</span>
                        <span className="text-xl font-black text-white tracking-tight font-mono">
                          {property.price_text}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {/* Prevent share button clicks from opening the property page card link */}
                        <div onClick={(e) => e.stopPropagation()}>
                          <ShareButton
                            title={property.title}
                            url={`https://www.findle.global/directory/${property.id}`}
                            compact={true}
                          />
                        </div>
                        
                        {/* <span className="inline-flex items-center justify-center rounded-lg border border-indigo-500/80 bg-gradient-to-r from-indigo-600/20 to-indigo-600/5 text-indigo-300 font-mono text-[10px] tracking-widest uppercase px-4 py-2.5 transition-all group-hover:bg-indigo-600/30 group-hover:text-white">
                          OPEN →
                        </span> */}
                      </div>
                    </div>

                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Interactive Radar Matrix View Mode */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono">
              <div className="lg:col-span-1 space-y-4 max-h-[550px] overflow-y-auto pr-2">
                <div className="text-[9px] text-amber-500 tracking-widest uppercase font-bold mb-2">
                  // ACTIVE_SATELLITE_FEED: {filteredProperties.length} LOCATIONS MATRIXED
                </div>
                {filteredProperties.map((property) => (
                  <Link href={`/directory/${property.id}`} key={`map-list-${property.id}`} className="block">
                    <div className="bg-[#09090e] border border-slate-800 hover:border-indigo-500 p-4 rounded-xl transition-all group cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0 pr-2">
                          <div className="text-[10px] text-slate-500 tracking-wider truncate">NODE_REF: #{property.id.slice(0, 8)}</div>
                          <h4 className="text-sm font-black text-white group-hover:text-indigo-400 uppercase transition-colors mt-0.5 truncate">{property.title}</h4>
                          <p className="text-[11px] text-slate-400 font-sans mt-0.5">{property.city}, ON</p>
                        </div>
                        <span className="text-[10px] bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-indigo-400 font-bold shrink-0">
                          {property.price_text}
                        </span>
                      </div>
                      <div className="mt-3 flex gap-4 text-[9px] text-slate-600 border-t border-slate-900 pt-2.5">
                        <div>LAYOUT: <span className="text-slate-400">{property.beds_text}</span></div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Graphical Technical Overlay Panel */}
              <div className="lg:col-span-2 relative min-h-[450px] lg:min-h-full bg-slate-950 border border-slate-800 rounded-2xl flex flex-col items-center justify-center overflow-hidden p-6 shadow-inner">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
                <div className="absolute h-96 w-96 rounded-full border border-indigo-500/10 animate-pulse pointer-events-none" />
                <div className="absolute h-64 w-64 rounded-full border border-indigo-500/5 pointer-events-none" />
                <div className="absolute h-32 w-32 rounded-full border border-indigo-500/20 border-dashed pointer-events-none" />
                
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-slate-800 px-3 py-2 rounded-lg text-[9px] text-slate-400 space-y-0.5 z-10">
                  <div>SYS_STATUS: <span className="text-emerald-400 font-bold">ONLINE</span></div>
                  <div>REGION: GREATER_TORONTO_AREA</div>
                </div>

                <div className="relative w-full h-80 max-w-md border border-slate-900/50 rounded-xl flex items-center justify-center">
                  <div className="absolute inset-x-4 inset-y-12 border border-indigo-500/5 rounded-full rotate-12 blur-sm bg-gradient-to-tr from-indigo-500/5 to-transparent pointer-events-none" />
                  
                  {filteredProperties[0] && (
                    <Link href={`/directory/${filteredProperties[0].id}`} className="absolute top-1/2 left-1/3 -translate-x-1/2 group cursor-pointer">
                      <div className="absolute -inset-2 bg-amber-400/20 rounded-full blur animate-ping duration-1000" />
                      <div className="relative h-3 w-3 bg-amber-500 rounded-full border border-black shadow-[0_0_10px_#f59e0b]" />
                    </Link>
                  )}
                  {filteredProperties[1] && (
                    <Link href={`/directory/${filteredProperties[1].id}`} className="absolute top-1/3 left-1/2 group cursor-pointer">
                      <div className="absolute -inset-2 bg-indigo-500/20 rounded-full blur animate-pulse" />
                      <div className="relative h-3 w-3 bg-indigo-500 rounded-full border border-black shadow-[0_0_10px_#6366f1]" />
                    </Link>
                  )}
                </div>

                <div className="w-full border-t border-slate-900 mt-auto pt-4 flex justify-between text-[8px] text-slate-600 tracking-widest">
                  <div>CALIBRATION: 100.24.AX // OPTICAL_GRID</div>
                  <div>GRID_VIEW_TRUE_NORTH</div>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="border border-dashed border-slate-800 rounded-xl p-20 text-center font-mono">
            <div className="text-slate-600 text-3xl mb-4">⚠️</div>
            <div className="text-sm uppercase text-slate-400 tracking-wider">Zero Matching Data Clusters Found</div>
            <p className="text-xs text-slate-600 mt-2">Adjust your query arrays or clear geolocation node matrix filters.</p>
          </div>
        )}

      </div>
        <Footer />
    </main>
  );
}

export default function DirectoryPageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#030305] flex items-center justify-center font-mono text-xs text-slate-500 tracking-widest">
        LOADING...
      </div>
    }>
      <DirectoryPage />
    </Suspense>
  );
}