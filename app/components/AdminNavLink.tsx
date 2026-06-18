"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

export default function AdminNavLink() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.role === 'admin') setIsAdmin(true);
    }
    checkAdmin();
  }, []);

  if (!isAdmin) return null;

  return (
    <Link
      href="/admin/add-listing"
      className="text-[11px] font-mono tracking-widest uppercase text-red-400 hover:text-red-300 transition duration-300"
    >
      ADMIN
    </Link>
  );
}