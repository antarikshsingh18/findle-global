"use client";

import Navbar from '@/app/components/AdminNavLink';
import { AiOutlineClose } from 'react-icons/ai';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#030305] text-slate-300 font-sans py-20">
      <div className="max-w-3xl mx-auto px-6 relative">
        
        {/* Cross Button */}
        <button 
          onClick={() => window.history.back()}
          className="absolute -top-10 right-0 p-2 text-slate-500 hover:text-white transition-colors"
          aria-label="Close"
        >
          <AiOutlineClose size={28} />
        </button>

        <Navbar />
        
        {/* Header */}
        <header className="mb-12 mt-8">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-500 text-sm tracking-widest uppercase">Last Updated: July 2026</p>
        </header>

        {/* Content */}
        <article className="space-y-8 leading-relaxed text-slate-400">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>Findle Global ("we," "us," "our") is committed to protecting your privacy in accordance with Canada's Personal Information Protection and Electronic Documents Act (PIPEDA). By using findle.global, you agree to this Policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Who We Are</h2>
            <p>A preconstruction real estate technology platform. We are not a licensed brokerage — we operate as a digital marketplace connecting buyers, investors, and agents with new developments across Canada and internationally.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. What We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Name, email, phone number</li>
              <li>City, property preferences, and budget range</li>
              <li>Inquiry and VIP registration correspondence</li>
            </ul>
            <p className="mt-2 text-sm italic">Note: We do not currently use cookies, tracking pixels, or analytics tools. If this changes, you will be notified before implementation.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Why We Collect It</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To respond to your property inquiries</li>
              <li>To send VIP access alerts and project updates</li>
              <li>To share your interest with verified builder/developer partners (with your consent)</li>
              <li>To meet legal and regulatory obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Who We Share It With</h2>
            <p>We do not sell or license your data. We share it only with:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Builder & developer partners:</strong> When you register interest in a specific project.</li>
              <li><strong>Legal authorities:</strong> If required by law, including FINTRAC obligations under the PCMLTFA.</li>
              <li><strong>Successor entities:</strong> In the event of a merger or acquisition, with advance notice to you.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Your Rights & Security</h2>
            <p>Under PIPEDA, you may request to access, correct, or delete your personal information at any time by emailing <strong>info@findle.global</strong>. We respond within 30 days. We use SSL encryption and restrict internal data access on a need-to-know basis.</p>
          </section>

          <section className="bg-slate-900/40 border border-slate-800 p-6 rounded-lg mt-10">
            <h3 className="text-white font-bold mb-2">Questions?</h3>
            <p>Findle Global Privacy Office</p>
            <p className="text-indigo-400 font-mono">info@findle.global</p>
          </section>
        </article>
        
      </div>
    </div>
  );
}