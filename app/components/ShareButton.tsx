"use client";

import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

interface ShareButtonProps {
  title: string;
  url?: string;
  compact?: boolean;
}

export default function ShareButton({ title, url, compact = false }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const whatsappText = encodeURIComponent(`Check out this property on Findle Global: ${title} ${shareUrl}`);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setIsOpen(false);
  };

  if (compact) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
          className="p-2 rounded-lg border border-slate-700/60 bg-slate-900/40 text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all text-[10px] font-mono tracking-widest"
        >
          ↗
        </button>

        {isOpen && (
          <div className="absolute bottom-full right-0 mb-2 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl z-50 w-44">
            <a
              href={`https://wa.me/?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono uppercase tracking-wider text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition-colors border-b border-slate-800"
            >
                <FaWhatsapp size={16}/>
              <span>WhatsApp</span> 
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono uppercase tracking-wider text-slate-300 hover:bg-slate-800 hover:text-indigo-400 transition-colors"
            >
              <span>{copied ? '✓' : '🔗'}</span> {copied ? 'COPIED!' : 'Copy Link'}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700/60 bg-slate-900/40 text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all text-[10px] font-mono tracking-widest uppercase"
      >
        ↗ SHARE
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-2 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl z-50 w-52">
            <div className="text-[8px] text-slate-600 tracking-widest uppercase px-4 pt-3 pb-1">
             SHARE OPTIONS
            </div>
            <a
              href={`https://wa.me/?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-[11px] font-mono uppercase tracking-wider text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition-colors border-t border-slate-800"
            >
                <FaWhatsapp size={16}/>
              <span>Share on WhatsApp</span> 
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-mono uppercase tracking-wider text-slate-300 hover:bg-slate-800 hover:text-indigo-400 transition-colors border-t border-slate-800"
            >
              <span>{copied ? '✓' : '🔗'}</span> {copied ? 'COPIED!' : 'Copy Link'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}