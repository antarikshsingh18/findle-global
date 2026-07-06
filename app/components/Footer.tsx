"use client";

import { useState } from 'react';
import Link from 'next/link';
import {AiFillInstagram, AiFillLinkedin, AiFillYoutube, AiFillFacebook, AiOutlineTwitter} from 'react-icons/ai';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative z-10 bg-[#030305] border-t border-slate-800/60 font-mono text-slate-400 mt-20" style={{ isolation: 'isolate' }}>

      {/* Trust Bar */}
      <div className="border-b border-slate-800/40 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center justify-center gap-6 text-[12px] tracking-widest uppercase text-slate-500">
            <span className="flex items-center gap-2"><span className="text-emerald-400"></span> SSL Secured</span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-2"><span className="text-indigo-400"></span> Verified Listings</span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-2"><span className="text-amber-400"></span> Preconstruction Specialists</span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-2"><span className="text-purple-400"></span> Global Reach, Local Expertise</span>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Section A — Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                {/* <div className="relative flex h-3 w-3">
                  <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.7)]"></span>
                </div> */}
                <img
                  src="/findle23.png"
                  alt="Findle Global"
                  className="h-80 w-auto object-contain opacity-90"
                  style={{ mixBlendMode: 'screen' }}    
                />
              </div>
              <p className="text-[12px] tracking-[0.15em] text-indigo-400 uppercase mb-3">
                Discover Tomorrow Today
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-sans max-w-sm">
                A next-generation proptech platform built for the future of preconstruction real estate. We connect buyers, investors, and agents to exclusive new developments — across Canada and beyond — before they go public.
              </p>
            </div>

            {/* Email Subscribe */}
            {/* <div className="space-y-3">
              <div className="text-[12px] tracking-widest uppercase text-slate-400 flex items-center gap-2">
                <span>📩</span> Get VIP Access
              </div>
              <p className="text-[11px] text-slate-600 font-sans">
                Floor plans, pricing, launch alerts — straight to your inbox.
              </p>
              {subscribed ? (
                <div className="text-[11px] text-emerald-400 tracking-widest uppercase border border-emerald-500/30 bg-emerald-950/20 rounded-lg px-4 py-2.5">
                  ✓ YOU&apos;RE ON THE LIST
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="YOUR@EMAIL.COM"
                    className="flex-1 bg-slate-900/40 border border-slate-800 rounded-lg px-3 py-2 text-[11px] text-white placeholder-slate-600 outline-none focus:border-indigo-500 transition-colors uppercase tracking-wider"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold tracking-widest uppercase rounded-lg transition-colors"
                  >
                    JOIN
                  </button>
                </form>
              )}
              <p className="text-[9px] text-slate-700 font-sans leading-relaxed">
                By subscribing, you agree to our Privacy Policy and consent to receive property updates from Findle Global.
              </p>
            </div> */}

            {/* Available In */}
            <div>
              <div className="text-[12px] tracking-widest uppercase text-slate-500 mb-2">🌐 Available In</div>
              <div className="flex flex-wrap gap-3 text-[11px]">
                <span className="text-slate-300">🇨🇦 Canada</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-600">🇦🇪 UAE <span className="text-[9px] text-amber-600">COMING SOON</span></span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-600">🇬🇧 UK <span className="text-[9px] text-amber-600">COMING SOON</span></span>
              </div>
            </div>
          </div>

          {/* Section B — Explore */}
          <div className="space-y-4">
            <h4 className="text-[20px] tracking-[0.2em] text-white uppercase font-bold border-b border-slate-800/60 pb-3">
               Explore
            </h4>
            <ul className="space-y-2.5 text-[11px]">
              {[
                { label: 'New Developments', href: '/directory' },
                { label: 'Pre-Con Condos', href: '/directory' },
                { label: 'Pre-Con Townhomes', href: '/directory' },
                { label: 'Pre-Con Detached', href: '/directory' },
                { label: 'Coming Soon Projects', href: '/directory' },
                { label: 'Sold Out Projects', href: '/directory' },
                { label: 'Open Houses', href: '/directory' },
                { label: 'Featured Builders', href: '/directory' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-slate-500 hover:text-indigo-400 transition-colors tracking-wider uppercase text-[10px]">
                    → {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section C — Top Markets */}
          <div className="space-y-4">
            <h4 className="text-[20px] tracking-[0.2em] text-white uppercase font-bold border-b border-slate-800/60 pb-3">
               Top Markets
            </h4>
            <div className="space-y-1">
              <div className="text-[9px] text-slate-600 uppercase tracking-widest mb-2">🇨🇦 Canada</div>
              <ul className="space-y-2">
                {[
                  'Toronto, ON', 'Mississauga, ON', 'Brampton, ON',
                  'Caledon, ON', 'Vaughan, ON', 'Markham, ON',
                  'Oakville, ON', 'Hamilton, ON', 'Kitchener–Waterloo, ON',
                  'Barrie, ON', 'Durham Region, ON'
                ].map((city) => (
                  <li key={city}>
                    <Link href={`/directory?city=${city.split(',')[0].toUpperCase()}`} className="text-slate-500 hover:text-indigo-400 transition-colors tracking-wider uppercase text-[10px]">
                      → {city}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="text-[9px] text-slate-600 uppercase tracking-widest mt-4 mb-2">🌍 Coming Soon</div>
              <ul className="space-y-2">
                {['Dubai, UAE', 'London, UK'].map((city) => (
                  <li key={city} className="text-slate-700 text-[10px] uppercase tracking-wider">
                    ○ {city}
                  </li>
                ))}
              </ul>
              <Link href="/directory" className="inline-block mt-3 text-[10px] text-indigo-400 hover:text-indigo-300 tracking-widest uppercase transition-colors">
                View All Markets →
              </Link>
            </div>
          </div>

          {/* Section D+E — Resources + Company */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-[20px] tracking-[0.2em] text-white uppercase font-bold border-b border-slate-800/60 pb-3">
                 Resources
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Findle Buyer's Guide", href: '/guide' },
                  //{ label: "Investor's Guide", href: '#' },
                 // { label: 'Pre-Construction 101', href: '#' },
                  // { label: 'Mortgage Calculator', href: '/directory' },
                  { label: 'Market Insights', href: '/marketInsights' },
                 // { label: 'Neighbourhood Guides', href: '#' },
                  { label: 'VIP Registration', href: '/directory' },
                  { label: 'FAQ', href: '/faq' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-slate-500 hover:text-indigo-400 transition-colors tracking-wider uppercase text-[10px]">
                      → {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-[20px] tracking-[0.2em] text-white uppercase font-bold border-b border-slate-800/60 pb-3">
                 Company
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: 'About Findle Global', href: '/about' },
                  // { label: 'How It Works', href: '#' },
                 // { label: 'For Developers', href: '#' },
                  { label: 'For Agents & Brokers', href: '/portal' },
                  { label: 'Partner With Us', href: '/partner' },
                  // { label: 'Careers', href: '#' },
                  // { label: 'Press & Media', href: '#' },
                  { label: 'Contact Us', href: '/contact' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-slate-500 hover:text-indigo-400 transition-colors tracking-wider uppercase text-[10px]">
                      → {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Section F — Social Icons */}
        <div className="mt-12 pt-8 border-t border-slate-800/40">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="text-[9px] tracking-widest uppercase text-slate-500">Follow Us</div>
              <div className="flex items-center gap-3">
                {[
                  { label: 'IG', icon: <AiFillInstagram size={18}/>, href: 'https://www.instagram.com/findle.global?igsh=MTBwYmxhaHlwNmFoYw==' },
                  { label: 'LI', icon: <AiFillLinkedin size={18}/>, href: 'https://www.linkedin.com/company/findle-global/?viewAsMember=true' },
                  { label: 'YT', icon: <AiFillYoutube size={18}/>, href: 'https://www.youtube.com/@FindleGlobal' },
                  { label: 'FB', icon: <AiFillFacebook size={18}/>, href: 'https://www.facebook.com/profile.php?id=61579885229639' },
                  { label: 'TW', icon: <AiOutlineTwitter size={18}/>, href: 'https://twitter.com/FindleGlobal' },
                  // { label: 'TK', icon: '🎵', href: '#' },
                  { label: 'X', icon: '✖', href: '#' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900/40 text-slate-500 hover:border-indigo-500/50 hover:text-indigo-400 transition-all text-xs"
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Back to top */}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[10px] tracking-widest uppercase text-slate-600 hover:text-indigo-400 transition-colors border border-slate-800 px-4 py-2 rounded-lg hover:border-indigo-500/50"
            >
              ↑ BACK TO TOP
            </button>
          </div>
        </div>
      </div>

      {/* Section H — Legal Bottom Bar */}
      <div className="border-t border-slate-800/40 bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">

        {/* Legal Links */}
<div className="flex flex-wrap items-center justify-between gap-4">
  <div className="text-[10px] text-slate-600 tracking-wider">
    © 2025 Findle Global Inc. All Rights Reserved.
  </div>
  <div className="flex flex-wrap gap-4 text-[10px] text-slate-600">
    {[
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Use', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Accessibility', path: '/accessibility' },
      { name: 'Sitemap', path: '/sitemap' },
    ].map((item, idx, arr) => (
      <span key={item.name} className="flex items-center gap-4">
        <Link 
          href={item.path} 
          className="hover:text-indigo-400 transition-colors tracking-wider uppercase"
        >
          {item.name}
        </Link>
        {idx < arr.length - 1 && <span className="text-slate-800">·</span>}
      </span>
    ))}
  </div>
</div>

          {/* Regulatory Disclaimer */}
          <div className="border border-slate-800/40 bg-slate-950/40 rounded-lg p-4">
            <p className="text-[10px] text-slate-600 font-sans leading-relaxed">
              <span className="text-slate-500 font-mono uppercase tracking-widest text-[9px]">Regulatory & Legal Disclaimer: </span>
              Findle Global is a real estate technology platform and is not a licensed real estate brokerage. The information on this website is provided for general informational purposes only. All preconstruction project details — including pricing, availability, floor plans, suite features, and incentives — are sourced from developer and builder partners and are subject to change without notice. Findle Global does not guarantee the accuracy, completeness, or reliability of any listing information. Always conduct independent due diligence and consult a licensed real estate professional registered with the Real Estate Council of Ontario (RECO) or the applicable regulatory authority in your jurisdiction before making any purchase decisions.
            </p>
          </div>

        </div>
      </div>

    </footer>
  );
}