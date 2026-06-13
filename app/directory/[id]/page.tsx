"use client";

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { supabase } from '../../../lib/supabase';

interface Project {
  id: string;
  title: string;
  price_text: string;
  beds_text: string;
  sqft_text: string;
  image_url: string;
  city: string;
  developer: string;
  selling_status: string;
  neighborhood?: string;
  description?: string;
  // Dynamic fields mapped for accordion populating
  developer_description?: string;
  developer_logo_url?: string;
  incentives_list?: string[]; // Arrays or fallbacks mapped below
  deposit_list?: string[];
  facts_list?: string[];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

// Reusable Accordion HUD component to match image_cf83e2.png style
function AccordionSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-800 bg-slate-900/10 rounded-xl overflow-hidden mb-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 text-left font-mono font-bold text-sm text-slate-200 hover:bg-slate-800/30 transition-all"
      >
        <span>// {title.toUpperCase()}</span>
        <span className={`text-xs text-slate-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 border-t border-slate-800/40 pt-4 bg-slate-950/20 font-sans text-xs text-slate-400 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ProjectDetailPage({ params }: PageProps) {
  const { id } = use(params);

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // --- Lead Form Logic States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [leadType, setLeadType] = useState<'BUYER' | 'AGENT'>('BUYER');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    async function fetchProjectNode() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProject(data);
      } catch (err) {
        console.error('Error fetching project node matrix:', err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProjectNode();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030305] flex flex-col items-center justify-center font-mono text-xs text-slate-500 tracking-widest gap-3">
        <div className="w-6 h-6 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        DECRYPTING SECURE NODE DATA LAYER...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030305] flex flex-col items-center justify-center font-mono text-xs text-rose-400 tracking-widest gap-4">
        <div>⚠️ ERROR_404: TARGET DATA CLUSTER NOT FOUND</div>
        <Link href="/directory" className="text-slate-500 hover:text-indigo-400 transition-colors">
          ← RETURN TO MAIN INDEXER
        </Link>
      </div>
    );
  }

  // Fallback mocks if columns are missing from the live database rows yet
  const displayIncentives = project.incentives_list || [
    "Only $55,000 Deposit Until Occupancy",
    "6-piece Appliance Package",
    "1-car Underground Parking Spot",
    "Condo Fees Waived For 12 Months",
    "$0 Development Charge Cap",
    "$5,000 Total Closing Cost Cap",
    "Right To Lease Free Assignments"
  ];

  const displayDeposits = project.deposit_list || [
    "$10,000.00 On Signing",
    "$7,500.00 - 30 days",
    "$7,500.00 - 60 days",
    "$7,500.00 - 90 days"
  ];

  const displayFacts = project.facts_list || [
    `Development Status: ${project.selling_status || 'Pre-construction'}`,
    `Zone Region: ${project.city || 'Ontario District'}`,
    `Structural Footprint Layouts: ${project.beds_text || 'Multi-Unit Mode'}`
  ];

  return (
    <main className="min-h-screen bg-[#030305] text-slate-100 antialiased font-mono relative overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Back Navigation Links */}
        <Link href="/directory" className="text-xs text-slate-500 hover:text-indigo-400 transition-colors flex items-center gap-2 mb-8">
          ← [BACK_TO_INDEXER_FEED]
        </Link>

        {/* Master Project Overview Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-slate-800/80 bg-slate-900/20 rounded-2xl p-6 backdrop-blur-md mb-10">
          
          <div className="aspect-[16/10] md:aspect-auto md:h-[380px] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative">
            {project.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={project.image_url} 
                alt={project.title} 
                className="w-full h-full object-cover opacity-75 grayscale hover:grayscale-0 transition-all duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-700">NO_VISUAL_DATA</div>
            )}
            <span className="absolute top-4 left-4 bg-indigo-600/90 text-white text-[9px] font-bold tracking-widest px-3 py-1 rounded border border-indigo-400/40 uppercase">
              STATUS // {project.selling_status || 'ACTIVE'}
            </span>
          </div>

          <div className="flex flex-col justify-between py-1">
            <div>
              <div className="text-[10px] tracking-widest text-indigo-400 uppercase">
                DEVELOPER // {project.developer || 'UNSPECIFIED'}
              </div>
              <h1 className="text-2xl font-black text-white uppercase tracking-tight mt-1 mb-4">
                {project.title}
              </h1>
              <p className="font-sans text-xs text-slate-400 leading-relaxed mb-6">
                {project.description || "Pre-construction asset network layout open for priority validation phase registration modules."}
              </p>

              <div className="space-y-3.5 border-t border-slate-800/60 pt-5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">ZONE:</span>
                  <span className="text-slate-200 uppercase">{project.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">START_PRICING:</span>
                  <span className="text-emerald-400 font-bold">{project.price_text}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">CONFIG:</span>
                  <span className="text-slate-200">{project.beds_text}</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              {!isUnlocked ? (
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-3.5 rounded-xl border border-amber-500/50 bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.1)]"
                >
                  REQUEST STRUCTURAL FLOORPLANS & ALLOCATIONS
                </button>
              ) : (
                <div className="w-full py-3.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-bold text-xs tracking-widest uppercase text-center">
                  ✓ IDENTITY SECURED // METRIC SCHEMATICS UNLOCKED
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= ACCORDION HUD EXTENSIONS (image_cf83e2.png Mapping) ================= */}
        <section className="mb-10">
          <div className="text-[11px] text-slate-500 font-bold tracking-widest uppercase mb-4">
            [ More Details ]
          </div>

          {/* 1. About Developer */}
          <AccordionSection title="About Developer" defaultOpen={true}>
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div className="w-20 h-20 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center shrink-0 p-2 text-[9px] text-slate-600 text-center uppercase">
                {project.developer_logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.developer_logo_url} alt="logo" className="w-full h-full object-contain" />
                ) : (
                  "DEV LOGO"
                )}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-200 font-mono mb-2 uppercase">{project.developer || 'Caivan Communities'}</h4>
                <p className="font-sans text-slate-400 leading-relaxed">
                  {project.developer_description || 
                    `Based in Ottawa, Canada, ${project.developer || 'Caivan Communities'} is a homebuilder and real estate developer with ongoing projects throughout the city, the Greater Toronto Area (GTA), and other nearby areas. They build a range of housing alternatives in well-planned, master-planned communities.`}
                </p>
              </div>
            </div>
          </AccordionSection>

          {/* 2. Facts & Features */}
          <AccordionSection title="Facts & Features">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px]">
              {displayFacts.map((fact, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-900">
                  <span className="text-indigo-400">❖</span> {fact}
                </div>
              ))}
            </div>
          </AccordionSection>

          {/* 3. Incentives */}
          <AccordionSection title="Incentives" defaultOpen={true}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {displayIncentives.map((incentive, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-300 font-sans text-xs bg-slate-950/30 p-2.5 rounded-lg border border-slate-900">
                  <span className="text-purple-400 mt-0.5">✓</span>
                  <span>{incentive}</span>
                </div>
              ))}
            </div>
          </AccordionSection>

          {/* 4. Deposit Structure */}
          <AccordionSection title="Deposit Structure" defaultOpen={true}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {displayDeposits.map((deposit, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-300 font-mono text-[11px] bg-slate-950/50 p-3 rounded-lg border border-slate-800/60">
                  <span className="text-emerald-400">✓</span>
                  <span>{deposit}</span>
                </div>
              ))}
            </div>
          </AccordionSection>
        </section>

        {/* GATED BLUEPRINT DOWNLINK MODULE */}
        <section className="border border-slate-800 bg-[#09090e] rounded-2xl p-6 relative overflow-hidden">
          <h2 className="text-xs font-bold text-white tracking-widest uppercase border-b border-slate-800 pb-3 mb-4">
            [ GATED_ASSET_PAYLOAD // DOCUMENT_VAULT ]
          </h2>

          {isUnlocked ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs tracking-wide animate-fade-in">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span className="text-indigo-400 font-bold block mb-1">💰 PLATINUM INCENTIVE PRICING</span>
                <p className="font-sans text-slate-300">Complete allocation schedules and specific parking configuration rules are bundled in the documentation package.</p>
              </div>
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-center">
                <span className="text-emerald-400 font-bold block mb-1">📋 ARCHITECTURAL MAP FILES</span>
                <a href="#" className="font-mono text-indigo-400 underline hover:text-indigo-300 text-xs mt-1 block">
                  Download_VIP_Floorplans.pdf
                </a>
                <a href="#" className="font-mono text-indigo-400 underline hover:text-indigo-300 text-xs mt-1 block">
                  Developer_Incentive_Matrix.pdf
                </a>
              </div>
            </div>
          ) : (
            <div className="border border-slate-800/40 rounded-xl bg-slate-950/20 p-8 text-center">
              <div className="max-w-sm mx-auto space-y-3">
                <div className="text-xl text-slate-600">🔒</div>
                <h3 className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">SECURE ENTRY FORM ACCESS REQUIRED</h3>
                <p className="font-sans text-xs text-slate-500 leading-relaxed">
                  Authenticate your identity using the extraction request widget above to unlock structural architectural assets and complete private layouts.
                </p>
              </div>
            </div>
          )}
        </section>

      </div>

      {/* Verification Lead Intake Dialog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/70 font-mono">
          <div className="relative w-full max-w-md bg-[#09090e] border border-slate-800 rounded-2xl p-6 shadow-2xl">
            
            <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors text-xs"
            >
              [ESC_X]
            </button>

            <div className="mb-6">
              <div className="text-[9px] text-indigo-400 tracking-[0.2em] uppercase mb-1">SECURE_CHANNEL // INITIALIZATION</div>
              <h3 className="text-base font-black text-white uppercase">Request Asset Extraction</h3>
              <p className="text-[11px] text-slate-400 font-sans mt-1">
                Targeting package profiles for: <span className="text-amber-400 font-bold uppercase">{project.title}</span>
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-1 rounded-xl flex gap-1 mb-5 text-[10px] tracking-wider font-bold">
              <button
                type="button"
                onClick={() => setLeadType('BUYER')}
                className={`flex-1 py-2 rounded-lg transition-all ${leadType === 'BUYER' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}
              >
                INDIVIDUAL_INVESTOR
              </button>
              <button
                type="button"
                onClick={() => setLeadType('AGENT')}
                className={`flex-1 py-2 rounded-lg transition-all ${leadType === 'AGENT' ? 'bg-purple-600 text-white' : 'text-slate-500'}`}
              >
                LICENSED_BROKER
              </button>
            </div>

            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const { error } = await supabase
                    .from('leads')
                    .insert([
                      {
                        full_name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        target_property: project.title,
                        buyer_type: leadType
                      }
                    ]);

                  if (error) throw error;

                  setIsModalOpen(false);
                  setIsUnlocked(true); 
                  setFormData({ name: '', email: '', phone: '' });

                } catch (err: any) {
                  console.error("Supabase Error:", err);
                  alert(`[UPLINK_FAILED]: ${err.message || err}`);
                }
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-[9px] text-slate-500 uppercase tracking-widest mb-1">LEAD_IDENTITY_NAME</label>
                <input
                  type="text"
                  required
                  placeholder="ENTER FULL NAME..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500 uppercase tracking-wider"
                />
              </div>

              <div>
                <label className="block text-[9px] text-slate-500 uppercase tracking-widest mb-1">COMM_ROUTING_EMAIL</label>
                <input
                  type="email"
                  required
                  placeholder="SECURE_EMAIL@DOMAIN.COM"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500 tracking-wider"
                />
              </div>

              <div>
                <label className="block text-[9px] text-slate-500 uppercase tracking-widest mb-1">TELEPHONY_MOBILE_SIGNAL</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (XXX) XXX-XXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500 tracking-wider"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all duration-300 border border-indigo-500/50 bg-indigo-500/10 hover:bg-indigo-600 text-indigo-300 hover:text-white"
              >
                AUTHORIZE_PLATINUM_UPLINK →
              </button>
            </form>

          </div>
        </div>
      )}
    </main>
  );
}