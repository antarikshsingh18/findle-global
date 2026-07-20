import Link from 'next/link';
import { supabase } from '../lib/supabase';
import AdminNavLink from './components/AdminNavLink';
import LogoutButton from './components/LogoutButton';
import Footer from './components/Footer';

export default async function Home() {
  const totalProperties = 858;
  let liveProperties: any[] = [];
  
  // Fetch real-time data directly from both database tables in parallel on the server
  try {
    const [projectsResponse, c21Response] = await Promise.all([
      supabase.from('projects').select('*'),
      supabase.from('c21_portal_listings').select('*')
    ]);

    const projectData = projectsResponse.data || [];
    const c21Data = c21Response.data || [];

    const normalizedProjects = projectData.map((item: any) => ({
      ...item,
      is_c21: false
    }));

    const normalizedC21 = c21Data.map((item: any) => ({
      id: `c21-${item.id}`,
      title: item.title,
      price_text: item.price_text || "CONTACT FOR PRICING",
      beds_text: item.beds_text || "See Specs",
      sqft_text: item.sqft_text || "Spacious",
      image_url: item.image_url || "/fallback-estate.jpg",
      city: item.city,
      developer: item.developer || "Century 21 Partner",
      selling_status: item.selling_status || "ACTIVE",
      is_featured: item.is_featured || false,
      neighborhood: item.neighborhood || "",
      is_c21: true,
      completionYear: item.completionYear || ""
    }));

    // Combine streams identical to the directory pipeline engine
    liveProperties = [...normalizedProjects, ...normalizedC21];
  } catch (error) {
    console.error("Error loading home matrix clusters:", error);
  }

  // Extract exactly the top 3 items to show in the featured grid
  const featuredCluster = liveProperties.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#030305] text-slate-100 selection:bg-indigo-500 selection:text-white antialiased relative overflow-x-hidden">

      {/* ================= FULL-SCREEN BACKGROUND VIDEO LAYER ================= */}
      <div className="fixed inset-0 w-screen h-screen object-cover z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ mixBlendMode: 'screen' }}
        >
          <source src="/matrix.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Subtle layered overlays: blend video seamlessly with UI */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030305] via-[#030305]/40 to-[#030305] opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030305]/50 via-transparent to-[#030305]/50 opacity-40 pointer-events-none" />
        
        {/* Radial gradient for softer fade */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030305]/20 to-[#030305]/50 opacity-50 pointer-events-none" />
      </div>
      {/* ========================================================== */}
      
      {/* Enhanced Background Decorative Laser Grids & Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-indigo-950/25 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute top-[15vh] left-[-15%] w-[50vw] h-[50vw] rounded-full bg-gradient-radial from-indigo-600/10 via-transparent to-transparent blur-3xl pointer-events-none z-0" />
      <div className="absolute top-[30vh] right-[-20%] w-[45vw] h-[45vw] rounded-full bg-gradient-radial from-emerald-600/8 via-transparent to-transparent blur-3xl pointer-events-none z-0" />
      
      {/* Cybernetic Navigation Bar */}
<nav className="border-b border-slate-800/40 sticky top-0 bg-[#030305]/30 backdrop-blur-3xl z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
    
    {/* Left Top Brand Container */}
    <div className="flex items-center gap-3">
      {/* Pulse Status Light Indicator */}
      {/* <div className="relative flex h-4 w-4">
        <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-60"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.7)]"></span>
      </div> */}
      
      {/* NEW GRAPHIC LOGO NODE */}
      <Link href="/" className="flex items-center group">
        <img 
          src="/findle.png" // Replace with your actual filename (e.g., logo.png, logo.svg)
          alt="Findle" 
          className="h-33 w-auto object-contain opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-300"
        />
      </Link>
    </div>
    
   
          
          <div className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest uppercase text-slate-400">
            <span className="text-indigo-400 cursor-pointer flex items-center gap-1 hover:text-indigo-300 transition">
              <span className="text-[9px]">&gt;</span> Browse
            </span>
            <Link href="/directory" className="hover:text-white cursor-pointer transition duration-300">
              Listings
            </Link>
            <AdminNavLink />
            <LogoutButton />
            <Link href="/portal" className="hover:text-white cursor-pointer transition duration-300">
              Login
            </Link>
            <Link href="/FindleFinance" className="hover:text-white cursor-pointer transition duration-300">
            Finance
          </Link>
          </div>
          
          
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ===== Enhanced Hero Section ===== */}
        <section className="py-16 sm:py-24 lg:py-32 relative">
          {/* Animated accent line */}
          <div className="absolute -left-4 top-1/3 w-1 h-24 bg-gradient-to-b from-indigo-500/0 via-indigo-500/50 to-indigo-500/0 rounded-full blur-sm" />
          
          <header className="mb-12 max-w-5xl">
            {/* <div className="inline-flex items-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-950/20 px-4 py-2 text-[10px] font-mono tracking-widest text-indigo-300 mb-8 uppercase backdrop-blur-md hover:border-indigo-400/50 transition">
              [ ✓ PROPERTY DISCOVERY ENGINE ACTIVE ]
            </div> */}
            
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-tight mb-6">
              discover <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                tomorrow today
              </span>
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="/directory"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_0_25px_rgba(129,140,248,0.35)] transition hover:brightness-110"
              >
                Explore Properties
              </Link>
              <Link
                href="/FindleFinance"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300 transition hover:border-indigo-500/60 hover:text-white"
              >
                Findle Finance
              </Link>
            </div>
          </header>

          {/* Advanced Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 mb-12">
            {[
              { label: 'PROPERTIES LISTED', value: totalProperties, unit: '' },
              { label: 'CITIES LISTED', value: '20+', unit: '' },
              { label: 'MARKET COVERAGE', value: '24/7', unit: '' },
              { label: 'USER SATISFACTION', value: '98.5', unit: '%' }
            ].map((stat, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="relative border border-slate-700/40 bg-slate-900/15 rounded-lg p-4 backdrop-blur-md group-hover:border-indigo-500/50 transition">
                  <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-2">{stat.label}</div>
                  <div className="flex items-baseline gap-1">
                    <div className="text-3xl font-black text-white">{stat.value}</div>
                    <div className="text-slate-500 text-sm">{stat.unit}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Enhanced HUD Data Filter Strip ===== */}
        {/* <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5 rounded-xl blur" />
          <div className="relative border border-slate-700/40 bg-slate-900/20 backdrop-blur-xl rounded-xl p-4 hover:border-slate-600/60 transition">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-2">
                <button className="group relative bg-gradient-to-r from-indigo-600/25 to-indigo-600/5 border border-indigo-500/50 text-indigo-300 text-[10px] uppercase px-5 py-2.5 rounded-lg tracking-wider font-bold hover:from-indigo-600/35 hover:to-indigo-600/15 hover:border-indigo-400/70 transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)] group-hover:shadow-[0_0_40px_rgba(99,102,241,0.35)] backdrop-blur-md">
                  <span className="flex items-center gap-2">
                    <span className="text-xs">◆</span> SYS.ALL_NODES
                  </span>
                </button>
                <button className="border border-slate-700/60 hover:border-slate-600 hover:bg-slate-800/40 text-slate-400 hover:text-slate-300 text-[10px] uppercase px-4 py-2.5 rounded-lg tracking-wider transition duration-200">
                  STAGE.REGISTRATION
                </button>
                <button className="border border-slate-700/60 hover:border-slate-600 hover:bg-slate-800/40 text-slate-400 hover:text-slate-300 text-[10px] uppercase px-4 py-2.5 rounded-lg tracking-wider transition duration-200">
                  STAGE.CONSTRUCTION
                </button>
              </div>
              <div className="text-[11px] text-slate-400 px-4 py-2 border-l border-slate-700/40">
                LISTINGS: <span className="text-indigo-400 font-bold ml-1">{totalProperties} AVAILABLE</span>
              </div>
            </div>
          </div>
        </div> */}

        {/* ===== Features Section ===== */}
        <section className="py-16 mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              imgUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80', 
              title: 'Smart Search', 
              desc: 'AI-powered tactical search matrices to locate your ideal property nodes in seconds.' 
            },
            { 
              imgUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80', 
              title: 'Market Insights', 
              desc: 'Real-time structural pricing trends and predictive valuation algorithms running continuously.' 
            },
            { 
              imgUrl: '/findlefinance2.png', 
              title: 'Findle Finance', 
              desc: 'Integrated mortgage services — licensed agents, pre-approval, rate shopping, and preconstruction financing.' 
            }
          ].map((feature, idx) => {
            const cardInnerContent = (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
                
                <div className="relative border border-slate-700/50 bg-slate-900/30 rounded-xl overflow-hidden backdrop-blur-sm group-hover:border-indigo-500/50 transition duration-300 flex flex-col h-full">
                  
                  {/* Tech Card Image Header */}
                  <div className="h-32 w-full relative overflow-hidden opacity-40 group-hover:opacity-70 transition duration-500 border-b border-slate-800">
                    <img src={feature.imgUrl} alt={feature.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
                  </div>

                  {/* Card Content Text */}
                  <div className="p-6 flex-1 flex flex-col justify-center">
                    <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-white mb-2 group-hover:text-indigo-400 transition">
                      // {feature.title}
                    </h3>
                    <p className="text-xs font-mono leading-relaxed text-slate-400 group-hover:text-slate-300 transition">
                      {feature.desc}
                    </p>
                  </div>

                </div>
              </>
            );

            if (idx === 1) {
              return (
                <Link href="/marketInsights" key={idx} className="group relative overflow-hidden rounded-xl block cursor-pointer">
                  {cardInnerContent}
                </Link>
              );
            }

            if (idx === 0) {
  return (
    <Link href="/directory?focus=search" key={idx} className="group relative overflow-hidden rounded-xl block cursor-pointer">
      {cardInnerContent}
    </Link>
  );
}
            if (idx === 2) {
              return (
                <Link href="/FindleFinance" key={idx} className="group relative overflow-hidden rounded-xl block cursor-pointer">
                  {cardInnerContent}
                </Link>
              );
            }
            // default card for other indexes (e.g., Findle Finance)
            return (
              <div key={idx} className="group relative overflow-hidden rounded-xl block cursor-pointer">
                {cardInnerContent}
              </div>
            );
          })}
        </section>

        {/* ===== Enhanced Futuristic Card Grid (LIVE DATABASE SYNCED) ===== */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-2">
                Featured Properties
              </h2>
              <p className="text-slate-400 font-mono text-sm">Curated premium listings from our network</p>
            </div>
            <Link href="/directory">
              <button className="hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-700/50 hover:border-indigo-500/60 bg-slate-900/20 hover:bg-indigo-600/15 text-slate-300 hover:text-white transition duration-300 font-mono text-sm uppercase tracking-wider backdrop-blur-md">
                View All <span>→</span>
              </button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCluster.map((property) => {
              const cleanStatus = (property.selling_status || 'SELLING').toUpperCase();
              
              // Safe completion calculation handling fallback logic cleanly
              const completionText = property.completionYear 
                ? `Q${Math.ceil((property.completionYear % 12 || 12) / 3)}_${property.completionYear}`
                : "Q4_2027";

              // Dynamically resolve naming fields depending on structural schema context
              const displayTitle = property.title || property.name || "UNNAMED ASSET node";
              const displayImage = property.image_url || property.imageUrl || "/fallback-estate.jpg";
              const displayPrice = property.price_text || (property.startingPrice ? `$${property.startingPrice.toLocaleString()}` : "CONTACT AGENT");

              return (
                <div 
                  key={property.id} 
                  className="group flex flex-col bg-slate-900/20 border border-slate-700/40 rounded-xl overflow-hidden transition-all duration-500 hover:border-indigo-500/60 hover:bg-slate-900/35 hover:shadow-[0_0_50px_rgba(99,102,241,0.2)] relative backdrop-blur-sm"
                >
                  {/* Corner tech accents */}
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-slate-600 group-hover:border-indigo-400 transition-colors z-20" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-slate-600 group-hover:border-indigo-400 transition-colors z-20" />
                  
                  {/* Holographic Media Container */}
                  <div className="aspect-[16/10] w-full bg-slate-950 relative overflow-hidden border-b border-slate-700/40">
                    <img
                      src={displayImage}
                      alt={displayTitle}
                      className="h-full w-full object-cover object-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-700 group-hover:scale-105"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    {/* Neon Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center rounded-lg px-3 py-1 text-[9px] font-mono tracking-widest uppercase font-bold bg-black/80 border backdrop-blur-sm ${
                        cleanStatus === 'REGISTRATION' ? 'border-purple-500/50 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]' :
                        cleanStatus === 'SELLING' || cleanStatus === 'ACTIVE' ? 'border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 
                        'border-amber-500/50 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                      }`}>
                        ● {cleanStatus}
                      </span>
                    </div>
                  </div>

                  {/* Metadata Cluster */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex-1">
                      {/* System Tags */}
                      <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-slate-500 uppercase">
                        <span className="hover:text-slate-400 transition">LISTED_BY // {property.developer || 'INDEPENDENT BUILDER'}</span>
                        <span className="text-slate-600">ID: #{property.id}</span>
                      </div>
                      
                      {/* Property Asset Title */}
                      <h3 className="mt-3 text-lg font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors font-mono uppercase line-clamp-1">
                        {displayTitle}
                      </h3>
                      
                      {/* Digital Grid Specs */}
                      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-700/40 pt-4 text-xs font-mono">
                        <div className="group/info hover:bg-slate-800/30 p-2 rounded transition">
                          <span className="block text-[8px] text-slate-500 uppercase tracking-widest">LOCATION</span>
                          <span className="font-medium text-slate-300 uppercase mt-1 block tracking-wider text-sm truncate">
                            {property.neighborhood || property.city || 'ONTARIO'}
                          </span>
                        </div>
                        <div className="group/info hover:bg-slate-800/30 p-2 rounded transition">
                          <span className="block text-[8px] text-slate-500 uppercase tracking-widest">AVAILABLE</span>
                          <span className="font-medium text-slate-300 mt-1 block tracking-wider text-sm">{completionText}</span>
                        </div>
                      </div>
                    </div>

                    {/* Transaction Footer */}
                    <div className="mt-8 pt-4 border-t border-slate-700/40 flex items-center justify-between">
                      <div>
                        <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest">ASKING_PRICE</span>
                        <span className="text-2xl font-black text-white tracking-tight font-mono">
                          {displayPrice}
                        </span>
                      </div>
                      
                      {/* Enhanced CTA Button Linked to Dynamic Route Matrix */}
                      <Link href={`/directory/${property.id}`}>
                        <button className="relative group/btn inline-flex items-center justify-center rounded-lg border border-indigo-500/80 bg-gradient-to-r from-indigo-600/20 to-indigo-600/5 hover:from-indigo-600/30 hover:to-indigo-600/15 text-indigo-300 hover:text-indigo-100 font-mono text-[10px] tracking-widest uppercase px-4 py-3 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]">
                          <span>VIEW DETAILS</span>
                          <span className="ml-1 group-hover/btn:translate-x-0.5 transition">→</span>
                        </button>
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </section>

       {/* ===== CTA Section ===== */}
<section className="py-20 mb-12 relative">
  <div className="relative border border-slate-800/50 bg-slate-900/20 backdrop-blur-2xl rounded-2xl overflow-hidden">

    {/* Top accent line */}
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />

    {/* Corner accents */}
    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-indigo-500/40" />
    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-indigo-500/40" />
    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-indigo-500/40" />
    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-indigo-500/40" />

    <div className="px-8 py-16 text-center">

      {/* System tag */}
      {/* <div className="inline-flex items-center gap-2 border border-purple-500/30 bg-purple-950/20 px-4 py-1.5 rounded-lg text-[10px] font-mono tracking-[0.2em] text-purple-400 uppercase mb-8">
        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
        DISCOVERY_ENGINE // READY
      </div> */}

      {/* Main heading */}
      <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white leading-none mb-4">
        Your Next
        <br />
        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Property Awaits
        </span>
      </h2>

      {/* Subtext */}
      <p className="font-mono text-sm text-slate-500 tracking-widest uppercase mt-6 mb-10 max-w-lg mx-auto leading-relaxed">
        Canada&apos;s most comprehensive pre-construction pipeline — updated in real time
      </p>

      {/* Stats row */}
      <div className="flex flex-wrap justify-center gap-12 mb-10 font-mono">
        {[
          { label: 'PROPERTIES', value: '758+' },
          { label: 'CITIES COVERED', value: '19' },
          // { label: 'PLATFORM STATUS', value: 'ONLINE' },
        ].map((stat, idx) => (
          <div key={idx} className="text-center">
            <div className="text-3xl font-black text-white tracking-tight">{stat.value}</div>
            <div className="text-[9px] text-slate-500 tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="w-24 h-[1px] bg-slate-800 mx-auto mb-10" />

      {/* CTAs */}
     <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 justify-center">
        <Link
          href="/directory"
          className="px-8 py-3.5 rounded-xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
        >
          Browse All Properties →
        </Link>
        <Link
          href="/portal"
          className="px-8 py-3.5 rounded-xl border border-slate-700 text-slate-400 hover:border-indigo-500/60 hover:text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 font-mono"
        >
          Agent Login
        </Link>
      </div>

    </div>
  </div>
</section>
      </div>
      <div className="relative z-10 h-4 bg-[#030305]" />
      <Footer />
    </main>
  );
}