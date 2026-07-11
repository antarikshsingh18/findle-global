import Link from 'next/link';
import Footer from '../components/Footer';
import SiteNavbar from '../components/SiteNavbar';

export default function FindleFinance() {
	return (
		<main className="min-h-screen bg-[#030305] text-slate-100 selection:bg-indigo-500 selection:text-white antialiased relative overflow-x-hidden">

			<SiteNavbar />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
				{/* Right-aligned findle7 logo for large screens */}
				<Link href="/" className="hidden lg:block absolute right-6 top-12 pointer-events-auto">
					<img src="/findlefinance2.png" alt="FindleFinance" className="w-80 opacity-80 hover:opacity-100 transform-gpu hover:scale-105 transition" />
				</Link>
				<header className="mb-8">
					{/* stylized hero title using homepage gradient */}
					<h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-white uppercase leading-tight mb-4">
						Your
						<br />
						<span className="bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">Mortgage. Sorted.</span>
					</h1>

					<p className="text-lg font-mono text-slate-400 max-w-3xl leading-relaxed">
						From your first home to your fifth investment property — Findle Finance connects you with the right financing, the right lender, and the right rate. Fast.
					</p>
					<p className="text-sm text-slate-500 mt-3">A Findle Global Company</p>
				</header>

				{/* Primary CTAs */}
				<div className="flex gap-4 mb-12">
					<Link href="/contact" className="px-6 py-3 rounded-xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all duration-300">Book a Free Consultation →</Link>
					{/* <Link href="/inquire" className="px-6 py-3 rounded-xl border border-slate-700 text-slate-400 hover:border-indigo-500/60 hover:text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 font-mono">Get Pre-Approved</Link> */}
					{/* <a href="mailto:finance@findle.global" className="px-6 py-3 rounded-xl border border-slate-700 text-slate-400 hover:border-indigo-500/60 hover:text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 font-mono">Email Us</a> */}
				</div>

				{/* Content Sections */}
				<section className="mb-12">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
						<div className="md:col-span-2 prose prose-invert max-w-none">
							{/* <h2>What Is Findle Finance?</h2>
							<p>Findle Finance is the mortgage arm of Findle Global — built to do one thing exceptionally well: get you financed.</p>
							<p>We are a team of experienced, licensed mortgage agents aligned with leading brokerages across Canada. That means we're not tied to one bank, one rate, or one product. We shop the entire market on your behalf — from major banks and credit unions to alternative and private lenders — to find the financing solution that actually fits your situation.</p>
							<p>Whether you're a first-time buyer navigating your first mortgage, an investor growing a portfolio, or a commercial buyer structuring a complex deal — Findle Finance handles the financing so you can focus on the property.</p> */}

							<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="bg-slate-900/10 border border-slate-700/40 rounded-lg p-4">
									<h4 className="text-sm font-bold text-white uppercase font-mono tracking-widest">Who we serve</h4>
									<ul className="text-slate-400 mt-2 list-disc list-inside text-sm">
										<li>First-time home buyers</li>
										<li>Real estate investors</li>
										<li>Commercial buyers</li>
										<li>NRI & international buyers</li>
									</ul>
								</div>
								<div className="bg-slate-900/10 border border-slate-700/40 rounded-lg p-4">
									<h4 className="text-sm font-bold text-white uppercase font-mono tracking-widest">Core services</h4>
									<ul className="text-slate-400 mt-2 list-disc list-inside text-sm">
										<li>Rate shopping across 30+ lenders</li>
										<li>Preconstruction & assignment financing</li>
										<li>Investment & portfolio lending</li>
										<li>Commercial & construction financing</li>
									</ul>
								</div>
							</div>
						</div>

						{/* <aside className="md:col-span-1">
							<div className="sticky top-28 bg-gradient-to-b from-slate-900/10 to-transparent border border-slate-700/40 rounded-xl p-6">
								<h3 className="text-lg font-bold text-white mb-2">Quick Facts</h3>
								<p className="text-slate-400 text-sm mb-4">One application, multiple lenders — personalised advice from licensed agents.</p>

								<div className="space-y-3 mb-4">
									<div className="flex items-center justify-between text-sm text-slate-300">
										<span className="font-mono text-[11px] uppercase text-slate-500">Lenders</span>
										<span className="font-bold text-indigo-300">30+</span>
									</div>
									<div className="flex items-center justify-between text-sm text-slate-300">
										<span className="font-mono text-[11px] uppercase text-slate-500">Service Cost</span>
										<span className="font-bold text-slate-300">Free to borrowers</span>
									</div>
									<div className="flex items-center justify-between text-sm text-slate-300">
										<span className="font-mono text-[11px] uppercase text-slate-500">Expertise</span>
										<span className="font-bold text-slate-300">Preconstruction & Investment</span>
									</div>
								</div>

									<div className="pt-2 border-t border-slate-700/30">
										<a href="tel:+14374320003" className="block w-full text-center px-4 py-2 rounded-md bg-indigo-600 text-white font-bold">Call +1 (437) 432-0003</a>
										<a href="mailto:finance@findle.global" className="block w-full text-center mt-3 px-4 py-2 rounded-md border border-slate-700 text-slate-300">Email Connect</a>
										<Link href="/contact" className="block text-center mt-3 text-indigo-300 font-bold">Book a Free Consultation →</Link>
									</div>
							</div>
						</aside> */}
					</div>
				</section>

				<section className="grid gap-8 mb-12">
					<h2 className="text-2xl font-bold text-white">What We Do</h2>

					<div className="grid md:grid-cols-2 gap-6">
						<div className="border border-slate-700/40 bg-slate-900/10 rounded-lg p-6">
							<h3 className="text-lg font-bold text-white"> Residential Mortgages</h3>
							<p className="text-slate-400">For buyers who need a home, not a headache. We guide first-time buyers and move-up buyers through the entire mortgage process — pre-approval, lender selection, rate negotiation, and closing.</p>
							<ul className="text-slate-400 mt-3 list-disc list-inside">
								<li>First-time home buyer programs</li>
								<li>High-ratio & conventional mortgages</li>
								<li>Refinancing & renewals</li>
								<li>Home equity solutions</li>
							</ul>
						</div>

						<div className="border border-slate-700/40 bg-slate-900/10 rounded-lg p-6">
							<h3 className="text-lg font-bold text-white"> Preconstruction Financing</h3>
							<p className="text-slate-400">Specialized financing for a specialized market. Preconstruction mortgages are not the same as resale mortgages — and most lenders don't understand that. Findle Finance does.</p>
							<ul className="text-slate-400 mt-3 list-disc list-inside">
								<li>Extended rate holds for long closing timelines</li>
								<li>Deposit structure guidance</li>
								<li>Occupancy vs. final closing mortgage planning</li>
								<li>Assignment financing</li>
							</ul>
						</div>

						<div className="border border-slate-700/40 bg-slate-900/10 rounded-lg p-6">
							<h3 className="text-lg font-bold text-white"> Investment Property Financing</h3>
							<p className="text-slate-400">Built for investors who think beyond the first property. We work with investors at every stage — structuring mortgages that account for rental income, portfolio growth, and long-term wealth building.</p>
							<ul className="text-slate-400 mt-3 list-disc list-inside">
								<li>Single-family and multi-unit investment properties</li>
								<li>BRRRR strategy financing</li>
								<li>Refinancing to unlock equity</li>
								<li>Non-resident & NRI investor mortgages</li>
							</ul>
						</div>

						<div className="border border-slate-700/40 bg-slate-900/10 rounded-lg p-6">
							<h3 className="text-lg font-bold text-white"> Commercial Mortgages</h3>
							<p className="text-slate-400">Financing that matches the scale of your ambition. We connect commercial buyers with lenders experienced in office, retail, industrial, and mixed-use properties.</p>
							<ul className="text-slate-400 mt-3 list-disc list-inside">
								<li>Commercial property purchases</li>
								<li>Mixed-use developments</li>
								<li>Construction financing</li>
								<li>Business owner-occupied properties</li>
							</ul>
						</div>
					</div>
				</section>

				<section className="mb-12">
					<h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
					<ol className="list-decimal list-inside text-slate-400 space-y-3">
						<li><strong>Step 1 — Tell Us About Your Situation:</strong> Start with a free consultation. A real person will connect with you to understand goals, timeline, and financial picture.</li>
						<li><strong>Step 2 — We Shop the Market For You:</strong> One application — dozens of lenders. We compare rates, terms, and products to find the best fit.</li>
						<li><strong>Step 3 — We Present Your Options:</strong> Transparent side-by-side comparisons and honest recommendations; the decision is yours.</li>
						<li><strong>Step 4 — We Handle the Process:</strong> We manage the lender relationship, coordinate with lawyers and agents, and handle paperwork through closing.</li>
						<li><strong>Step 5 — You Close With Confidence:</strong> We stay in your corner after closing and monitor your mortgage through its term.</li>
					</ol>
				</section>

				{/* <section className="mb-12">
					<h2 className="text-2xl font-bold text-white mb-4">Why Findle Finance?</h2>
					<div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-sm text-slate-400 font-mono uppercase tracking-widest">
						<div className="col-span-2 text-slate-300 font-bold">Your Bank</div>
						<div className="col-span-4 text-indigo-300 font-bold">Findle Finance</div>
						<div>Lenders accessed</div>
						<div className="col-span-5">1</div>
						<div className="col-span-5">30+</div>
					</div>

					<div className="mt-6 text-slate-400">
						<p>Our services are completely free to borrowers. We are compensated by lenders upon successful mortgage placement.</p>
					</div>
				</section> */}

				<section className="mb-12 prose prose-invert max-w-3xl">
					<h2>Who We Work With</h2>
					<ul>
						<li> First-Time Home Buyers — Guidance on government programs, down payment options, and stress test explanations.</li>
						<li> Real Estate Investors — Portfolio-focused financing and rental income calculations.</li>
						<li> Commercial Buyers — Experienced lenders for complex deals.</li>
						<li> NRI & International Buyers — Cross-border financing and documentation support.</li>
					</ul>

					<h3 className="mt-6">Legal Disclaimer</h3>
					<p className="text-slate-500 text-sm">Findle Finance operates through licensed mortgage agents affiliated with registered mortgage brokerages in Ontario. Mortgage brokerage services are regulated by the Financial Services Regulatory Authority of Ontario (FSRA). All mortgage products are subject to lender approval and qualification criteria. Rates and terms are subject to change without notice. This page is for informational purposes only and does not constitute a mortgage commitment or offer to lend.</p>
				</section>

				{/* Final CTA */}
				<div className="py-12 px-8 rounded-2xl border border-slate-800/40 bg-slate-900/10 backdrop-blur-md">
					<h3 className="text-2xl font-black text-white mb-3">Ready to Get Financed?</h3>
					<p className="text-slate-400 mb-6">Talk to a Findle Finance mortgage agent today. No obligation. No pressure. Just clarity on what you qualify for and what your options look like.</p>
					<div className="flex gap-4">
						<a href="tel:+14374320003" className="px-6 py-3 rounded-xl bg-white text-black font-black text-xs uppercase tracking-widest">Call +1 (437) 432-0003</a>
						{/* <a href="mailto:admin@findle.global" className="px-6 py-3 rounded-xl border border-slate-700 text-slate-400 hover:border-indigo-500/60 hover:text-white font-bold text-xs uppercase tracking-widest">Email Connect</a> */}
						<Link href="/contact" className="px-6 py-3 rounded-xl border border-indigo-500/60 text-indigo-300 uppercase tracking-widest font-bold">Book a Free Consultation</Link>
					</div>
				</div>
			</div>

			<Footer />
		</main>
	);
}
