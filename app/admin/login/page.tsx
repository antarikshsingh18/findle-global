"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      // Check if user has admin role in metadata
      const role = data.user?.user_metadata?.role;
      if (role !== 'admin') {
        await supabase.auth.signOut();
        throw new Error('ACCESS DENIED: Insufficient clearance level.');
      }

      router.push('/admin/add-listing');
    } catch (err: any) {
      setError(err.message || 'AUTH FAILED');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030305] text-slate-100 flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-md bg-slate-950 border border-slate-900 rounded-2xl p-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
        
        <div className="mb-8 text-center">
          <span className="text-[10px] tracking-widest text-red-400 font-bold uppercase">// ADMIN_SECURE_GATEWAY</span>
          <h1 className="text-xl font-black text-white uppercase mt-1 tracking-wider">Admin Access</h1>
          <p className="text-[11px] text-slate-500 mt-2">RESTRICTED — AUTHORIZED PERSONNEL ONLY</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/30 border border-red-500/30 rounded-xl text-[11px] text-red-400 text-center tracking-wide uppercase">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5 pl-1">Admin Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@findle.com"
              className="w-full bg-slate-900/40 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5 pl-1">Admin Passkey</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-slate-900/40 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-red-900/40 hover:bg-red-600 border border-red-500/50 text-red-300 hover:text-white font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl transition-all disabled:opacity-50"
          >
            {loading ? 'VERIFYING CLEARANCE...' : 'ENTER ADMIN ZONE →'}
          </button>
        </form>
      </div>
    </div>
  );
}