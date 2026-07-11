"use client";

import { useState, ChangeEvent } from "react";
import Footer from '../components/Footer';
import SiteNavbar from '../components/SiteNavbar';

const ONTARIO_CITIES = [
  "Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton",
  "London", "Markham", "Vaughan", "Kitchener", "Windsor",
  "Richmond Hill", "Oakville", "Burlington", "Oshawa", "Barrie",
];

const PROPERTY_TYPES = [
  "Detached House", "Semi-Detached", "Townhouse", "Condo/Apartment",
  "Duplex", "Bungalow", "Link Home",
];

interface FormState {
  city: string;
  propertyType: string;
  sizeSqft: string;
  bedrooms: string;
  bathrooms: string; // Added Bathrooms to align with new contract
}

// Function to strip emojis from text
function stripEmojis(text: string): string {
  return text.replace(/[\p{Emoji}]/gu, "").trim();
}

// Function to parse report into sections
function parseReport(text: string): { title?: string; sections: Array<{ heading: string; content: string }> } {
  const cleaned = stripEmojis(text);
  const lines = cleaned.split("\n").filter((line) => line.trim());

  const sections: Array<{ heading: string; content: string }> = [];
  let currentSection = { heading: "", content: "" };

  for (const line of lines) {
    // Check if line is a heading (all caps or ends with colon)
    if (line.match(/^[A-Z\s]+:?$/) || line.endsWith(":")) {
      if (currentSection.heading && currentSection.content) {
        sections.push(currentSection);
      }
      currentSection = { heading: line.replace(/:$/, "").trim(), content: "" };
    } else if (currentSection.heading) {
      currentSection.content += (currentSection.content ? "\n" : "") + line;
    }
  }

  if (currentSection.heading && currentSection.content) {
    sections.push(currentSection);
  }

  return { sections: sections.length > 0 ? sections : [{ heading: "Analysis", content: cleaned }] };
}

export default function MarketInsights() {
  const [form, setForm] = useState<FormState>({
    city: "", propertyType: "", sizeSqft: "", bedrooms: "", bathrooms: "2",
  });
  
  // Changed state to hold the pre-formatted plain text report
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [logs, setLogs] = useState<string[]>([
    "> GLB-VAL index: initializing...",
    "> Ontario market feed: active",
    "> Awaiting valuation input...",
  ]);

  function pushLog(msg: string): void {
    setLogs((prev) => [...prev.slice(-6), `> ${msg}`]);
  }

  function handleChange(e: ChangeEvent<HTMLSelectElement | HTMLInputElement>): void {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleValuate(): Promise<void> {
    const { city, propertyType, sizeSqft, bedrooms, bathrooms } = form;
    if (!city || !propertyType || !sizeSqft || !bedrooms || !bathrooms) {
      setError("All fields are required.");
      return;
    }
    setError("");
    setReport(null);
    setLoading(true);
    pushLog(`Received: ${bedrooms}BR/${bathrooms}BA ${propertyType} — ${sizeSqft} sqft in ${city}`);
    pushLog("Connecting to generation engine...");

    try {
      const res = await fetch("/api/valuate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city,
          propertyType,
          squareFootage: Number(sizeSqft), // Adjusted key name to match backend API contract
          bedrooms: Number(bedrooms),
          bathrooms: Number(bathrooms), // Forwarding the requested parameter
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Server returned an extraction fault.");
      }

      // Read response as plain text instead of structured json array object
      const textReport = await res.text();
      setReport(textReport);
      
      pushLog(`Deep analysis compiled successfully.`);
      pushLog(`Template layout stream: active`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Valuation failed.";
      setError(message);
      pushLog("ERROR: model execution trace failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#030305] text-slate-100 selection:bg-indigo-500 selection:text-white antialiased relative overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-indigo-950/25 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute top-[15vh] left-[-15%] w-[50vw] h-[50vw] rounded-full bg-gradient-radial from-indigo-600/10 via-transparent to-transparent blur-3xl pointer-events-none z-0" />
      <div className="absolute top-[30vh] right-[-20%] w-[45vw] h-[45vw] rounded-full bg-gradient-radial from-emerald-600/8 via-transparent to-transparent blur-3xl pointer-events-none z-0" />

      <SiteNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
        
        {/* Header Section */}
        <section className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-950/20 px-4 py-2 text-[10px] font-mono tracking-widest text-indigo-300 mb-8 uppercase backdrop-blur-md hover:border-indigo-400/50 transition">
            [ ✓ VALUATION ENGINE ACTIVE ]
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-tight mb-6">
            Market <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl font-mono text-slate-400 max-w-3xl leading-relaxed">
            <span className="text-indigo-400">// </span>Real-time structural pricing trends and predictive valuation algorithms running continuously.
          </p>
        </section>

        {/* Signal Matrix Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {[
            { label: "GLB-VAL INDEX", value: "CAD 1.024",  sub: "+0.3% 24h"      },
            { label: "VOLATILITY",    value: "LOW",         sub: "Ontario stable"  },
            { label: "ANALYSIS MODE", value: report ? "COMPLETE" : "PENDING", sub: "dynamic output" },
          ].map((m) => (
            <div key={m.label} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300" />
              <div className="relative border border-slate-800/50 rounded-lg p-6 bg-slate-900/10 backdrop-blur-xl hover:border-indigo-500/30 transition">
                <div className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-2">{m.label}</div>
                <div className="text-2xl font-black text-white mb-1">{m.value}</div>
                <div className="text-xs text-slate-500">{m.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Valuation Form */}
          <div className="group relative h-fit">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
            <div className="relative border border-slate-800/50 rounded-xl p-8 bg-slate-900/10 backdrop-blur-xl">
              <div className="font-mono text-sm tracking-widest text-indigo-300 mb-8 uppercase">
                <span className="text-indigo-400">&gt;</span> PROPERTY VALUATION INPUT
              </div>

              <div className="space-y-5 mb-8">
                <div>
                  <label className="block text-xs font-mono tracking-widest text-slate-400 uppercase mb-3">City / Area</label>
                  <select name="city" value={form.city} onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 font-mono text-sm hover:border-indigo-500/50 focus:outline-none focus:border-indigo-500/80 transition select-custom">
                    <option value="" className="bg-[#0c0c12]">Select city</option>
                    {ONTARIO_CITIES.map((c) => <option key={c} value={c} className="bg-[#0c0c12]">{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-widest text-slate-400 uppercase mb-3">Property Type</label>
                  <select name="propertyType" value={form.propertyType} onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 font-mono text-sm hover:border-indigo-500/50 focus:outline-none focus:border-indigo-500/80 transition select-custom">
                    <option value="" className="bg-[#0c0c12]">Select type</option>
                    {PROPERTY_TYPES.map((t) => <option key={t} value={t} className="bg-[#0c0c12]">{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-widest text-slate-400 uppercase mb-3">Size (SQ FT)</label>
                  <input
                    type="number" name="sizeSqft" value={form.sizeSqft} onChange={handleChange} placeholder="e.g. 1200"
                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 font-mono text-sm placeholder:text-slate-600 hover:border-indigo-500/50 focus:outline-none focus:border-indigo-500/80 transition"
                    min="200" max="10000"
                  />
                </div>

                {/* Two Column Bedrooms and Bathrooms Split */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono tracking-widest text-slate-400 uppercase mb-3">Bedrooms</label>
                    <select name="bedrooms" value={form.bedrooms} onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 font-mono text-sm hover:border-indigo-500/50 focus:outline-none focus:border-indigo-500/80 transition select-custom">
                      <option value="" className="bg-[#0c0c12]">Select</option>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n} className="bg-[#0c0c12]">{n} BR</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-widest text-slate-400 uppercase mb-3">Bathrooms</label>
                    <select name="bathrooms" value={form.bathrooms} onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 font-mono text-sm hover:border-indigo-500/50 focus:outline-none focus:border-indigo-500/80 transition select-custom">
                      {[1, 1.5, 2, 2.5, 3, 4].map((n) => (
                        <option key={n} value={n} className="bg-[#0c0c12]">{n} BA</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {error && <div className="text-xs text-red-400 mb-6 font-mono">{error}</div>}

              <button
                onClick={handleValuate} disabled={loading}
                className="w-full group/btn relative overflow-hidden rounded-lg border border-indigo-500/50 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 px-6 py-3 font-mono text-sm tracking-widest text-indigo-300 hover:border-indigo-400/80 hover:text-indigo-200 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition disabled:opacity-50"
              >
                <span>{loading ? "[ RUNNING MODEL... ]" : "[ RUN VALUATION ]"}</span>
              </button>
            </div>
          </div>

          {/* Results Block Column */}
          <div className="space-y-6">
            {report && (
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="relative border border-slate-800/50 rounded-xl p-8 bg-slate-900/10 backdrop-blur-xl">
                  <div className="font-mono text-sm tracking-widest text-indigo-300 mb-6 uppercase">
                    <span className="text-indigo-400">&gt;</span> REAL ESTATE INTELLIGENCE REPORT
                  </div>

                  {/* whitespace-pre-line honors the verbatim output spacing, emojis, and styling generated by the API template */}
                  <div className="whitespace-pre-line font-mono text-sm md:text-base leading-relaxed text-slate-200 bg-slate-950/40 p-5 rounded-lg border border-slate-800/40 max-h-[500px] overflow-y-auto custom-scrollbar">
                    {report}
                  </div>
                </div>
              </div>
            )}

            {/* Terminal Log Container */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
              <div className="relative border border-slate-800/50 rounded-xl p-6 bg-slate-900/10 backdrop-blur-xl max-h-80 overflow-y-auto">
                <div className="space-y-2">
                  {logs.map((line, i) => (
                    <div
                      key={i} className="text-xs text-slate-500 font-mono leading-relaxed"
                      style={{ opacity: 0.4 + (i / logs.length) * 0.6 }}
                    >
                      {line}
                    </div>
                  ))}
                  <span className="text-sm text-indigo-400 animate-pulse">█</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>

  );
}