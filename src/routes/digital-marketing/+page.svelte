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

<div class="svc-page">
	<div class="admin-login-ambient-1" style="position:absolute;z-index:0;"></div>
	<div class="admin-login-ambient-2" style="position:absolute;z-index:0;"></div>

	<main class="relative z-10">

		<!-- Hero -->
		<section class="svc-hero">
			<div class="container">
				<div class="svc-hero-inner">
					<div class="svc-hero-text">
						<div class="eyebrow" style="background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);backdrop-filter:blur(10px);margin-bottom:24px;">Digital Marketing Services</div>
						<h1>Turn Visibility Into <span class="grad">Revenue</span></h1>
						<p class="svc-hero-sub">We create data-driven digital marketing strategies that help businesses attract customers, generate leads, and increase revenue through targeted campaigns and measurable results.</p>
						<a href="https://calendly.com/addymade/15-minute-consultation-call" target="_blank" rel="noopener" class="svc-cta">Grow Your Business <ArrowRight size={18} /></a>
					</div>
					<div class="svc-hero-media glass-card">
						{#if !img1Error}
							<img src="/image29.png" alt="Digital Marketing" class="svc-img" onerror={() => img1Error = true} />
						{:else}
							<div class="svc-img-placeholder"><TrendingUp size={56} color="rgba(6,182,212,0.5)" /><span>Image 1 — Place in static/</span></div>
						{/if}
					</div>
				</div>
			</div>
		</section>

		<section class="section pt-0">
			<div class="container">

				<!-- Overview -->
				<div class="svc-block">
					<div class="svc-overview-grid">
						<div class="glass-card svc-overview-text">
							<div class="svc-label">Overview</div>
							<h2>Digital Marketing Is No Longer Optional</h2>
							<p>Businesses need a strong online presence to connect with customers, build trust, and stay ahead of competitors.</p>
							<p style="margin-top:14px;">Our digital marketing solutions help businesses reach their audience through strategic campaigns, engaging content, and performance-focused optimization.</p>
						</div>
						<div class="glass-card svc-img-card">
							{#if !img2Error}
								<img src="/image30.png" alt="Digital Marketing Overview" class="svc-img" onerror={() => img2Error = true} />
							{:else}
								<div class="svc-img-placeholder"><BarChart3 size={40} color="rgba(6,182,212,0.5)" /><span>Image 2 — Place in static/</span></div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Services -->
				<div class="svc-block">
					<div class="svc-section-head"><h2>Our Digital Marketing Services</h2><p>Five specialist channels to grow your brand and revenue.</p></div>
					<div class="svc-grid-2col">
						{#each services as svc}
							<div class="glass-card svc-svc-card">
								<div class="svc-icon-wrap"><svc.icon size={24} /></div>
								<h3>{svc.title}</h3>
								<p class="svc-svc-desc">{svc.desc}</p>
								<div class="svc-svc-label">{svc.label}</div>
								<ul class="svc-checklist">
									{#each svc.items as item}
										<li><CheckCircle2 size={15} /><span>{item}</span></li>
									{/each}
								</ul>
							</div>
						{/each}

						<!-- Image 3 -->
						<div class="glass-card svc-img-card">
							{#if !img3Error}
								<img src="/image31.png" alt="Marketing Campaigns" class="svc-img" onerror={() => img3Error = true} />
							{:else}
								<div class="svc-img-placeholder"><Globe size={40} color="rgba(6,182,212,0.5)" /><span>Image 3 — Place in static/</span></div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Process -->
				<div class="svc-block">
					<div class="svc-section-head"><h2>Our Marketing Process</h2><p>A structured approach to building campaigns that deliver results.</p></div>
					<div class="svc-process-track">
						{#each process as step}
							<div class="glass-card svc-process-card">
								<div class="svc-process-num">{step.num}</div>
								<h3>{step.title}</h3>
								<p>{step.desc}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- Image row -->
				<div class="svc-block">
					<div class="svc-img-row">
						<div class="glass-card svc-img-card">
							{#if !img4Error}
								<img src="/image32.png" alt="Social Media Marketing" class="svc-img" onerror={() => img4Error = true} />
							{:else}
								<div class="svc-img-placeholder"><Users size={40} color="rgba(6,182,212,0.5)" /><span>Image 4 — Place in static/</span></div>
							{/if}
						</div>
						<div class="glass-card svc-img-card">
							{#if !img5Error}
								<img src="/image33.png" alt="Marketing Analytics" class="svc-img" onerror={() => img5Error = true} />
							{:else}
								<div class="svc-img-placeholder"><BarChart3 size={40} color="rgba(6,182,212,0.5)" /><span>Image 5 — Place in static/</span></div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Why Us -->
				<div class="svc-block">
					<div class="svc-section-head"><h2>Why Choose Our Digital Marketing Services?</h2><p>What sets our marketing approach apart.</p></div>
					<div class="svc-why-grid">
						{#each whyUs as w}
							<div class="glass-card svc-why-card">
								<div class="svc-icon-wrap"><w.icon size={22} /></div>
								<h3>{w.title}</h3>
								<p>{w.desc}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- Industries -->
				<div class="svc-block">
					<div class="svc-section-head"><h2>Industries We Serve</h2><p>Marketing expertise across diverse sectors.</p></div>
					<div class="svc-industries-grid">
						{#each industries as ind, i}
							<div class="glass-card svc-ind-card">
								<div class="svc-ind-num">0{i + 1}</div>
								<h3>{ind}</h3>
							</div>
						{/each}
					</div>
				</div>

				<!-- FAQ -->
				<div class="svc-block" style="margin-bottom:40px;">
					<div class="svc-section-head"><h2>FAQ</h2></div>
					<div class="svc-faq-list">
						{#each faqs as faq, i}
							<div class="glass-card svc-faq-card" class:svc-faq-open={faqOpen === i}>
								<button class="svc-faq-q" onclick={() => faqOpen = faqOpen === i ? null : i}>
									<span>{faq.q}</span>
									<ChevronRight size={18} class="svc-faq-chev" />
								</button>
								{#if faqOpen === i}
									<p class="svc-faq-a">{faq.a}</p>
								{/if}
							</div>
						{/each}

						<!-- Image 6 -->
						<div class="glass-card svc-img-card">
							{#if !img6Error}
								<img src="/image34.png" alt="Marketing Results" class="svc-img" onerror={() => img6Error = true} />
							{:else}
								<div class="svc-img-placeholder"><Target size={40} color="rgba(6,182,212,0.5)" /><span>Image 6 — Place in static/</span></div>
							{/if}
						</div>
					</div>
				</div>

			</div>
		</section>
		<FinalCTA />
	</main>
</div>
