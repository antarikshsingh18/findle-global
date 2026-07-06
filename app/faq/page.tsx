"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const faqData = [
  {
    section: "About Findle Global",
    questions: [
      { q: "What is Findle Global?", a: "Findle Global is a preconstruction real estate marketplace that connects buyers, investors, and agents with verified new development projects..." },
      { q: "Is Findle Global a real estate brokerage?", a: "No. Findle Global is a proptech platform. We do not sell properties directly or represent buyers or sellers." },
      { q: "Is it free to use?", a: "Yes. Creating an account, browsing projects, and registering VIP interest is completely free." }
    ]
  },
  {
    section: "Preconstruction Buying",
    questions: [
      { q: "What is a preconstruction property?", a: "A home, condo, or townhouse purchased before it is built, directly from the builder." },
      { q: "What is the 10-day cooling-off period?", a: "Under Ontario law, buyers of new condos have 10 days after signing to rescind the agreement for any reason." }
    ]
  },
  // Add other sections here...
];

export default function FAQPage() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggle = (id: string) => setOpenIndex(openIndex === id ? null : id);

  return (
    <div className="min-h-screen bg-[#030305] text-slate-300 font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(49,46,129,0.15),_transparent_70%)]" />

      <main className="relative max-w-3xl mx-auto px-6 py-20">
        
        {/* Exit Control */}
        <div className="mb-12">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500 hover:text-indigo-400 transition-all"
          >
            <span className="text-lg">←</span> Exit
          </button>
        </div>

        <header className="mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-slate-400">Everything you need to know about Findle Global and preconstruction real estate.</p>
        </header>

        {/* FAQ Accordion */}
        <div className="space-y-8">
          {faqData.map((section, sIdx) => (
            <div key={sIdx}>
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-indigo-500 mb-4">{section.section}</h3>
              <div className="space-y-2">
                {section.questions.map((item, qIdx) => {
                  const id = `${sIdx}-${qIdx}`;
                  return (
                    <div key={qIdx} className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/20">
                      <button 
                        onClick={() => toggle(id)}
                        className="w-full text-left p-4 flex justify-between items-center hover:bg-slate-800/50 transition-all"
                      >
                        <span className="font-medium text-sm text-white">{item.q}</span>
                        <span className="text-indigo-500">{openIndex === id ? '−' : '+'}</span>
                      </button>
                      {openIndex === id && (
                        <div className="p-4 pt-0 text-sm text-slate-400 leading-relaxed border-t border-slate-800/50 bg-slate-900/40">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Contact */}
        <div className="mt-20 border-t border-slate-800 pt-12 text-center">
          <p className="text-slate-500 mb-4">Still have questions?</p>
          <a href="mailto:admin@findle.global" className="text-indigo-400 hover:underline">admin@findle.global</a>
        </div>
      </main>
    </div>
  );
}