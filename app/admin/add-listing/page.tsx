"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';

const ONTARIO_CITIES = ['TORONTO', 'MISSISSAUGA', 'OAKVILLE', 'BRAMPTON', 'WHITBY','BARRIE','VAUGHAN','BURLINGTON','OSHAWA','PICKERING','RICHMOND HILL','MARKHAM', 'CALEDON', 'NEWMARKET', 'GUELPH', 'MILTON', 'CAMBRIDGE', 'KITCHENER'];
const STATUS_OPTIONS = ['ACTIVE', 'REGISTRATION', 'CONSTRUCTION', 'SOLD OUT'];

interface FormState {
  title: string;
  price_text: string;
  beds_text: string;
  sqft_text: string;
  image_url: string;
  city: string;
  developer: string;
  neighborhood: string;
  selling_status: string;
  is_featured: boolean;
  highlights: string; // raw input, comma-separated -> array on submit
  document_links: string; // raw input, one per line -> array on submit
  incentives_list: string; 
  deposit_list: string;
}

const EMPTY_FORM: FormState = {
  title: '',
  price_text: '',
  beds_text: '',
  sqft_text: '',
  image_url: '',
  city: ONTARIO_CITIES[0],
  developer: '',
  neighborhood: '',
  selling_status: 'ACTIVE',
  is_featured: false,
  highlights: '',
  document_links: '',
  incentives_list: '',
  deposit_list: '',
};

export default function AdminAddListingPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [listings, setListings] = useState<any[]>([]);
const [activeTab, setActiveTab] = useState<'ADD' | 'MANAGE'>('ADD');
const [deleting, setDeleting] = useState<string | null>(null);

useEffect(() => {
  async function checkAdminAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/admin/login');
      return;
    }
    const role = user.user_metadata?.role;
    if (role !== 'admin') {
      router.push('/admin/login');
    }
  }
  checkAdminAuth();
}, []);

    useEffect(() => {
    async function fetchListings() {
      const { data } = await supabase
        .from('c21_portal_listings')
        .select('id, title, city, selling_status, created_at')
        .order('created_at', { ascending: false });
      if (data) setListings(data);
    }
    fetchListings();
  }, [successMsg]);

  const handleDelete = async (id: string, title: string) => {
  if (!confirm(`DELETE "${title}"? This cannot be undone.`)) return;
  setDeleting(id);
  try {
    const { error } = await supabase
      .from('c21_portal_listings')
      .delete()
      .eq('id', id);
    if (error) throw error;
    setListings((prev) => prev.filter((l) => l.id !== id));
  } catch (err: any) {
    alert(`DELETE FAILED: ${err.message}`);
  } finally {
    setDeleting(null);
  }
};


  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    // --- Required field check (mirrors the NOT NULL constraints in c21_portal_listings) ---
    if (!form.title.trim() || !form.beds_text.trim() || !form.city.trim()) {
      setErrorMsg('TITLE, BEDS_TEXT, and CITY are required fields.');
      setSubmitting(false);
      return;
    }

    // --- Convert raw text inputs into proper array values for Postgres ---
    const highlightsArray = form.highlights
      .split(',')
      .map((h) => h.trim())
      .filter((h) => h.length > 0);

    const documentLinksArray = form.document_links
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    try {
      const { error } = await supabase.from('c21_portal_listings').insert({
        title: form.title.trim(),
        price_text: form.price_text.trim() || null,
        beds_text: form.beds_text.trim(),
        sqft_text: form.sqft_text.trim() || null,
        image_url: form.image_url.trim() || null,
        city: form.city.trim(),
        developer: form.developer.trim() || null,
        neighborhood: form.neighborhood.trim() || null,
        selling_status: form.selling_status,
        is_featured: form.is_featured,
        highlights: highlightsArray,
        document_links: documentLinksArray,
        incentives_list: form.incentives_list.split('\n').map(i => i.trim()).filter(i => i.length > 0),
        deposit_list: form.deposit_list.split('\n').map(d => d.trim()).filter(d => d.length > 0),
      });

      if (error) throw error;

      setSuccessMsg('LISTING WRITTEN TO C21_PORTAL_LISTINGS.');
      setForm(EMPTY_FORM);
    } catch (err: any) {
      setErrorMsg(err.message || 'INSERT FAILED: UNKNOWN DATABASE ERROR');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030305] text-slate-100 font-mono selection:bg-purple-600">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <header className="mb-8 border-b border-slate-800/60 pb-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-widest text-purple-400 font-bold uppercase">// ADMIN_PANEL</span>
            <h1 className="text-2xl font-black text-white uppercase mt-1 tracking-wider">Add Pre-con Listing</h1>
            <p className="text-[11px] text-slate-500 mt-2">MANUAL ENTRY → c21_portal_listings</p>
          </div>
          <button
            type="button"
            onClick={() => router.push('/portal')}
            className="text-[10px] tracking-widest uppercase text-slate-500 hover:text-white transition-colors"
          >
            ← Back to Portal
          </button>
        </header>

        <div className="bg-slate-950 border border-slate-900 p-1 rounded-xl flex gap-1 mb-8 font-mono text-[10px] tracking-widest">
  <button
    type="button"
    onClick={() => setActiveTab('ADD')}
    className={`flex-1 py-2 rounded-lg font-bold transition-all ${
      activeTab === 'ADD' ? 'bg-purple-600 text-white' : 'text-slate-500 hover:text-white'
    }`}
  >
    + ADD LISTING
  </button>
  <button
    type="button"
    onClick={() => setActiveTab('MANAGE')}
    className={`flex-1 py-2 rounded-lg font-bold transition-all ${
      activeTab === 'MANAGE' ? 'bg-red-900/60 text-red-300 border border-red-500/30' : 'text-slate-500 hover:text-white'
    }`}
  >
    MANAGE / REMOVE
  </button>
</div>

        {/* Status messages */}
        {errorMsg && (
          <div className="mb-6 p-3 bg-red-950/30 border border-red-500/30 rounded-xl text-[11px] text-red-400 text-center tracking-wide uppercase">
            ⚠️ {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mb-6 p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-[11px] text-emerald-400 text-center tracking-wide uppercase">
            ✓ {successMsg}
          </div>
        )}

        {activeTab === 'ADD' ? (
  // your existing <form> goes here
  <form onSubmit={handleSubmit} className="space-y-6">
    {/* ... all existing form fields ... */}
  </form>
) : (
  <div className="space-y-3">
    <div className="text-[9px] tracking-widest text-slate-500 uppercase mb-4">
      // {listings.length} LISTINGS IN C21_PORTAL_LISTINGS
    </div>
    {listings.length === 0 ? (
      <div className="text-center text-slate-600 font-mono text-xs py-12">NO LISTINGS FOUND</div>
    ) : (
      listings.map((listing) => (
        <div
          key={listing.id}
          className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl px-5 py-4"
        >
          <div>
            <div className="text-sm font-bold text-white uppercase tracking-wide">{listing.title}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5 uppercase">
              {listing.city} · {listing.selling_status} · ID: {listing.id.slice(0, 8)}
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleDelete(listing.id, listing.title)}
            disabled={deleting === listing.id}
            className="ml-4 px-4 py-2 rounded-lg border border-red-500/40 bg-red-950/20 text-red-400 hover:bg-red-500 hover:text-white font-mono text-[10px] tracking-widest uppercase transition-all disabled:opacity-40"
          >
            {deleting === listing.id ? 'DELETING...' : 'DELETE →'}
          </button>
        </div>
      ))
    )}
  </div>
)}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Section: Core Info */}
          <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            <div className="text-[9px] tracking-widest text-slate-500 uppercase mb-2">// CORE_LISTING_DATA</div>

            <Field label="Project Title *">
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="e.g. Rolling Woods"
                className={inputClass}
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="City *">
                <select
                  required
                  value={form.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  className={inputClass}
                >
                  {ONTARIO_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>

              <Field label="Neighborhood">
                <input
                  type="text"
                  value={form.neighborhood}
                  onChange={(e) => updateField('neighborhood', e.target.value)}
                  placeholder="e.g. Castlemore"
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Beds Text *">
                <input
                  type="text"
                  required
                  value={form.beds_text}
                  onChange={(e) => updateField('beds_text', e.target.value)}
                  placeholder="e.g. 3+1 Bed"
                  className={inputClass}
                />
              </Field>

              <Field label="Sqft Text">
                <input
                  type="text"
                  value={form.sqft_text}
                  onChange={(e) => updateField('sqft_text', e.target.value)}
                  placeholder="e.g. 1,800 - 2,200 sqft"
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Price Text">
              <input
                type="text"
                value={form.price_text}
                onChange={(e) => updateField('price_text', e.target.value)}
                placeholder="e.g. Starting From The High $600's"
                className={inputClass}
              />
            </Field>

            <Field label="Developer">
              <input
                type="text"
                value={form.developer}
                onChange={(e) => updateField('developer', e.target.value)}
                placeholder="e.g. Century 21 Partner"
                className={inputClass}
              />
            </Field>
          </div>

          {/* Section: Status & Media */}
          <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            <div className="text-[9px] tracking-widest text-slate-500 uppercase mb-2">// STATUS_AND_MEDIA</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Selling Status">
                <select
                  value={form.selling_status}
                  onChange={(e) => updateField('selling_status', e.target.value)}
                  className={inputClass}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </Field>

              <Field label="Featured Listing">
                <button
                  type="button"
                  onClick={() => updateField('is_featured', !form.is_featured)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs border transition-colors ${
                    form.is_featured
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                      : 'bg-slate-900/40 border-slate-800 text-slate-500'
                  }`}
                >
                  {form.is_featured ? '★ FEATURED — shown in sponsored row' : '☆ Not featured'}
                </button>
              </Field>
            </div>

            <Field label="Image URL">
              <input
                type="text"
                value={form.image_url}
                onChange={(e) => updateField('image_url', e.target.value)}
                placeholder="https://..."
                className={inputClass}
              />
            </Field>
          </div>

          {/* Section: Arrays */}
          <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            <div className="text-[9px] tracking-widest text-slate-500 uppercase mb-2">// HIGHLIGHTS_AND_DOCUMENTS</div>

            <Field label="Highlights (comma separated)">
              <input
                type="text"
                value={form.highlights}
                onChange={(e) => updateField('highlights', e.target.value)}
                placeholder="e.g. Ravine Lot, EV Ready, Smart Home Package"
                className={inputClass}
              />
              <p className="text-[10px] text-slate-600 mt-1.5 pl-1">Saved as a text array — no brackets needed, just separate with commas.</p>
            </Field>

            <Field label="Document Links (one per line)">
              <textarea
                rows={3}
                value={form.document_links}
                onChange={(e) => updateField('document_links', e.target.value)}
                placeholder={"https://drive.google.com/drive/folders/...\nhttps://drive.google.com/drive/folders/..."}
                className={`${inputClass} resize-none`}
              />
              <p className="text-[10px] text-slate-600 mt-1.5 pl-1">Saved as a text array — paste each link on its own line, no brackets or quotes needed.</p>
            </Field>

            <Field label="Incentives (one per line)">
  <textarea
    rows={4}
    value={form.incentives_list}
    onChange={(e) => updateField('incentives_list', e.target.value)}
    placeholder={"Only $55,000 Deposit Until Occupancy\n6-piece Appliance Package\n1-car Underground Parking Spot"}
    className={`${inputClass} resize-none`}
  />
  <p className="text-[10px] text-slate-600 mt-1.5 pl-1">Each line becomes one incentive item on the listing page.</p>
</Field>

<Field label="Deposit Structure (one per line)">
  <textarea
    rows={4}
    value={form.deposit_list}
    onChange={(e) => updateField('deposit_list', e.target.value)}
    placeholder={"$10,000.00 On Signing\n$7,500.00 - 30 days\n$7,500.00 - 60 days"}
    className={`${inputClass} resize-none`}
  />
  <p className="text-[10px] text-slate-600 mt-1.5 pl-1">Each line becomes one deposit item on the listing page.</p>
</Field>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-slate-100 hover:bg-white text-black font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl transition-all disabled:opacity-50 shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
          >
            {submitting ? 'WRITING TO DATABASE...' : 'SAVE LISTING →'}
          </button>
        </form>
      </div>
    </div>
  );
}

// --- Shared field wrapper ---
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5 pl-1">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-slate-900/40 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors";