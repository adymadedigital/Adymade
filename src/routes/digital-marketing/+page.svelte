<script lang="ts">
	import { Search, TrendingUp, Mail, BarChart3, Users, Globe, Target, Repeat, ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-svelte';
	import FinalCTA from '$lib/components/FinalCTA.svelte';

	const services = [
		{
			icon: Search,
			title: "Search Engine Marketing (SEM)",
			desc: "Reach potential customers at the exact moment they're searching for your products or services.",
			label: "Includes:",
			items: ["Google Ads Campaigns", "PPC Advertising", "Search Advertising", "Display Advertising", "Remarketing Campaigns"],
		},
		{
			icon: Globe,
			title: "Social Media Marketing",
			desc: "Build brand awareness and engage audiences across social platforms.",
			label: "Platforms & Services:",
			items: ["Facebook & Instagram", "LinkedIn", "X (Twitter)", "YouTube", "TikTok", "Content Creation & Paid Advertising"],
		},
		{
			icon: BarChart3,
			title: "Content Marketing",
			desc: "Create valuable content that educates, engages, and converts.",
			label: "Content Types:",
			items: ["Blog Articles", "Industry Insights", "Case Studies", "Whitepapers", "Landing Page Content", "Website Copy"],
		},
		{
			icon: Mail,
			title: "Email Marketing",
			desc: "Nurture leads and strengthen customer relationships.",
			label: "Services Include:",
			items: ["Email Campaigns", "Automated Sequences", "Newsletter Management", "Lead Nurturing Workflows"],
		},
		{
			icon: Target,
			title: "Conversion Rate Optimization (CRO)",
			desc: "Improve website performance and maximize marketing ROI.",
			label: "Includes:",
			items: ["Landing Page Optimization", "User Journey Analysis", "A/B Testing", "Funnel Optimization"],
		},
	];

	const process = [
		{ num: "01", title: "Discovery & Research", desc: "Analyze your market, audience, competitors, and goals." },
		{ num: "02", title: "Strategy Development", desc: "Create a customized marketing roadmap aligned with business objectives." },
		{ num: "03", title: "Campaign Execution", desc: "Launch and manage marketing initiatives across selected channels." },
		{ num: "04", title: "Optimization", desc: "Continuously improve campaign performance using real-time data." },
		{ num: "05", title: "Reporting", desc: "Transparent reporting focused on meaningful business outcomes." },
	];

	const whyUs = [
		{ icon: BarChart3, title: "Data-Driven Decisions", desc: "Every strategy is backed by analytics and market insights, not guesswork." },
		{ icon: Globe, title: "Multi-Channel Expertise", desc: "Integrated campaigns across search, social, content, and email." },
		{ icon: Target, title: "Lead Generation Focus", desc: "Marketing efforts aligned with revenue and growth goals." },
		{ icon: Repeat, title: "Continuous Optimization", desc: "Ongoing improvements to maximize ROI on every campaign." },
	];

	const industries = ["Healthcare", "Technology", "Manufacturing", "Education", "Finance", "Professional Services", "E-Commerce"];

	const faqs = [
		{ q: "How long does digital marketing take to show results?", a: "Paid advertising can generate immediate visibility, while organic strategies typically build momentum over several months." },
		{ q: "Can you manage all our marketing channels?", a: "Yes. We provide integrated digital marketing solutions across multiple platforms and channels." },
		{ q: "Do you provide performance reports?", a: "Absolutely. We provide regular reports with clear metrics and actionable insights." },
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
	<title>Digital Marketing Services | Adymade CMS</title>
	<meta name="description" content="Turn visibility into revenue with data-driven digital marketing. Attract customers, generate leads, and increase revenue through targeted campaigns." />
</svelte:head>

<div class="dm-page">
	<div class="admin-login-ambient-1" style="position:absolute;z-index:0;"></div>
	<div class="admin-login-ambient-2" style="position:absolute;z-index:0;"></div>

	<main class="relative z-10">

		<!-- Hero -->
		<section class="dm-hero">
			<div class="container">
				<div class="dm-hero-inner">
					<div class="dm-hero-text">
						<div class="eyebrow" style="background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);backdrop-filter:blur(10px);margin-bottom:24px;">Digital Marketing Services</div>
						<h1>Turn Visibility Into <span class="grad">Revenue</span></h1>
						<p class="dm-hero-sub">We create data-driven digital marketing strategies that help businesses attract customers, generate leads, and increase revenue through targeted campaigns and measurable results.</p>
						<a href="https://calendly.com/addymade/15-minute-consultation-call" target="_blank" rel="noopener" class="dm-cta">Grow Your Business <ArrowRight size={18} /></a>
					</div>
					<div class="dm-hero-media dm-glass">
						{#if !img1Error}
							<img src="/dm-hero.jpg" alt="Digital Marketing" class="dm-img" onerror={() => img1Error = true} />
						{:else}
							<div class="dm-img-ph"><TrendingUp size={56} color="rgba(6,182,212,0.5)" /><span>Image 1 — Place in static/</span></div>
						{/if}
					</div>
				</div>
			</div>
		</section>

		<section class="section pt-0">
			<div class="container">

				<!-- Overview -->
				<div class="dm-block">
					<div class="dm-overview-grid">
						<div class="dm-glass dm-overview-text">
							<div class="dm-label">Overview</div>
							<h2>Digital Marketing Is No Longer Optional</h2>
							<p>Businesses need a strong online presence to connect with customers, build trust, and stay ahead of competitors.</p>
							<p style="margin-top:14px;">Our digital marketing solutions help businesses reach their audience through strategic campaigns, engaging content, and performance-focused optimization.</p>
						</div>
						<div class="dm-glass dm-img-card">
							{#if !img2Error}
								<img src="/dm-overview.jpg" alt="Digital Marketing Overview" class="dm-img" onerror={() => img2Error = true} />
							{:else}
								<div class="dm-img-ph"><BarChart3 size={40} color="rgba(6,182,212,0.5)" /><span>Image 2 — Place in static/</span></div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Services -->
				<div class="dm-block">
					<div class="dm-section-head"><h2>Our Digital Marketing Services</h2><p>Five specialist channels to grow your brand and revenue.</p></div>
					<div class="dm-services-grid">
						{#each services as svc}
							<div class="dm-glass dm-svc-card">
								<div class="dm-icon-wrap"><svc.icon size={24} /></div>
								<h3>{svc.title}</h3>
								<p class="dm-svc-desc">{svc.desc}</p>
								<div class="dm-svc-label">{svc.label}</div>
								<ul class="dm-checklist">
									{#each svc.items as item}
										<li><CheckCircle2 size={15} /><span>{item}</span></li>
									{/each}
								</ul>
							</div>
						{/each}

						<!-- Image 3 -->
						<div class="dm-glass dm-img-card">
							{#if !img3Error}
								<img src="/dm-campaigns.jpg" alt="Marketing Campaigns" class="dm-img" onerror={() => img3Error = true} />
							{:else}
								<div class="dm-img-ph"><Globe size={40} color="rgba(6,182,212,0.5)" /><span>Image 3 — Place in static/</span></div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Process -->
				<div class="dm-block">
					<div class="dm-section-head"><h2>Our Marketing Process</h2><p>A structured approach to building campaigns that deliver results.</p></div>
					<div class="dm-process-track">
						{#each process as step}
							<div class="dm-glass dm-process-card">
								<div class="dm-process-num">{step.num}</div>
								<h3>{step.title}</h3>
								<p>{step.desc}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- Image row -->
				<div class="dm-block">
					<div class="dm-img-row">
						<div class="dm-glass dm-img-card">
							{#if !img4Error}
								<img src="/dm-social.jpg" alt="Social Media Marketing" class="dm-img" onerror={() => img4Error = true} />
							{:else}
								<div class="dm-img-ph"><Users size={40} color="rgba(6,182,212,0.5)" /><span>Image 4 — Place in static/</span></div>
							{/if}
						</div>
						<div class="dm-glass dm-img-card">
							{#if !img5Error}
								<img src="/dm-analytics.jpg" alt="Marketing Analytics" class="dm-img" onerror={() => img5Error = true} />
							{:else}
								<div class="dm-img-ph"><BarChart3 size={40} color="rgba(6,182,212,0.5)" /><span>Image 5 — Place in static/</span></div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Why Us -->
				<div class="dm-block">
					<div class="dm-section-head"><h2>Why Choose Our Digital Marketing Services?</h2><p>What sets our marketing approach apart.</p></div>
					<div class="dm-why-grid">
						{#each whyUs as w}
							<div class="dm-glass dm-why-card">
								<div class="dm-icon-wrap"><w.icon size={22} /></div>
								<h3>{w.title}</h3>
								<p>{w.desc}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- Industries -->
				<div class="dm-block">
					<div class="dm-section-head"><h2>Industries We Serve</h2><p>Marketing expertise across diverse sectors.</p></div>
					<div class="dm-industries-grid">
						{#each industries as ind, i}
							<div class="dm-glass dm-ind-card">
								<div class="dm-ind-num">0{i + 1}</div>
								<h3>{ind}</h3>
							</div>
						{/each}
					</div>
				</div>

				<!-- FAQ -->
				<div class="dm-block" style="margin-bottom:40px;">
					<div class="dm-section-head"><h2>FAQ</h2></div>
					<div class="dm-faq-list">
						{#each faqs as faq, i}
							<div class="dm-glass dm-faq-card" class:dm-faq-open={faqOpen === i}>
								<button class="dm-faq-q" onclick={() => faqOpen = faqOpen === i ? null : i}>
									<span>{faq.q}</span>
									<ChevronRight size={18} class="dm-faq-chev" />
								</button>
								{#if faqOpen === i}
									<p class="dm-faq-a">{faq.a}</p>
								{/if}
							</div>
						{/each}

						<!-- Image 6 -->
						<div class="dm-glass dm-img-card">
							{#if !img6Error}
								<img src="/dm-results.jpg" alt="Marketing Results" class="dm-img" onerror={() => img6Error = true} />
							{:else}
								<div class="dm-img-ph"><Target size={40} color="rgba(6,182,212,0.5)" /><span>Image 6 — Place in static/</span></div>
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
	.dm-page{background:#08051a;min-height:100vh;overflow:hidden;position:relative;}
	.dm-hero{padding:140px 0 80px;position:relative;}
	.dm-hero-inner{display:grid;grid-template-columns:1fr;gap:48px;align-items:center;}
	@media(min-width:900px){.dm-hero-inner{grid-template-columns:55% 1fr;}}
	.dm-hero-text h1{font-size:clamp(34px,5vw,58px);font-weight:800;color:white;line-height:1.1;letter-spacing:-0.02em;margin-bottom:22px;}
	.dm-hero-sub{font-size:17px;color:rgba(255,255,255,0.7);line-height:1.75;margin-bottom:36px;max-width:560px;}
	.dm-hero-media{padding:0!important;min-height:420px;overflow:hidden;position:relative;border-radius:24px;}
	.dm-cta{display:inline-flex;align-items:center;gap:10px;background:white;color:#08051a;padding:15px 30px;border-radius:50px;font-weight:700;font-size:16px;text-decoration:none;transition:all .3s;box-shadow:0 4px 20px rgba(255,255,255,.15);}
	.dm-cta:hover{transform:translateY(-3px);box-shadow:0 10px 30px rgba(255,255,255,.25);}
	.dm-glass{background:rgba(255,255,255,.02);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.08);border-radius:24px;padding:32px;display:flex;flex-direction:column;transition:all .3s cubic-bezier(.4,0,.2,1);box-shadow:0 10px 30px rgba(0,0,0,.2);}
	.dm-glass:hover{background:rgba(255,255,255,.04);border-color:rgba(6,182,212,.4);transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.4),0 0 20px rgba(6,182,212,.08);}
	.dm-block{margin-bottom:80px;}
	.dm-section-head{margin-bottom:40px;border-bottom:1px solid rgba(255,255,255,.05);padding-bottom:24px;}
	.dm-section-head h2{font-size:32px;font-weight:700;color:white;letter-spacing:-0.02em;margin-bottom:8px;}
	.dm-section-head p{font-size:16px;color:rgba(255,255,255,.6);}
	.dm-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--color-cyan);margin-bottom:14px;}
	.dm-overview-grid{display:grid;grid-template-columns:1fr;gap:24px;align-items:center;}
	@media(min-width:900px){.dm-overview-grid{grid-template-columns:1fr 1fr;}}
	.dm-overview-text h2{font-size:26px;font-weight:700;color:white;margin-bottom:14px;}
	.dm-overview-text p{font-size:15px;color:rgba(255,255,255,.7);line-height:1.75;margin:0;}
	.dm-services-grid{display:grid;grid-template-columns:1fr;gap:24px;}
	@media(min-width:768px){.dm-services-grid{grid-template-columns:1fr 1fr;}}
	.dm-svc-card h3{font-size:20px;font-weight:700;color:white;margin-bottom:10px;}
	.dm-svc-desc{font-size:14px;color:rgba(255,255,255,.65);line-height:1.65;margin-bottom:20px;}
	.dm-svc-label{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:12px;}
	.dm-icon-wrap{width:52px;height:52px;background:linear-gradient(135deg,rgba(255,255,255,.05),rgba(255,255,255,.01));border:1px solid rgba(255,255,255,.1);border-radius:14px;display:flex;align-items:center;justify-content:center;color:var(--color-cyan);margin-bottom:20px;transition:all .3s;}
	.dm-glass:hover .dm-icon-wrap{background:linear-gradient(135deg,rgba(6,182,212,.15),rgba(90,20,240,.15));border-color:rgba(6,182,212,.5);color:white;transform:scale(1.05) rotate(-2deg);}
	.dm-checklist{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px;}
	.dm-checklist li{display:flex;align-items:center;gap:9px;font-size:14px;color:rgba(255,255,255,.8);}
	.dm-checklist li :global(svg){color:var(--color-cyan);flex-shrink:0;}
	.dm-process-track{display:grid;grid-template-columns:1fr;gap:20px;}
	@media(min-width:640px){.dm-process-track{grid-template-columns:1fr 1fr;}}
	@media(min-width:1024px){.dm-process-track{grid-template-columns:repeat(5,1fr);}}
	.dm-process-card{padding:28px 24px;}
	.dm-process-num{font-size:40px;font-weight:900;color:rgba(6,182,212,.15);line-height:1;margin-bottom:16px;}
	.dm-process-card h3{font-size:17px;font-weight:700;color:white;margin-bottom:8px;}
	.dm-process-card p{font-size:13px;color:rgba(255,255,255,.6);line-height:1.65;margin:0;}
	.dm-img-row{display:grid;grid-template-columns:1fr;gap:24px;}
	@media(min-width:768px){.dm-img-row{grid-template-columns:1fr 1fr;}}
	.dm-why-grid{display:grid;grid-template-columns:1fr;gap:20px;}
	@media(min-width:640px){.dm-why-grid{grid-template-columns:1fr 1fr;}}
	.dm-why-card h3{font-size:19px;font-weight:700;color:white;margin-bottom:10px;}
	.dm-why-card p{font-size:14px;color:rgba(255,255,255,.65);line-height:1.65;margin:0;}
	.dm-industries-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
	@media(min-width:640px){.dm-industries-grid{grid-template-columns:repeat(4,1fr);}}
	@media(min-width:1024px){.dm-industries-grid{grid-template-columns:repeat(7,1fr);}}
	.dm-ind-card{padding:20px;align-items:center;text-align:center;}
	.dm-ind-num{font-size:28px;font-weight:900;color:rgba(6,182,212,.2);line-height:1;margin-bottom:8px;}
	.dm-ind-card h3{font-size:14px;font-weight:600;color:white;margin:0;}
	.dm-faq-list{display:flex;flex-direction:column;gap:12px;}
	.dm-faq-card{padding:0;overflow:hidden;}
	.dm-faq-card:hover{transform:none;}
	.dm-faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:22px 28px;background:none;border:none;color:white;font-size:16px;font-weight:600;cursor:pointer;text-align:left;}
	.dm-faq-q :global(.dm-faq-chev){flex-shrink:0;color:var(--color-cyan);transition:transform .25s;}
	.dm-faq-open .dm-faq-q :global(.dm-faq-chev){transform:rotate(90deg);}
	.dm-faq-a{padding:0 28px 22px;font-size:15px;color:rgba(255,255,255,.7);line-height:1.7;margin:0;}
	.dm-img-card{padding:0!important;overflow:hidden;min-height:280px;position:relative;}
	.dm-img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0;}
	.dm-img-ph{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;min-height:280px;color:rgba(255,255,255,.3);font-size:13px;text-align:center;padding:24px;}
</style>
