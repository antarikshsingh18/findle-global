"use client";

import { useState } from 'react';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

interface ShareButtonProps {
  title: string;
  url?: string;
  compact?: boolean;
}

export default function ShareButton({ title, url, compact = false }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(`Check out this property on Findle Global: ${title}`);
  
  const whatsappText = encodeURIComponent(`Check out this property on Findle Global: ${title} ${shareUrl}`);
  const twitterText = encodeURIComponent(`Check out ${title} on Findle Global! 🏡`);
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${twitterText}&url=${encodedUrl}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setIsOpen(false);
  };

  const handleInstagramCopy = async () => {
    // Instagram doesn't support direct URL sharing via Web API, so we copy link and notify user
    await navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard! You can now paste it into your Instagram Story or DM.");
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
          <div className="absolute bottom-full right-0 mb-2 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl z-50 w-48">
            <a
              href={`https://wa.me/?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono uppercase tracking-wider text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition-colors border-b border-slate-800"
            >
              <FaWhatsapp size={15} className="text-emerald-400" />
              <span>WhatsApp</span> 
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono uppercase tracking-wider text-slate-300 hover:bg-slate-800 hover:text-blue-500 transition-colors border-b border-slate-800"
            >
              <FaFacebookF size={14} className="text-blue-500" />
              <span>Facebook</span> 
            </a>
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono uppercase tracking-wider text-slate-300 hover:bg-slate-800 hover:text-sky-400 transition-colors border-b border-slate-800"
            >
              <FaTwitter size={14} className="text-sky-400" />
              <span>Twitter / X</span> 
            </a>
            <button
              type="button"
              onClick={handleInstagramCopy}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono uppercase tracking-wider text-slate-300 hover:bg-slate-800 hover:text-pink-500 transition-colors border-b border-slate-800 text-left"
            >
              <FaInstagram size={15} className="text-pink-500" />
              <span>Instagram</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono uppercase tracking-wider text-slate-300 hover:bg-slate-800 hover:text-indigo-400 transition-colors text-left"
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
          <div className="absolute top-full right-0 mt-2 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl z-50 w-56">
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
              <FaWhatsapp size={16} className="text-emerald-400" />
              <span>WhatsApp</span> 
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-[11px] font-mono uppercase tracking-wider text-slate-300 hover:bg-slate-800 hover:text-blue-500 transition-colors border-t border-slate-800"
            >
              <FaFacebookF size={15} className="text-blue-500" />
              <span>Facebook</span> 
            </a>
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-[11px] font-mono uppercase tracking-wider text-slate-300 hover:bg-slate-800 hover:text-sky-400 transition-colors border-t border-slate-800"
            >
              <FaTwitter size={15} className="text-sky-400" />
              <span>Twitter / X</span> 
            </a>
            <button
              type="button"
              onClick={handleInstagramCopy}
              className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-mono uppercase tracking-wider text-slate-300 hover:bg-slate-800 hover:text-pink-500 transition-colors border-t border-slate-800 text-left"
            >
              <FaInstagram size={16} className="text-pink-500" />
              <span>Instagram (Copy)</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-mono uppercase tracking-wider text-slate-300 hover:bg-slate-800 hover:text-indigo-400 transition-colors border-t border-slate-800 text-left"
            >
              <span>{copied ? '✓' : '🔗'}</span> {copied ? 'COPIED!' : 'Copy Link'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}