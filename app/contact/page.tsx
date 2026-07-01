"use client";

import Navbar from '@/app/components/AdminNavLink';
import { AiFillInstagram, AiFillLinkedin, AiFillYoutube, AiFillFacebook, AiOutlineTikTok } from 'react-icons/ai';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#030305] text-slate-300 font-sans">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Navbar />

        {/* Hero Section */}
        <header className="py-20 text-center">
          <h2 className="text-[10px] tracking-[0.3em] uppercase text-indigo-500 mb-4">Contact Us</h2>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Got Questions?<br />We're Here.</h1>
          <p className="text-lg text-slate-400 max-w-lg mx-auto">Whether you're a buyer, investor, agent, or builder — we'd love to hear from you.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Contact Details */}
          <div className="space-y-12">
            <section>
              <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> Get In Touch
              </h3>
              <div className="space-y-4 text-slate-400">
                <p><strong>General:</strong> info@findle.global</p>
                <p><strong>Partnerships:</strong> connect@findle.global</p>
                <p><strong>Support:</strong> +1 (437) 432-0003</p>
                <p className="text-xs text-slate-600 italic">Mon – Fri, 9AM – 6PM EST</p>
              </div>
            </section>

            <section>
              <h3 className="text-white font-semibold mb-4">Our Markets</h3>
              <p className="text-sm border-l border-slate-800 pl-4">📍 Ontario, Canada<br />🌍 UAE & UK — Coming Soon</p>
            </section>
          </div>

          {/* Form */}
          <form className="bg-slate-900/20 border border-slate-800 p-8 rounded-2xl space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <input type="text" placeholder="Full Name" className="bg-transparent border border-slate-700 p-3 rounded-lg focus:border-indigo-500 outline-none transition" />
              <input type="email" placeholder="Email Address" className="bg-transparent border border-slate-700 p-3 rounded-lg focus:border-indigo-500 outline-none transition" />
              <input type="tel" placeholder="Phone (Optional)" className="bg-transparent border border-slate-700 p-3 rounded-lg focus:border-indigo-500 outline-none transition" />
              <select className="bg-transparent border border-slate-700 p-3 rounded-lg focus:border-indigo-500 outline-none text-slate-400">
                <option>I am a...</option>
                <option>Buyer</option>
                <option>Investor</option>
                <option>Agent</option>
                <option>Builder</option>
              </select>
              <textarea placeholder="How can we help?" rows={4} className="bg-transparent border border-slate-700 p-3 rounded-lg focus:border-indigo-500 outline-none transition" />
            </div>
            <button className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-indigo-500 hover:text-white transition-all">
              Send Message
            </button>
            <p className="text-[10px] text-center text-slate-600">We typically respond within 1 business day.</p>
          </form>
        </div>

        {/* Footer CTA */}
        <footer className="mt-24 pt-12 border-t border-slate-900 text-center">
          <h4 className="text-white font-bold mb-6">Follow Us</h4>
          <div className="flex justify-center gap-6 text-2xl text-slate-500 mb-12">
            <AiFillInstagram className="hover:text-indigo-400 cursor-pointer" />
            <AiFillLinkedin className="hover:text-indigo-400 cursor-pointer" />
            <AiFillYoutube className="hover:text-indigo-400 cursor-pointer" />
            <AiFillFacebook className="hover:text-indigo-400 cursor-pointer" />
            <AiOutlineTikTok className="hover:text-indigo-400 cursor-pointer" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {['Explore Projects', 'Get VIP Access', 'About Findle Global'].map((link) => (
              <button key={link} className="px-6 py-2 border border-slate-800 rounded-full text-xs hover:border-indigo-500 transition">
                {link}
              </button>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}