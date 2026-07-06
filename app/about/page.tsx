"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#030305] text-slate-300 font-sans selection:bg-indigo-500/30">
      {/* Background Effect */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(49,46,129,0.2),_transparent_70%)]" />

      <main className="relative max-w-4xl mx-auto px-6 py-20">
        
        {/* Header & Back Button */}
        <div className="flex items-center gap-6 mb-12">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500 hover:text-indigo-400 transition-all border border-slate-800 px-4 py-2 rounded-md hover:border-indigo-500/50"
          >
            <span>←</span> Exit
          </button>
        </div>

        {/* Hero Section */}
        <header className="mb-24">
          <h2 className="text-[10px] tracking-[0.3em] uppercase text-indigo-500 mb-6">About Findle Global</h2>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1]">
            Tomorrow's best properties <br />
            <span className="text-purple-400">are available today.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-xl">
            Most people just don't know where to look. Findle Global exists to change that.
          </p>
        </header>

        {/* Content Blocks */}
        <div className="space-y-24">
          
          <section className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">The Problem</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                The preconstruction market is full of opportunity — and full of barriers. The best projects launch quietly. Prices aren't listed publicly. By the time most buyers hear about a development, the best units are already gone. The system was built for insiders. Findle Global was built for everyone else.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Who We Are</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Findle Global is a preconstruction real estate marketplace on a simple mission: make tomorrow's properties discoverable today. We are not a brokerage. We are a technology platform entirely on your side.
              </p>
            </div>
          </section>

          {/* Differentiators Grid */}
          <section>
            <h3 className="text-[10px] tracking-[0.3em] uppercase text-indigo-500 mb-8">What We Do Differently</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Discover Tomorrow", desc: "No aggregated noise. Just real projects, real details, at the right time." },
                { title: "VIP Access", desc: "Every registered user gets the same first look at plans, pricing, and timelines." },
                { title: "Global Reach", desc: "Built for local buyers, NRI investors, and seasoned portfolio builders." },
                { title: "Total Transparency", desc: "Every listing is verified. No bait-and-switch. No guesswork." }
              ].map((item, idx) => (
                <div key={idx} className="p-6 bg-slate-900/20 border border-slate-800 rounded-xl">
                  <h4 className="font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Vision & Expansion */}
          <section className="bg-indigo-900/10 border border-indigo-500/10 p-10 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Our Vision</h3>
            <p className="text-slate-300 mb-8 italic">"The next great property shouldn't be a secret."</p>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              We're currently focused on Ontario, Canada — with expansion underway into additional Canadian cities and international markets including the UAE, India, and the United Kingdom. The future of real estate is global. So are we.
            </p>
            
            <div className="flex gap-4">
              <button type="button" onClick={() => router.push('/directory')} className="px-6 py-3 bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-indigo-500 transition-all">Explore Projects</button>
              <button type="button" onClick={() => router.push('/partner')} className="px-6 py-3 border border-slate-700 text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-slate-800 transition-all">Partner With Us</button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}