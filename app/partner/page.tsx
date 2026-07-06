"use client";

import React from 'react';
import Navbar from '@/app/components/AdminNavLink'; // Update path if needed
import {useRouter} from 'next/navigation';

export default function PartnerPage() {
    const router = useRouter();
  return (
    <div className="min-h-screen bg-[#030305] text-slate-300 font-sans selection:bg-indigo-500/30">
      
      {/* Background Effect */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(49,46,129,0.15),_transparent_70%)]" />

      <main className="relative max-w-5xl mx-auto px-6 py-20">

        <div className="absolute top-8 left-6 md:left-0">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500 hover:text-indigo-400 transition-all"
          >
            <span className="text-lg">←</span> Exit
          </button>
        </div>
        
        {/* Header */}
        <header className="mb-20 text-center">
          <h2 className="text-[10px] tracking-[0.3em] uppercase text-indigo-500 mb-4">Partner With Us</h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Grow With Canada's<br />Preconstruction Marketplace</h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400">
            Whether you're launching a development or representing buyers — Findle Global gives you the platform, the audience, and the tools to do more.
          </p>
        </header>

        {/* Section: Builders */}
        <section className="mb-32">
          <div className="bg-slate-900/30 border border-slate-800 p-8 md:p-12 rounded-2xl backdrop-blur-md">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="text-3xl">🏗️</span> FOR BUILDERS & DEVELOPERS
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <h3 className="font-bold text-white text-lg">Why List on Findle Global?</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  The way buyers discover preconstruction has changed. They're researching online, comparing projects, and registering interest before they ever speak to a salesperson. Findle Global is where that research happens.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-white text-lg">What You Get</h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>✓ Complete Digital Project Listing</li>
                  <li>✓ Pre-Launch VIP Pipeline</li>
                  <li>✓ Real-Time Buyer Interest Data</li>
                  <li>✓ Partner Agent Network Access</li>
                </ul>
              </div>
            </div>

            <button className="w-full py-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all uppercase tracking-widest text-xs">
              Apply as Builder
            </button>
          </div>
        </section>

        {/* Section: Agents */}
        <section className="mb-32">
          <div className="bg-slate-900/30 border border-slate-800 p-8 md:p-12 rounded-2xl backdrop-blur-md">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="text-3xl">🤝</span> FOR AGENTS & BROKERS
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <h3 className="font-bold text-white text-lg">Your Clients, Protected.</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Findle Global makes sure that when your clients find a project, you're the agent attached to that relationship. We work for you, not around you.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-white text-lg">Key Benefits</h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>✓ Client Registration & Protection</li>
                  <li>✓ Full Project Inventory Access</li>
                  <li>✓ Matched Buyer Leads</li>
                  <li>✓ Early Access to New Launches</li>
                </ul>
              </div>
            </div>

            <button className="w-full py-4 rounded-lg border border-indigo-500/50 hover:bg-indigo-500/10 text-indigo-400 font-bold transition-all uppercase tracking-widest text-xs">
              Apply as Agent
            </button>
          </div>
        </section>

        {/* Footer Contact */}
        <div className="text-center border-t border-slate-800 pt-12">
          <p className="text-slate-500 mb-6">Not sure which partnership is right for you? Let's talk.</p>
          <div className="flex flex-col md:flex-row justify-center gap-8 text-sm">
            <a href="tel:+14374320003" className="hover:text-indigo-400 transition-colors">📞 +1 (437) 432-0003</a>
            <a href="mailto:connect@findle.global" className="hover:text-indigo-400 transition-colors">📧 connect@findle.global</a>
          </div>
        </div>

      </main>
    </div>
  );
}