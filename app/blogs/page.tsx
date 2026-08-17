import Link from 'next/link';
import type { Metadata } from 'next';
import SiteNavbar from '../components/SiteNavbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'The Findle Journal',
  description: 'Market notes, strategy, and local insight for buyers, investors, and developers.',
};

const posts = [
  {
    title: 'Is Buying Pre-Construction Worth It in 2026?',
    description:
      'A practical look at the old assumptions, the new rebate, and why the math is changing for buyers in Toronto and beyond.',
    category: 'Market Note',
    readTime: '6 min read',
    date: 'August 14, 2026',
    href: '/blog-1',
    image: '/precon-worth.jpg',
    accent: 'from-indigo-600/35 via-violet-500/20 to-transparent',
  },
  {
    title: 'Best Cities in Ontario for Real Estate Investment (2026)',
    description:
      'The 2026 data-backed ranking of the best Ontario cities to invest in real estate — Ottawa, Hamilton, London, KW & Windsor — analyzed by cash flow, appreciation & risk.',
    category: 'Market Note',
    readTime: '10 min read',
    date: 'August 18, 2026',
    href: '/blog-2',
    image: '/real-investment.jpg',
    accent: 'from-slate-500/25 via-slate-400/10 to-transparent',
    
  },
//   {
//     title: 'Another article slot',
//     description:
//       'Reuse the same layout for buyer education, financing notes, or neighborhood-driven coverage.',
//     category: 'Coming soon',
//     readTime: 'New',
//     date: 'Add a post',
//     href: '#',
//     image: '',
//     accent: 'from-cyan-500/20 via-indigo-500/10 to-transparent',
//     disabled: true,
//   },
];

export default function BlogIndexPage() {
  return (
    < main className="min-h-screen text-slate-100 selection: selection:text-white relative overflow-x-hidden font-mono"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(3, 3, 5, 0.58), rgba(3, 3, 5, 0.75)), url('/blog-bg2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_38%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[420px] bg-gradient-to-b from-indigo-950/15 via-transparent to-transparent pointer-events-none" />

      <SiteNavbar />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-12 max-w-3xl">
          <div className="mb-4 flex items-center gap-3 text-[19px] uppercase tracking-[0.24em] text-indigo-300">
            <span className="inline-block h-px w-12 bg-indigo-500/60" />
            <span>The Findle Journal</span>
          </div>
          {/* <h1 className="text-4xl font-black uppercase tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
            Blogs
            <span className="block text-indigo-300"></span>
          </h1> */}
          {/* <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Cut through the noise. Clear-eyed analysis for buyers, investors, and the modern Canadian housing market.
          </p> */}
        </header>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => {
            const backgroundStyles = post.image
              ? {
                  backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.18), rgba(15,23,42,0.58)), url('${post.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {
                  backgroundImage: `linear-gradient(135deg, rgba(99,102,241,0.22), rgba(15,23,42,0.8))`,
                };

            const cardContent = (
              <article className="group relative h-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/70 shadow-[0_0_0_1px_rgba(15,23,42,0.9)] transition duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-[0_18px_50px_rgba(79,70,229,0.12)]">
                <div
                  className="absolute inset-0 opacity-80"
                  style={backgroundStyles}
                />
                <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-br ${post.accent}`} />

                <div className="relative flex h-full flex-col p-5">
                  <div className="mb-6 flex items-center justify-between gap-3 text-[9px] uppercase tracking-[0.24em] text-slate-200/80">
                    <span>{post.category}</span>
                    <span>{post.date}</span>
                  </div>

                  <div className="mb-4 flex-1">
                    <h2 className="text-xl font-bold uppercase leading-tight tracking-[-0.04em] text-white">
                      {post.title}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-slate-200/90">{post.description}</p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] uppercase tracking-[0.2em] text-slate-200/80">
                    <span>{post.readTime}</span>
                    <span className="text-indigo-200 transition group-hover:text-white">
                      {post.disabled ? 'Coming soon' : 'Read article'}
                    </span>
                  </div>
                </div>
              </article>
            );

            if (post.disabled) {
              return <div key={post.title}>{cardContent}</div>;
            }

            return (
              <Link key={post.title} href={post.href} className="block h-full">
                {cardContent}
              </Link>
            );
          })}
        </section>

        
      </div>

      <Footer />
    </main>
  );
}
