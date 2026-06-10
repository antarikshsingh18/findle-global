"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

export default function PortalGateway() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAgentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // 🚀 Authentication success: Route them straight to the hidden dashboard
      router.push('./crm');
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Access Denied: Invalid Security Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030305] text-slate-100 flex items-center justify-center p-4 font-mono selection:bg-purple-600">
      <div className="w-full max-w-md bg-slate-950 border border-slate-900 rounded-2xl p-8 backdrop-blur-xl relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        
        {/* Subtle Cyber Accents */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        
        <div className="mb-8 text-center">
          <span className="text-[10px] tracking-widest text-purple-400 font-bold uppercase">// SECURE_GATEWAY_AUTH</span>
          <h1 className="text-xl font-black text-white uppercase mt-1 tracking-wider">Agent Workspace</h1>
          <p className="text-[11px] text-slate-500 mt-2">AUTHORIZED NETWORK PERSONNEL ONLY</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-red-950/30 border border-red-500/30 rounded-xl text-[11px] text-red-400 text-center tracking-wide uppercase animate-shake">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleAgentLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5 pl-1">Secure Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="agent@network.com"
              className="w-full bg-slate-900/40 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5 pl-1">Passkey Node</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-slate-900/40 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-slate-100 hover:bg-white text-black font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl transition-all disabled:opacity-50 shadow-[0_4px_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
          >
            {loading ? 'INITIALIZING UPLINK...' : 'DECRYPT & ENTER →'}
          </button>
        </form>
      </div>
    </div>
  );
}