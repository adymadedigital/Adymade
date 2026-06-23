<script lang="ts">
	import { Search, Globe, MapPin, FileText, BarChart3, TrendingUp, Star, Shield, ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-svelte';
	import FinalCTA from '$lib/components/FinalCTA.svelte';

	const services = [
		{
			icon: Shield,
			title: "Technical SEO",
			desc: "Build a strong technical foundation for search performance.",
			label: "Includes:",
			items: ["Website Audits", "Site Speed Optimization", "Mobile Optimization", "Indexing Improvements", "Core Web Vitals Optimization", "Technical Error Resolution"],
		},
		{
			icon: FileText,
			title: "On-Page SEO",
			desc: "Optimize content and website structure for search visibility.",
			label: "Includes:",
			items: ["Keyword Research", "Meta Tags Optimization", "Content Optimization", "Internal Linking", "URL Structure Improvements", "User Experience Enhancements"],
		},
		{
			icon: MapPin,
			title: "Local SEO",
			desc: "Improve visibility in local search results and maps.",
			label: "Includes:",
			items: ["Google Business Profile Optimization", "Local Citations", "Location-Based Content", "Review Strategy", "Local Ranking Improvements"],
		},
		{
			icon: Globe,
			title: "Content SEO",
			desc: "Create content that ranks and drives organic traffic.",
			label: "Includes:",
			items: ["Blog Content Strategy", "Landing Page Optimization", "Topic Clusters", "Content Refreshes", "Authority Building Content"],
		},
		{
			icon: BarChart3,
			title: "SEO Analytics & Reporting",
			desc: "Track progress and identify growth opportunities.",
			label: "Includes:",
			items: ["Ranking Reports", "Traffic Analysis", "Competitor Monitoring", "Conversion Tracking", "SEO Performance Dashboards"],
		},
	];

	const process = [
		{ num: "01", title: "SEO Audit", desc: "Evaluate your current website performance and opportunities." },
		{ num: "02", title: "Keyword Research", desc: "Identify the search terms your audience uses to find solutions." },
		{ num: "03", title: "Optimization", desc: "Implement technical, content, and on-page improvements." },
		{ num: "04", title: "Content Development", desc: "Create high-quality content aligned with search intent." },
		{ num: "05", title: "Monitoring & Growth", desc: "Track results and continuously refine the strategy." },
	];

	const whyInvest = [
		{ icon: TrendingUp, title: "Sustainable Traffic Growth", desc: "Generate long-term traffic without relying solely on paid advertising." },
		{ icon: Star, title: "Higher Quality Leads", desc: "Attract users actively searching for your services — they convert better." },
		{ icon: Shield, title: "Increased Brand Authority", desc: "Build trust and credibility through consistent search visibility." },
		{ icon: BarChart3, title: "Better ROI Over Time", desc: "SEO continues delivering value long after optimization efforts are implemented." },
	];

	const solutions = [
		{ title: "Local Businesses", desc: "Improve visibility in local search results and attract nearby customers." },
		{ title: "Service Providers", desc: "Generate more qualified leads from people actively searching for your services." },
		{ title: "E-Commerce Stores", desc: "Increase product visibility, organic traffic, and online sales." },
		{ title: "B2B Companies", desc: "Build authority and capture high-value prospects in your niche." },
	];

	const faqs = [
		{ q: "How long does SEO take?", a: "SEO is a long-term strategy. Many businesses begin seeing measurable improvements within 3–6 months, depending on competition and website condition." },
		{ q: "Is SEO better than paid advertising?", a: "Both have value. SEO provides sustainable long-term growth, while paid advertising offers immediate visibility. We often recommend both together." },
		{ q: "Do you provide SEO reports?", a: "Yes. We provide detailed reporting, keyword tracking, traffic analysis, and recommendations for ongoing improvements." },
	];

	let img1Error = $state(false);
	let img2Error = $state(false);
	let img3Error = $state(false);
	let img4Error = $state(false);
	let img5Error = $state(false);
	let img6Error = $state(false);
	let faqOpen = $state<number | null>(null);
</script>

<svelte:head>
	<title>SEO Services | Adymade CMS</title>
	<meta name="description" content="Get found by the customers searching for you. Strategic SEO services to increase visibility, attract qualified traffic, and generate sustainable growth." />
</svelte:head>

<div class="seo-page">
	<div class="admin-login-ambient-1" style="position:absolute;z-index:0;"></div>
	<div class="admin-login-ambient-2" style="position:absolute;z-index:0;"></div>

	<main class="relative z-10">

		<!-- Hero -->
		<section class="seo-hero">
			<div class="container">
				<div class="seo-hero-inner">
					<div class="seo-hero-text">
						<div class="eyebrow" style="background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);backdrop-filter:blur(10px);margin-bottom:24px;">SEO Services</div>
						<h1>Get Found by the Customers <span class="grad">Searching for You</span></h1>
						<p class="seo-hero-sub">Increase your visibility in search engines, attract qualified traffic, and generate sustainable growth through strategic SEO services tailored to your business goals.</p>
						<a href="https://calendly.com/addymade/15-minute-consultation-call" target="_blank" rel="noopener" class="seo-cta">Request an SEO Audit <ArrowRight size={18} /></a>
					</div>
					<div class="seo-hero-media seo-glass">
						{#if !img1Error}
							<img src="/seo-hero.jpg" alt="SEO Services" class="seo-img" onerror={() => img1Error = true} />
						{:else}
							<div class="seo-img-ph"><Search size={56} color="rgba(6,182,212,0.5)" /><span>Image 1 — Place in static/</span></div>
						{/if}
					</div>
				</div>
			</div>
		</section>

		<section class="section pt-0">
			<div class="container">

				<!-- Overview -->
				<div class="seo-block">
					<div class="seo-overview-grid">
						<div class="seo-glass seo-overview-text">
							<div class="seo-label">Overview</div>
							<h2>High-Intent Traffic. Sustainable Growth.</h2>
							<p>Search engines remain one of the most powerful channels for attracting high-intent customers. Effective SEO helps your business appear when potential customers are actively searching for solutions.</p>
							<p style="margin-top:14px;">Our SEO services focus on improving rankings, increasing organic traffic, and driving measurable business outcomes — not just vanity metrics.</p>
						</div>
						<div class="seo-glass seo-img-card">
							{#if !img2Error}
								<img src="/seo-overview.jpg" alt="SEO Overview" class="seo-img" onerror={() => img2Error = true} />
							{:else}
								<div class="seo-img-ph"><TrendingUp size={40} color="rgba(6,182,212,0.5)" /><span>Image 2 — Place in static/</span></div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Services -->
				<div class="seo-block">
					<div class="seo-section-head"><h2>Our SEO Services</h2><p>Five specialist SEO disciplines working together to improve your rankings.</p></div>
					<div class="seo-services-grid">
						{#each services as svc}
							<div class="seo-glass seo-svc-card">
								<div class="seo-icon-wrap"><svc.icon size={24} /></div>
								<h3>{svc.title}</h3>
								<p class="seo-svc-desc">{svc.desc}</p>
								<div class="seo-svc-label">{svc.label}</div>
								<ul class="seo-checklist">
									{#each svc.items as item}
										<li><CheckCircle2 size={15} /><span>{item}</span></li>
									{/each}
								</ul>
							</div>
						{/each}

						<!-- Image 3 -->
						<div class="seo-glass seo-img-card">
							{#if !img3Error}
								<img src="/seo-services.jpg" alt="SEO Services" class="seo-img" onerror={() => img3Error = true} />
							{:else}
								<div class="seo-img-ph"><Globe size={40} color="rgba(6,182,212,0.5)" /><span>Image 3 — Place in static/</span></div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Process -->
				<div class="seo-block">
					<div class="seo-section-head"><h2>Our SEO Process</h2><p>A proven five-step process to systematically improve your search rankings.</p></div>
					<div class="seo-process-track">
						{#each process as step}
							<div class="seo-glass seo-process-card">
								<div class="seo-process-num">{step.num}</div>
								<h3>{step.title}</h3>
								<p>{step.desc}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- Image row -->
				<div class="seo-block">
					<div class="seo-img-row">
						<div class="seo-glass seo-img-card">
							{#if !img4Error}
								<img src="/seo-technical.jpg" alt="Technical SEO" class="seo-img" onerror={() => img4Error = true} />
							{:else}
								<div class="seo-img-ph"><Shield size={40} color="rgba(6,182,212,0.5)" /><span>Image 4 — Place in static/</span></div>
							{/if}
						</div>
						<div class="seo-glass seo-img-card">
							{#if !img5Error}
								<img src="/seo-analytics.jpg" alt="SEO Analytics" class="seo-img" onerror={() => img5Error = true} />
							{:else}
								<div class="seo-img-ph"><BarChart3 size={40} color="rgba(6,182,212,0.5)" /><span>Image 5 — Place in static/</span></div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Why Invest -->
				<div class="seo-block">
					<div class="seo-section-head"><h2>Why Invest in SEO?</h2><p>The lasting business benefits of a strong organic search presence.</p></div>
					<div class="seo-why-grid">
						{#each whyInvest as w}
							<div class="seo-glass seo-why-card">
								<div class="seo-icon-wrap"><w.icon size={22} /></div>
								<h3>{w.title}</h3>
								<p>{w.desc}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- Solutions for every business -->
				<div class="seo-block">
					<div class="seo-section-head"><h2>SEO Solutions for Every Business</h2><p>Tailored strategies for different business models and goals.</p></div>
					<div class="seo-solutions-grid">
						{#each solutions as s, i}
							<div class="seo-glass seo-sol-card">
								<div class="seo-sol-num">0{i + 1}</div>
								<h3>{s.title}</h3>
								<p>{s.desc}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- FAQ -->
				<div class="seo-block" style="margin-bottom:40px;">
					<div class="seo-section-head"><h2>FAQ</h2></div>
					<div class="seo-faq-list">
						{#each faqs as faq, i}
							<div class="seo-glass seo-faq-card" class:seo-faq-open={faqOpen === i}>
								<button class="seo-faq-q" onclick={() => faqOpen = faqOpen === i ? null : i}>
									<span>{faq.q}</span>
									<ChevronRight size={18} class="seo-faq-chev" />
								</button>
								{#if faqOpen === i}
									<p class="seo-faq-a">{faq.a}</p>
								{/if}
							</div>
						{/each}

						<!-- Image 6 -->
						<div class="seo-glass seo-img-card">
							{#if !img6Error}
								<img src="/seo-growth.jpg" alt="SEO Growth" class="seo-img" onerror={() => img6Error = true} />
							{:else}
								<div class="seo-img-ph"><TrendingUp size={40} color="rgba(6,182,212,0.5)" /><span>Image 6 — Place in static/</span></div>
							{/if}
						</div>
					</div>
				</div>

			</div>
		</section>
		<FinalCTA />
	</main>
</div>

<style>
	.seo-page{background:#08051a;min-height:100vh;overflow:hidden;position:relative;}
	.seo-hero{padding:140px 0 80px;position:relative;}
	.seo-hero-inner{display:grid;grid-template-columns:1fr;gap:48px;align-items:center;}
	@media(min-width:900px){.seo-hero-inner{grid-template-columns:55% 1fr;}}
	.seo-hero-text h1{font-size:clamp(34px,5vw,58px);font-weight:800;color:white;line-height:1.1;letter-spacing:-0.02em;margin-bottom:22px;}
	.seo-hero-sub{font-size:17px;color:rgba(255,255,255,0.7);line-height:1.75;margin-bottom:36px;max-width:560px;}
	.seo-hero-media{padding:0!important;min-height:420px;overflow:hidden;position:relative;border-radius:24px;}
	.seo-cta{display:inline-flex;align-items:center;gap:10px;background:white;color:#08051a;padding:15px 30px;border-radius:50px;font-weight:700;font-size:16px;text-decoration:none;transition:all .3s;box-shadow:0 4px 20px rgba(255,255,255,.15);}
	.seo-cta:hover{transform:translateY(-3px);box-shadow:0 10px 30px rgba(255,255,255,.25);}
	.seo-glass{background:rgba(255,255,255,.02);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.08);border-radius:24px;padding:32px;display:flex;flex-direction:column;transition:all .3s cubic-bezier(.4,0,.2,1);box-shadow:0 10px 30px rgba(0,0,0,.2);}
	.seo-glass:hover{background:rgba(255,255,255,.04);border-color:rgba(6,182,212,.4);transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.4),0 0 20px rgba(6,182,212,.08);}
	.seo-block{margin-bottom:80px;}
	.seo-section-head{margin-bottom:40px;border-bottom:1px solid rgba(255,255,255,.05);padding-bottom:24px;}
	.seo-section-head h2{font-size:32px;font-weight:700;color:white;letter-spacing:-0.02em;margin-bottom:8px;}
	.seo-section-head p{font-size:16px;color:rgba(255,255,255,.6);}
	.seo-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--color-cyan);margin-bottom:14px;}
	.seo-overview-grid{display:grid;grid-template-columns:1fr;gap:24px;align-items:center;}
	@media(min-width:900px){.seo-overview-grid{grid-template-columns:1fr 1fr;}}
	.seo-overview-text h2{font-size:26px;font-weight:700;color:white;margin-bottom:14px;}
	.seo-overview-text p{font-size:15px;color:rgba(255,255,255,.7);line-height:1.75;margin:0;}
	.seo-services-grid{display:grid;grid-template-columns:1fr;gap:24px;}
	@media(min-width:768px){.seo-services-grid{grid-template-columns:1fr 1fr;}}
	.seo-svc-card h3{font-size:20px;font-weight:700;color:white;margin-bottom:10px;}
	.seo-svc-desc{font-size:14px;color:rgba(255,255,255,.65);line-height:1.65;margin-bottom:20px;}
	.seo-svc-label{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:12px;}
	.seo-icon-wrap{width:52px;height:52px;background:linear-gradient(135deg,rgba(255,255,255,.05),rgba(255,255,255,.01));border:1px solid rgba(255,255,255,.1);border-radius:14px;display:flex;align-items:center;justify-content:center;color:var(--color-cyan);margin-bottom:20px;transition:all .3s;}
	.seo-glass:hover .seo-icon-wrap{background:linear-gradient(135deg,rgba(6,182,212,.15),rgba(90,20,240,.15));border-color:rgba(6,182,212,.5);color:white;transform:scale(1.05) rotate(-2deg);}
	.seo-checklist{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px;}
	.seo-checklist li{display:flex;align-items:center;gap:9px;font-size:14px;color:rgba(255,255,255,.8);}
	.seo-checklist li :global(svg){color:var(--color-cyan);flex-shrink:0;}
	.seo-process-track{display:grid;grid-template-columns:1fr;gap:20px;}
	@media(min-width:640px){.seo-process-track{grid-template-columns:1fr 1fr;}}
	@media(min-width:1024px){.seo-process-track{grid-template-columns:repeat(5,1fr);}}
	.seo-process-card{padding:28px 24px;}
	.seo-process-num{font-size:40px;font-weight:900;color:rgba(6,182,212,.15);line-height:1;margin-bottom:16px;}
	.seo-process-card h3{font-size:17px;font-weight:700;color:white;margin-bottom:8px;}
	.seo-process-card p{font-size:13px;color:rgba(255,255,255,.6);line-height:1.65;margin:0;}
	.seo-img-row{display:grid;grid-template-columns:1fr;gap:24px;}
	@media(min-width:768px){.seo-img-row{grid-template-columns:1fr 1fr;}}
	.seo-why-grid{display:grid;grid-template-columns:1fr;gap:20px;}
	@media(min-width:640px){.seo-why-grid{grid-template-columns:1fr 1fr;}}
	.seo-why-card h3{font-size:19px;font-weight:700;color:white;margin-bottom:10px;}
	.seo-why-card p{font-size:14px;color:rgba(255,255,255,.65);line-height:1.65;margin:0;}
	.seo-solutions-grid{display:grid;grid-template-columns:1fr;gap:16px;}
	@media(min-width:640px){.seo-solutions-grid{grid-template-columns:1fr 1fr;}}
	@media(min-width:1024px){.seo-solutions-grid{grid-template-columns:repeat(4,1fr);}}
	.seo-sol-card{padding:28px;}
	.seo-sol-num{font-size:40px;font-weight:900;background:linear-gradient(135deg,var(--color-electric),var(--color-cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;margin-bottom:14px;}
	.seo-sol-card h3{font-size:18px;font-weight:700;color:white;margin-bottom:8px;}
	.seo-sol-card p{font-size:14px;color:rgba(255,255,255,.65);line-height:1.6;margin:0;}
	.seo-faq-list{display:flex;flex-direction:column;gap:12px;}
	.seo-faq-card{padding:0;overflow:hidden;}
	.seo-faq-card:hover{transform:none;}
	.seo-faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:22px 28px;background:none;border:none;color:white;font-size:16px;font-weight:600;cursor:pointer;text-align:left;}
	.seo-faq-q :global(.seo-faq-chev){flex-shrink:0;color:var(--color-cyan);transition:transform .25s;}
	.seo-faq-open .seo-faq-q :global(.seo-faq-chev){transform:rotate(90deg);}
	.seo-faq-a{padding:0 28px 22px;font-size:15px;color:rgba(255,255,255,.7);line-height:1.7;margin:0;}
	.seo-img-card{padding:0!important;overflow:hidden;min-height:280px;position:relative;}
	.seo-img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0;}
	.seo-img-ph{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;min-height:280px;color:rgba(255,255,255,.3);font-size:13px;text-align:center;padding:24px;}
</style>
