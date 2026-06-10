'use client';

import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/navigation';
import { supabase } from '../../lib/supabase';

export default function CRMDashboard() {
  const router = useRouter();
  // Use flexible types directly to prevent TypeScript 'never' errors
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('ALL');

  // Trigger sync on mounting component sequence
  useEffect(() => {
  async function guardTerminalAndLoad() {
    try {
      setLoading(true);
      
      // 🛡️ Auth check
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/portal'); // Boot unauthorized users out
        return;
      }

      await fetchLeads(); // Load data if session exists
    } catch (err) {
      console.error('Security checkpoint exception:', err);
    } finally {
      setLoading(false);
    }
  }

  guardTerminalAndLoad();
}, [router]);

  async function fetchLeads() {
    try {
      // setLoading(true);

      
      
      // Pull all rows from your live Supabase table
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setLeads(data);
    } catch (err) {
      console.error('Error loading CRM leads matrix:', err);
    } finally {
      // setLoading(false);
    }
  }

  // Safely push real-time status alterations up to the database cloud
  async function updateLeadStatus(id: string, newStatus: string) {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus } as any)
        .eq('id', id);

      if (error) throw error;
      
      // Instantly adjust local state arrays so the view updates live
      setLeads(prevLeads => 
        prevLeads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead)
      );
    } catch (err) {
      alert('Failed to authorize database status update sequence.');
    }
  }

  // Deep structural search matrix with optional-chaining text fallback protections
  const filteredLeads = leads.filter((lead) => {
    if (!lead) return false;

    const nameStr = lead.full_name ? String(lead.full_name).toLowerCase() : '';
    const propStr = lead.target_property ? String(lead.target_property).toLowerCase() : '';
    const emailStr = lead.email ? String(lead.email).toLowerCase() : '';
    const searchTarget = searchTerm.toLowerCase();

    const matchesSearch = 
      nameStr.includes(searchTarget) ||
      propStr.includes(searchTarget) ||
      emailStr.includes(searchTarget);

    const matchesFilter = filterType === 'ALL' || lead.buyer_type === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8 antialiased font-mono selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Block Layout */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-900 pb-6">
          <div>
            <div className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase mb-1">
              // CRM_CENTRAL_CORE
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              LEAD_ROUTING_MATRIX
            </h1>
          </div>
          <button 
            onClick={fetchLeads}
            className="px-4 py-2 text-xs border border-slate-800 bg-slate-900 rounded-lg hover:border-slate-700 transition cursor-pointer self-start md:self-auto"
          >
            ⟳ SYNC_NODE_RECORDS
          </button>
        </div>

        {/* Analytical Counter Metric Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-slate-900 bg-slate-900/30 p-4 rounded-xl">
            <div className="text-[9px] text-slate-500 tracking-widest uppercase">TOTAL_CAPTURED_NODES</div>
            <div className="text-2xl font-black text-white mt-1">{leads.length}</div>
          </div>
          <div className="border border-indigo-950/40 bg-indigo-500/5 p-4 rounded-xl shadow-[inset_0_0_15px_rgba(99,102,241,0.02)]">
            <div className="text-[9px] text-indigo-400 tracking-widest uppercase">ACTIVE_BUYERS</div>
            <div className="text-2xl font-black text-indigo-300 mt-1">
              {leads.filter(l => l?.buyer_type === 'BUYER').length}
            </div>
          </div>
          <div className="border border-purple-950/40 bg-purple-500/5 p-4 rounded-xl">
            <div className="text-[9px] text-purple-400 tracking-widest uppercase">UNASSIGNED_PIPELINES</div>
            <div className="text-2xl font-black text-purple-300 mt-1">
              {leads.filter(l => l?.status === 'New' || !l?.status).length}
            </div>
          </div>
        </div>

        {/* Text Filter Input Strip */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900/20 border border-slate-900 p-4 rounded-xl">
          <input
            type="text"
            placeholder="FILTER BY IDENTITY NAME, PROPERTY OR EMAIL..."
            className="w-full md:w-96 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-indigo-500 transition tracking-wider placeholder-slate-600 uppercase"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="flex gap-2 self-start md:self-auto">
            {['ALL', 'BUYER', 'AGENT'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 text-[10px] font-bold tracking-widest rounded-lg border transition uppercase cursor-pointer ${
                  filterType === type 
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' 
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Live Storage Matrix Data Display Panel */}
        <div className="border border-slate-900 bg-slate-950 rounded-xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="p-12 text-center text-xs text-slate-500 animate-pulse">
              [COMMENCING_RECORDS_POLLING_SEQUENCE]...
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-500">
              [ZERO_MATCHES_DETECTED_IN_THIS_SEQUENCE_INDEX]
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-900 bg-slate-900/40 text-[9px] text-slate-400 tracking-wider uppercase">
                    <th className="p-4">Identity Name</th>
                    <th className="p-4">Communications Network</th>
                    <th className="p-4">Target Node Property</th>
                    <th className="p-4">Routing Core</th>
                    <th className="p-4">Allocation Pipeline Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-900/20 transition-colors">
                      <td className="p-4 font-bold text-white tracking-wide uppercase">
                        {lead.full_name || 'UNRESOLVED_NAME'}
                      </td>
                      <td className="p-4 space-y-0.5 font-sans tracking-wide">
                        <div className="text-slate-300 font-mono text-xs">{lead.email || 'N/A'}</div>
                        <div className="text-slate-500 text-[11px] font-mono">{lead.phone || 'NO_SIGNAL_LOGGED'}</div>
                      </td>
                      <td className="p-4 text-slate-300 tracking-wide uppercase">
                        {lead.target_property || 'GENERAL_INQUIRY'}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-widest ${
                          lead.buyer_type === 'BUYER' 
                            ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                            : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        }`}>
                          {lead.buyer_type || 'UNKNOWN'}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={lead.status || 'New'}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className="bg-slate-900 border border-slate-800 text-slate-300 rounded px-2 py-1 text-[11px] outline-none focus:border-indigo-500 tracking-wide cursor-pointer uppercase"
                        >
                          <option value="New">NEW_ENTRY</option>
                          <option value="Contacted">CONTACTED</option>
                          <option value="In-Progress">IN_PROGRESS</option>
                          <option value="Closed">DEAL_CLOSED</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}