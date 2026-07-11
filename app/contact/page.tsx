"use client";

import { useForm, ValidationError } from '@formspree/react';
import { AiFillInstagram, AiFillLinkedin, AiFillYoutube, AiFillFacebook, AiOutlineTikTok } from 'react-icons/ai';
import {useRouter} from 'next/navigation';
import SiteNavbar from '@/app/components/SiteNavbar';

export default function ContactPage() {
  // Formspree logic
  const [state, handleSubmit] = useForm("mrewyrnn");
  const router = useRouter();
  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-[#030305] flex items-center justify-center text-white text-center p-8 relative">
        {/* The Cross Button */}
        <button 
          onClick={() => router.back()} 
          className="absolute top-10 right-10 text-slate-500 hover:text-white transition-all text-2xl"
          aria-label="Close"
        >
          ✕
        </button>

        <div>
          <h2 className="text-3xl font-bold mb-4">MESSAGE RECEIVED</h2>
          <p className="text-slate-400">Thank you for reaching out. We will be in touch shortly.</p>
        </div>
      </div>
    );
  }
  // Success UI
  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-[#030305] flex items-center justify-center text-white text-center p-8">
        <div>
          <h2 className="text-3xl font-bold mb-4">MESSAGE RECEIVED</h2>
          <p className="text-slate-400">Thank you for reaching out. We will be in touch shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030305] text-slate-300 font-sans">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <SiteNavbar />

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
                <p><strong>General:</strong> admin@findle.global</p>
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
          <form onSubmit={handleSubmit} className="bg-slate-900/20 border border-slate-800 p-8 rounded-2xl space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <input type="text" name="name" placeholder="Full Name" required className="bg-transparent border border-slate-700 p-3 rounded-lg focus:border-indigo-500 outline-none transition" />
              <input type="email" name="email" placeholder="Email Address" required className="bg-transparent border border-slate-700 p-3 rounded-lg focus:border-indigo-500 outline-none transition" />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
              
              <input type="tel" name="phone" placeholder="Phone (Optional)" className="bg-transparent border border-slate-700 p-3 rounded-lg focus:border-indigo-500 outline-none transition" />
              
              <select name="role" className="bg-transparent border border-slate-700 p-3 rounded-lg focus:border-indigo-500 outline-none text-slate-400">
                <option>I am a...</option>
                <option value="Buyer">Buyer</option>
                <option value="Investor">Investor</option>
                <option value="Agent">Agent</option>
                <option value="Builder">Builder</option>
              </select>
              
              <textarea name="message" placeholder="How can we help?" rows={4} required className="bg-transparent border border-slate-700 p-3 rounded-lg focus:border-indigo-500 outline-none transition" />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>
            
            <button 
              type="submit" 
              disabled={state.submitting}
              className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-indigo-500 hover:text-white transition-all disabled:opacity-50"
            >
              {state.submitting ? 'SENDING...' : 'Send Message'}
            </button>
            <p className="text-[10px] text-center text-slate-600">We typically respond within 1 business day.</p>
          </form>
        </div>
      </div>
    </div>
  );
}