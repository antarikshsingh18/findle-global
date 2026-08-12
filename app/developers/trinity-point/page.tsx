import { supabase } from '../../../lib/supabase';
import Link from 'next/link';
import SiteNavbar from '../../components/SiteNavbar';
import Footer from '../../components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trinity Point Developments | Pre-Construction & New Homes in GTA | Findle',
  description: 'Explore Trinity Point Developments\' pre-construction homes and communities across Vaughan, Milton, and the GTA on Findle.',
};

export default async function TrinityPointPage() {
  // 1. Fetch all listings from both Supabase tables
  const [projectsRes, c21Res] = await Promise.all([
    supabase.from('projects').select('*'),
    supabase.from('c21_portal_listings').select('*'),
  ]);

  const allListings = [
    ...(projectsRes.data || []).map((item: any) => ({ ...item, is_c21: false })),
    ...(c21Res.data || []).map((item: any) => ({
      ...item,
      id: `c21-${item.id}`,
      is_c21: true,
    })),
  ];

  // 2. Filter properties specifically for Trinity Point Developments using clean normalization
  const cleanString = (str: string) => 
    str.toLowerCase().replace(/-(developments|homes|inc|ltd|corporation)|(developments|homes|inc|ltd|corporation)/g, '').replace(/[^a-z0-9]/g, '');

  const targetSlug = cleanString('trinity point developments');

  const developerProperties = allListings.filter((item) => {
    if (!item.developer) return false;
    return cleanString(item.developer).includes(targetSlug) || targetSlug.includes(cleanString(item.developer));
  });

  const totalProjects = developerProperties.length;
  const activeCities = Array.from(new Set(developerProperties.map((p) => p.city))).filter(Boolean);

  return (
    <main className="min-h-screen bg-[#030305] text-slate-100 selection:bg-indigo-500 selection:text-white antialiased relative overflow-x-hidden font-mono">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-indigo-950/10 via-transparent to-transparent pointer-events-none z-0" />
      
      <SiteNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        {/* Developer Profile Header Card */}
        <section className="mb-16 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-7 lg:p-8">
          <div className="grid items-center gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-3 text-[9px] uppercase tracking-[0.22em] text-indigo-400">
                Verified Developer Profile // Greenpark Group Division
              </div>

              <h1 className="text-3xl font-black uppercase tracking-[-0.05em] text-white sm:text-4xl">
                Trinity Point Developments
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 font-sans">
                Trinity Point Developments is an Ontario real-estate developer and builder operating as a division of Greenpark Group. Its portfolio spans finished homes, mid-rise and high-rise residential buildings, as well as commercial and office space concentrated across Vaughan, Milton, Burlington, Markham, Richmond Hill, Aurora, and North York.
              </p>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/trinity-point.jpg"
                  alt="Trinity Point development exterior"
                  className="h-[260px] w-full object-contain object-center bg-slate-950 p-4"
                />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
                  <span className="block text-[8px] uppercase tracking-[0.2em] text-slate-500">Featured Developments</span>
                  <span className="mt-1 block text-xl font-bold text-emerald-400">{totalProjects}</span>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
                  <span className="block text-[8px] uppercase tracking-[0.2em] text-slate-500">Cities</span>
                  <span className="mt-1 block text-xl font-bold text-indigo-400">{activeCities.length > 0 ? activeCities.length : 7}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Overview Content Section */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 border border-slate-800 bg-slate-900/20 p-6 sm:p-8 rounded-2xl">
          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 border-b border-slate-800 pb-2">
              Developer Snapshot
            </h2>
            <ul className="space-y-3 text-sm text-slate-300 font-sans">
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Developer:</strong> Trinity Point Developments</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Parent Organization:</strong> Greenpark Group Division</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Primary Market:</strong> Greater Toronto Area</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Core Markets:</strong> Vaughan, Milton, Burlington, Markham, Richmond Hill, Aurora, North York</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Property Types:</strong> Detached homes, townhomes, high-rise condominiums, commercial & office spaces</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 border-b border-slate-800 pb-2">
              Key Development Regions & Communities
            </h2>
            <div className="space-y-4 text-sm text-slate-300 font-sans">
              <div>
                <strong className="text-white font-mono text-xs uppercase block text-indigo-400">Vaughan</strong>
                <p className="text-xs mt-1">Features premier communities like Noble Residences (Keele St & Major Mackenzie Dr W) offering upscale condominiums, and West & Pines (Weston Rd & Teston Rd) featuring modern urban townhomes.</p>
              </div>
              <div>
                <strong className="text-white font-mono text-xs uppercase block text-indigo-400">Milton</strong>
                <p className="text-xs mt-1">Highlighted by major master-planned communities like Thompson Towers, located near the Milton GO station at Thompson Rd S & Drew Centre.</p>
              </div>
              <div>
                <strong className="text-white font-mono text-xs uppercase block text-indigo-400">Broader GTA Expansion</strong>
                <p className="text-xs mt-1">Active residential and mixed-use pipelines spanning Burlington, Markham, Richmond Hill, Aurora, and North York.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Property Grid Section */}
        <section>
          <div className="text-xs tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
            <span>ACTIVE & FEATURED DEVELOPMENTS ({totalProjects})</span>
            <span className="text-slate-500">GTA REGIONAL PIPELINE</span>
          </div>

          {developerProperties.length > 0 ? (
            <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {developerProperties.map((property) => (
                <Link 
                  key={property.id} 
                  href={`/directory/${property.id}`}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900/40 hover:border-indigo-500/50 hover:bg-slate-900/60 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-all duration-500 cursor-pointer"
                >
                  <div className="aspect-[16/10] w-full bg-slate-950 relative overflow-hidden border-b border-slate-700/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={property.image_url || "/fallback-estate.jpg"}
                      alt={property.title}
                      className="h-full w-full object-cover object-center transition-all duration-700 opacity-85 group-hover:scale-110 group-hover:opacity-100"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center rounded-lg px-3 py-1 text-[9px] font-mono tracking-widest uppercase font-bold bg-black/80 border backdrop-blur-sm border-emerald-500/50 text-emerald-300">
                        ● {property.selling_status || 'Active'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors uppercase line-clamp-1">
                        {property.title}
                      </h3>
                      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-700/40 pt-4 text-xs">
                        <div>
                          <span className="block text-[8px] text-slate-500 uppercase tracking-widest">REGION</span>
                          <span className="font-medium text-slate-300 uppercase mt-1 block tracking-wider truncate">{property.city || 'Ontario'}</span>
                        </div>
                        <div>
                          <span className="block text-[8px] text-slate-500 uppercase tracking-widest">FOOTPRINT</span>
                          <span className="font-medium text-slate-300 mt-1 block tracking-wider truncate">{property.sqft_text || 'See Specs'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-slate-700/40 flex items-center justify-between">
                      <div>
                        <span className="block text-[8px] text-slate-500 uppercase tracking-widest">STARTING PRICE</span>
                        <span className="text-xl font-black text-white tracking-tight">
                          {property.price_text || 'Contact for Pricing'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Static Fallback Card Showcase if database query is empty during initial setup */}
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <span className="text-[9px] text-emerald-400 font-bold uppercase">● Active Community</span>
                <h3 className="text-lg font-bold text-white mt-2">Noble Residences</h3>
                <p className="text-xs text-slate-400 mt-1">Vaughan (Keele St & Major Mackenzie Dr W)</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">Condominiums • Maple Area</div>
              </div>
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <span className="text-[9px] text-emerald-400 font-bold uppercase">● Now Open</span>
                <h3 className="text-lg font-bold text-white mt-2">Thompson Towers</h3>
                <p className="text-xs text-slate-400 mt-1">Milton (Thompson Rd S & Drew Centre)</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">Condominiums • Near Milton GO</div>
              </div>
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <span className="text-[9px] text-indigo-400 font-bold uppercase">○ Future Development</span>
                <h3 className="text-lg font-bold text-white mt-2">West & Pines</h3>
                <p className="text-xs text-slate-400 mt-1">Vaughan (Weston & Teston Rd)</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">20' Urban Townhomes</div>
              </div>
            </div>
          )}
        </section>

        {/* FAQ Section */}
        <section className="mt-20 border-t border-slate-800 pt-12">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-sans">
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">Who is Trinity Point Developments?</h3>
              <p className="text-slate-300">Trinity Point Developments is an Ontario real estate builder and developer operating as a prominent division of the well-established Greenpark Group.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">Where does Trinity Point build?</h3>
              <p className="text-slate-300">Their residential and commercial communities span key GTA markets, including Vaughan, Milton, Burlington, Markham, Richmond Hill, Aurora, and North York.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">What types of properties do they develop?</h3>
              <p className="text-slate-300">Their diverse portfolio includes low-rise detached and townhome formats, mid-rise and high-rise residential condominiums, as well as commercial and office developments.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">What are some notable Trinity Point projects?</h3>
              <p className="text-slate-300">Notable developments include Thompson Towers in Milton, Noble Residences and West & Pines in Vaughan, along with other master-planned communities across the region.</p>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}