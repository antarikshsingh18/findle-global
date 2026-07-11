"use client";

import { useRouter } from 'next/navigation';
import SiteNavbar from '@/app/components/SiteNavbar';

export default function GuidePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#030305] text-slate-300 font-sans selection:bg-indigo-500/30">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Navigation & Back Button */}
        <div className="flex justify-between items-center mb-16">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-all"
          >
            <span className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:border-indigo-500 transition-colors">
              ←
            </span>
            <span className="text-xs uppercase tracking-widest font-bold">Back</span>
          </button>
          <SiteNavbar />
        </div>

        {/* Hero Section */}
        <header className="mb-20 text-center">
          <h2 className="text-[10px] tracking-[0.3em] uppercase text-indigo-500 mb-4">Findle Global</h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Pre-Construction<br />Buyer Guide</h1>
          <p className="text-slate-400">Discover Tomorrow Today. Edition: July 2026.</p>
        </header>

        {/* Full Content */}
        <div className="space-y-16 leading-relaxed">
          
          <section>
            <h3 className="text-xl text-white font-bold mb-6 border-l-2 border-indigo-500 pl-4">Buyer Questionnaire</h3>
            <p className="mb-4">This questionnaire ensures we are aligned on your goals from day one.</p>
            <ul className="space-y-2 text-sm text-slate-400 list-inside">
              <li>• Which market(s) are you exploring — Ontario, UAE, or UK?</li>
              <li>• What's drawing you to this market or city?</li>
              <li>• Is this purchase for end-use, investment, or both?</li>
              <li>• Preferred unit type: condo, townhome, or freehold?</li>
              <li>• Target closing timeline (1–2 years, 3–5 years, etc.)?</li>
              <li>• Have you purchased pre-construction before?</li>
              <li>• Your top 5 priorities (location, developer, price, ROI, etc.)?</li>
              <li>• If investing, is HST rebate eligibility part of your planning?</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl text-white font-bold mb-6 border-l-2 border-indigo-500 pl-4">About Findle Global</h3>
            <p className="text-slate-400">Findle Global is a proptech-driven platform helping buyers discover opportunities across Ontario, the UAE, and the UK. We combine data-backed intelligence with hands-on advisory. Whether it's developer vetting, cross-border expertise, or full-lifecycle support, our mission is transparency.</p>
          </section>

          <section>
            <h3 className="text-xl text-white font-bold mb-6 border-l-2 border-indigo-500 pl-4">Financing & The 2026 HST Rebate</h3>
            <div className="space-y-4 text-sm text-slate-400">
              <p>Effective April 1, 2026, Ontario introduced an Enhanced HST Rebate:</p>
              <ul className="space-y-1 ml-4 list-disc">
                <li><strong>Up to $1M:</strong> Full 13% rebate (up to $130,000).</li>
                <li><strong>$1M – $1.5M:</strong> Rebate capped at $130,000.</li>
                <li><strong>$1.5M – $1.85M:</strong> Declining scale down to $24,000.</li>
                <li><strong>Over $1.85M:</strong> Standard $24,000 rebate applies.</li>
              </ul>
              <p className="italic border-t border-slate-900 pt-4">Note: Investors (NRRP) typically pay HST at closing and apply for the rebate post-closing once a lease is signed. Always verify with your lawyer.</p>
            </div>
          </section>

          <section>
            <h3 className="text-xl text-white font-bold mb-6 border-l-2 border-indigo-500 pl-4">Frequently Asked Questions</h3>
            <div className="space-y-6">
              {[
                { q: "How is pre-construction financing different?", a: "It involves a staged deposit structure (10-20%) paid over the construction timeline rather than one lump sum." },
                { q: "What is the cooling-off period?", a: "A statutory 10-day window in Ontario to review documents and rescind without penalty." },
                { q: "When do I get my keys?", a: "Occupancy occurs when the building is ready to live in; final closing (title transfer) follows once the building is registered." }
              ].map((faq, i) => (
                <div key={i} className="border-b border-slate-900 pb-4">
                  <h4 className="text-white font-semibold mb-2">{faq.q}</h4>
                  <p className="text-sm text-slate-500">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl text-white font-bold mb-6 border-l-2 border-indigo-500 pl-4">Key Vocabulary</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {[
                { t: "Assignment", d: "Reselling your contract before final closing." },
                { t: "Interim Occupancy", d: "Living in the unit before title transfer." },
                { t: "APS", d: "Agreement of Purchase and Sale." },
                { t: "Tarion", d: "Ontario's mandatory new-home warranty." },
                { t: "FINTRAC", d: "Anti-money-laundering compliance agency." }
              ].map((v, i) => (
                <div key={i} className="p-4 bg-slate-900/30 rounded-lg">
                  <p className="text-indigo-400 font-bold">{v.t}</p>
                  <p className="text-slate-500">{v.d}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-slate-900 text-center">
          <p className="text-indigo-500 font-bold mb-2">FINDLE GLOBAL</p>
          <p className="text-slate-600 text-sm italic">Discover Tomorrow Today.</p>
          <p className="text-slate-500 text-xs mt-4">admin@findle.global | +1 (437) 432-0003</p>
        </footer>
      </div>
    </div>
  );
}