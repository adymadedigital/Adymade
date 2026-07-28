<script lang="ts">
	import { Globe, LayoutDashboard, Smartphone, Palette, ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-svelte';
	import FinalCTA from '$lib/components/FinalCTA.svelte';

	const services = [
		{
			icon: Globe,
			title: "Website Development",
			desc: "Professional websites designed to convert visitors into customers.",
			items: ["Corporate Websites", "Business Websites", "Landing Pages", "E-Commerce Stores", "Marketing Websites", "CMS Solutions"],
		},
		{
			icon: LayoutDashboard,
			title: "Web Application Development",
			desc: "Powerful web-based platforms that improve efficiency and customer engagement.",
			items: ["SaaS Platforms", "Customer Portals", "Booking Systems", "Workflow Management Platforms", "Analytics Dashboards", "Internal Business Tools"],
		},
		{
			icon: Smartphone,
			title: "Mobile App Development",
			desc: "Cross-platform and native mobile applications.",
			items: ["Android Applications", "iOS Applications", "Healthcare Apps", "Service Management Apps", "E-Commerce Apps", "Enterprise Mobility Solutions"],
		},
		{
			icon: Palette,
			title: "UI/UX Design",
			desc: "Design experiences that users enjoy and businesses benefit from.",
			items: ["User Research", "Wireframing", "Interactive Prototypes", "User Testing", "Design Systems", "Mobile & Web UI Design"],
		},
	];

	const process = [
		{ num: "01", title: "Discovery", desc: "Understanding business objectives, users, and requirements." },
		{ num: "02", title: "Design", desc: "Creating intuitive interfaces and user journeys." },
		{ num: "03", title: "Development", desc: "Building scalable frontend and backend systems." },
		{ num: "04", title: "Testing", desc: "Ensuring reliability, performance, and security." },
		{ num: "05", title: "Launch & Support", desc: "Deployment, monitoring, maintenance, and enhancements." },
	];

	const techStack = [
		{ category: "Frontend", items: ["React", "Next.js", "Angular", "Vue.js", "Svelte"] },
		{ category: "Backend",  items: ["Node.js", "Python", "FastAPI", ".NET"] },
		{ category: "Mobile",   items: ["Flutter", "React Native", "Android", "iOS"] },
		{ category: "Cloud",    items: ["AWS", "Azure", "Google Cloud"] },
	];

	const benefits = [
		{ title: "Improved Customer Experience", desc: "Deliver seamless digital interactions that retain and convert." },
		{ title: "Faster Business Operations", desc: "Automate processes and reduce inefficiencies across teams." },
		{ title: "Future Scalability", desc: "Build systems ready to grow with your business." },
		{ title: "Better Performance", desc: "Fast, secure, and reliable applications your users trust." },
	];

	const faqs = [
		{ q: "Can you redesign an existing website?", a: "Yes. We modernize outdated websites while improving performance, usability, and SEO." },
		{ q: "Do you offer post-launch support?", a: "Yes. We provide ongoing maintenance, updates, and feature enhancements." },
		{ q: "Can you integrate third-party systems?", a: "Absolutely. We integrate CRMs, ERPs, payment gateways, APIs, and cloud platforms." },
	];

	let img1Error = $state(false);
	let img2Error = $state(false);
	let img3Error = $state(false);
	let img4Error = $state(false);
	let img5Error = $state(false);
	let faqOpen = $state<number | null>(null);
</script>

<svelte:head>
	<title>Web & App Development | Adymade CMS</title>
	<meta name="description" content="Build digital experiences that drive growth — websites, web applications, mobile apps, and UI/UX design tailored to your business." />
</svelte:head>

<div class="svc-page">
	<div class="admin-login-ambient-1" style="position:absolute;z-index:0;"></div>
	<div class="admin-login-ambient-2" style="position:absolute;z-index:0;"></div>

	<main class="relative z-10">

		<!-- ─── Hero ─── -->
		<section class="svc-hero">
			<div class="container">
				<div class="svc-hero-inner">
					<div class="svc-hero-text">
						<div class="eyebrow" style="background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);backdrop-filter:blur(10px);margin-bottom:24px;">Web &amp; App Development</div>
						<h1>Build Digital Experiences That <span class="grad">Drive Growth</span></h1>
						<p class="svc-hero-sub">From websites and customer portals to enterprise web platforms and mobile applications, we develop solutions that help businesses engage customers, streamline operations, and scale efficiently.</p>
						<a href="https://calendly.com/addymade/15-minute-consultation-call" target="_blank" rel="noopener" class="svc-cta">Start Your Project <ArrowRight size={18} /></a>
					</div>
					<div class="svc-hero-media glass-card">
						{#if !img1Error}
							<img src="/image20.png" alt="Web Development" class="svc-img" onerror={() => img1Error = true} />
						{:else}
							<div class="svc-img-placeholder"><Globe size={56} color="rgba(6,182,212,0.5)" /><span>Image 1 — Place in static/</span></div>
						{/if}
					</div>
				</div>
			</div>
		</section>

		<section class="section pt-0">
			<div class="container">

				<!-- ─── Overview ─── -->
				<div class="svc-block">
					<div class="svc-overview-grid">
						<div class="glass-card svc-overview-text">
							<div class="svc-label">Overview</div>
							<h2>A Growth Engine, Not Just a Website</h2>
							<p>Today's customers expect fast, intuitive, and seamless digital experiences. A modern website or application isn't just a technology asset — it's a business growth engine.</p>
							<p style="margin-top:14px;">Our team develops secure, scalable, and user-focused digital products that support your business today and evolve with you tomorrow.</p>
						</div>
						<div class="glass-card svc-img-card">
							{#if !img2Error}
								<img src="/image21.png" alt="Web Development Overview" class="svc-img" onerror={() => img2Error = true} />
							{:else}
								<div class="svc-img-placeholder"><LayoutDashboard size={40} color="rgba(6,182,212,0.5)" /><span>Image 2 — Place in static/</span></div>
							{/if}
						</div>
					</div>
				</div>

				<!-- ─── Our Services ─── -->
				<div class="svc-block">
					<div class="svc-section-head"><h2>Our Services</h2><p>End-to-end digital product development from concept to launch.</p></div>
					<div class="svc-grid-2col">
						{#each services as svc}
							<div class="glass-card svc-svc-card">
								<div class="svc-icon-wrap"><svc.icon size={24} /></div>
								<h3>{svc.title}</h3>
								<p class="svc-svc-desc">{svc.desc}</p>
								<div class="svc-svc-label">Includes:</div>
								<ul class="svc-checklist">
									{#each svc.items as item}
										<li><CheckCircle2 size={15} /><span>{item}</span></li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
				</div>

				<!-- ─── Image row ─── -->
				<div class="svc-block">
					<div class="svc-img-row">
						<div class="glass-card svc-img-card">
							{#if !img3Error}
								<img src="/image22.png" alt="Mobile Development" class="svc-img" onerror={() => img3Error = true} />
							{:else}
								<div class="svc-img-placeholder"><Smartphone size={40} color="rgba(6,182,212,0.5)" /><span>Image 3 — Place in static/</span></div>
							{/if}
						</div>
						<div class="glass-card svc-img-card">
							{#if !img4Error}
								<img src="/image23.png" alt="UI/UX Design" class="svc-img" onerror={() => img4Error = true} />
							{:else}
								<div class="svc-img-placeholder"><Palette size={40} color="rgba(6,182,212,0.5)" /><span>Image 4 — Place in static/</span></div>
							{/if}
						</div>
					</div>
				</div>

				<!-- ─── Process ─── -->
				<div class="svc-block">
					<div class="svc-section-head"><h2>Our Development Process</h2><p>A proven five-step delivery methodology.</p></div>
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

				<!-- ─── Technologies ─── -->
				<div class="svc-block">
					<div class="svc-section-head"><h2>Technologies</h2><p>Modern, battle-tested stack for every layer of your product.</p></div>
					<div class="tech-grid">
						{#each techStack as group}
							<div class="glass-card tech-card">
								<div class="tech-cat">{group.category}</div>
								<div class="tech-pills">
									{#each group.items as tech}
										<span class="tech-pill">{tech}</span>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- ─── Benefits ─── -->
				<div class="svc-block">
					<div class="svc-section-head"><h2>Benefits</h2><p>Why investing in the right development partner pays off.</p></div>
					<div class="benefits-grid">
						{#each benefits as b}
							<div class="glass-card benefit-card">
								<ChevronRight size={20} color="var(--color-cyan)" style="flex-shrink:0;" />
								<div>
									<h3>{b.title}</h3>
									<p>{b.desc}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- ─── FAQ ─── -->
				<div class="svc-block">
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

						<!-- Image 5 beside FAQ -->
						<div class="glass-card svc-img-card svc-faq-img">
							{#if !img5Error}
								<img src="/image24.png" alt="Development Team" class="svc-img" onerror={() => img5Error = true} />
							{:else}
								<div class="svc-img-placeholder"><Globe size={40} color="rgba(6,182,212,0.5)" /><span>Image 5 — Place in static/</span></div>
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
	.svc-faq-img {
		min-height: 420px;
		margin-top: 32px;
	}

	@media (min-width: 768px) {
		.svc-faq-img {
			min-height: 480px;
		}
	}
</style>