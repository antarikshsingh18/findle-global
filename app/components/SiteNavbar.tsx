import Link from 'next/link';
import AdminNavLink from './AdminNavLink';
import LogoutButton from './LogoutButton';

export default function SiteNavbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/40 bg-[#030305]/30 backdrop-blur-3xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {/* <div className="relative flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-indigo-400 opacity-60"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.7)]"></span>
          </div> */}

          <Link href="/" className="group flex items-center">
            <img
              src="/findle.png"
              alt="Findle"
              className="h-33 w-auto object-contain opacity-90 transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-100"
            />
          </Link>
        </div>

        <div className="hidden items-center gap-8 text-[11px] font-mono uppercase tracking-widest text-slate-400 md:flex">
          <span className="flex items-center gap-1 text-indigo-400 transition hover:text-indigo-300">
            <span className="text-[9px]">&gt;</span> Browse
          </span>
          <Link href="/directory" className="transition duration-300 hover:text-white">
            Listings
          </Link>
          <AdminNavLink />
          <LogoutButton />
          <Link href="/portal" className="transition duration-300 hover:text-white">
            Login
          </Link>
          <Link href="/FindleFinance" className="transition duration-300 hover:text-white">
            Finance
          </Link>
        </div>
      </div>
    </nav>
  );
}
