"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    }
    checkSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    router.refresh();
  };

  if (!isLoggedIn) return null;

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-[11px] font-mono tracking-widest uppercase text-slate-400 hover:text-red-400 cursor-pointer transition duration-300"
    >
      LOGOUT
    </button>
  );
}