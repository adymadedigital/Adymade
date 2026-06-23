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

<div class="sp-page">
	<div class="admin-login-ambient-1" style="position:absolute;z-index:0;"></div>
	<div class="admin-login-ambient-2" style="position:absolute;z-index:0;"></div>

	<main class="relative z-10">

		<!-- ─── Hero ─── -->
		<section class="sp-hero">
			<div class="container">
				<div class="sp-hero-inner">
					<div class="sp-hero-text">
						<div class="eyebrow" style="background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);backdrop-filter:blur(10px);margin-bottom:24px;">Web &amp; App Development</div>
						<h1>Build Digital Experiences That <span class="grad">Drive Growth</span></h1>
						<p class="sp-hero-sub">From websites and customer portals to enterprise web platforms and mobile applications, we develop solutions that help businesses engage customers, streamline operations, and scale efficiently.</p>
						<a href="https://calendly.com/addymade/15-minute-consultation-call" target="_blank" rel="noopener" class="sp-cta">Start Your Project <ArrowRight size={18} /></a>
					</div>
					<div class="sp-hero-media sp-glass">
						{#if !img1Error}
							<img src="/webdev-hero.jpg" alt="Web Development" class="sp-img" onerror={() => img1Error = true} />
						{:else}
							<div class="sp-img-ph"><Globe size={56} color="rgba(6,182,212,0.5)" /><span>Image 1 — Place in static/</span></div>
						{/if}
					</div>
				</div>
			</div>
		</section>

		<section class="section pt-0">
			<div class="container">

				<!-- ─── Overview ─── -->
				<div class="sp-block">
					<div class="sp-overview-grid">
						<div class="sp-glass sp-overview-text">
							<div class="sp-label">Overview</div>
							<h2>A Growth Engine, Not Just a Website</h2>
							<p>Today's customers expect fast, intuitive, and seamless digital experiences. A modern website or application isn't just a technology asset — it's a business growth engine.</p>
							<p style="margin-top:14px;">Our team develops secure, scalable, and user-focused digital products that support your business today and evolve with you tomorrow.</p>
						</div>
						<div class="sp-glass sp-img-card">
							{#if !img2Error}
								<img src="/webdev-overview.jpg" alt="Web Development Overview" class="sp-img" onerror={() => img2Error = true} />
							{:else}
								<div class="sp-img-ph"><LayoutDashboard size={40} color="rgba(6,182,212,0.5)" /><span>Image 2 — Place in static/</span></div>
							{/if}
						</div>
					</div>
				</div>

				<!-- ─── Our Services ─── -->
				<div class="sp-block">
					<div class="sp-section-head"><h2>Our Services</h2><p>End-to-end digital product development from concept to launch.</p></div>
					<div class="sp-services-grid">
						{#each services as svc}
							<div class="sp-glass sp-svc-card">
								<div class="sp-icon-wrap"><svc.icon size={24} /></div>
								<h3>{svc.title}</h3>
								<p class="sp-svc-desc">{svc.desc}</p>
								<div class="sp-svc-label">Includes:</div>
								<ul class="sp-checklist">
									{#each svc.items as item}
										<li><CheckCircle2 size={15} /><span>{item}</span></li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
				</div>

				<!-- ─── Image row ─── -->
				<div class="sp-block">
					<div class="sp-img-row">
						<div class="sp-glass sp-img-card">
							{#if !img3Error}
								<img src="/webdev-mobile.jpg" alt="Mobile Development" class="sp-img" onerror={() => img3Error = true} />
							{:else}
								<div class="sp-img-ph"><Smartphone size={40} color="rgba(6,182,212,0.5)" /><span>Image 3 — Place in static/</span></div>
							{/if}
						</div>
						<div class="sp-glass sp-img-card">
							{#if !img4Error}
								<img src="/webdev-ui.jpg" alt="UI/UX Design" class="sp-img" onerror={() => img4Error = true} />
							{:else}
								<div class="sp-img-ph"><Palette size={40} color="rgba(6,182,212,0.5)" /><span>Image 4 — Place in static/</span></div>
							{/if}
						</div>
					</div>
				</div>

				<!-- ─── Process ─── -->
				<div class="sp-block">
					<div class="sp-section-head"><h2>Our Development Process</h2><p>A proven five-step delivery methodology.</p></div>
					<div class="sp-process-track">
						{#each process as step}
							<div class="sp-glass sp-process-card">
								<div class="sp-process-num">{step.num}</div>
								<h3>{step.title}</h3>
								<p>{step.desc}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- ─── Technologies ─── -->
				<div class="sp-block">
					<div class="sp-section-head"><h2>Technologies</h2><p>Modern, battle-tested stack for every layer of your product.</p></div>
					<div class="sp-tech-grid">
						{#each techStack as group}
							<div class="sp-glass sp-tech-card">
								<div class="sp-tech-cat">{group.category}</div>
								<div class="sp-tech-pills">
									{#each group.items as tech}
										<span class="sp-pill">{tech}</span>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- ─── Benefits ─── -->
				<div class="sp-block">
					<div class="sp-section-head"><h2>Benefits</h2><p>Why investing in the right development partner pays off.</p></div>
					<div class="sp-benefits-grid">
						{#each benefits as b}
							<div class="sp-glass sp-benefit-card">
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
				<div class="sp-block">
					<div class="sp-section-head"><h2>FAQ</h2></div>
					<div class="sp-faq-list">
						{#each faqs as faq, i}
							<div class="sp-glass sp-faq-card" class:sp-faq-open={faqOpen === i}>
								<button class="sp-faq-q" onclick={() => faqOpen = faqOpen === i ? null : i}>
									<span>{faq.q}</span>
									<ChevronRight size={18} class="sp-faq-chev" />
								</button>
								{#if faqOpen === i}
									<p class="sp-faq-a">{faq.a}</p>
								{/if}
							</div>
						{/each}

						<!-- Image 5 beside FAQ -->
						<div class="sp-glass sp-img-card">
							{#if !img5Error}
								<img src="/webdev-team.jpg" alt="Development Team" class="sp-img" onerror={() => img5Error = true} />
							{:else}
								<div class="sp-img-ph"><Globe size={40} color="rgba(6,182,212,0.5)" /><span>Image 5 — Place in static/</span></div>
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
	.sp-page { background:#08051a; min-height:100vh; overflow:hidden; position:relative; }

	/* Hero */
	.sp-hero { padding:140px 0 80px; position:relative; }
	.sp-hero-inner { display:grid; grid-template-columns:1fr; gap:48px; align-items:center; }
	@media(min-width:900px){ .sp-hero-inner{grid-template-columns:55% 1fr;} }
	.sp-hero-text h1 { font-size:clamp(34px,5vw,58px); font-weight:800; color:white; line-height:1.1; letter-spacing:-0.02em; margin-bottom:22px; }
	.sp-hero-sub { font-size:17px; color:rgba(255,255,255,0.7); line-height:1.75; margin-bottom:36px; max-width:560px; }
	.sp-hero-media { padding:0!important; min-height:420px; overflow:hidden; position:relative; border-radius:24px; }

	/* CTA */
	.sp-cta { display:inline-flex; align-items:center; gap:10px; background:white; color:#08051a; padding:15px 30px; border-radius:50px; font-weight:700; font-size:16px; text-decoration:none; transition:all .3s; box-shadow:0 4px 20px rgba(255,255,255,.15); }
	.sp-cta:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(255,255,255,.25); }

	/* Glass card */
	.sp-glass { background:rgba(255,255,255,.02); backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px); border:1px solid rgba(255,255,255,.08); border-radius:24px; padding:32px; display:flex; flex-direction:column; transition:all .3s cubic-bezier(.4,0,.2,1); box-shadow:0 10px 30px rgba(0,0,0,.2); }
	.sp-glass:hover { background:rgba(255,255,255,.04); border-color:rgba(6,182,212,.4); transform:translateY(-4px); box-shadow:0 20px 40px rgba(0,0,0,.4),0 0 20px rgba(6,182,212,.08); }

	/* Sections */
	.sp-block { margin-bottom:80px; }
	.sp-section-head { margin-bottom:40px; border-bottom:1px solid rgba(255,255,255,.05); padding-bottom:24px; }
	.sp-section-head h2 { font-size:32px; font-weight:700; color:white; letter-spacing:-0.02em; margin-bottom:8px; }
	.sp-section-head p { font-size:16px; color:rgba(255,255,255,.6); }

	/* Overview */
	.sp-overview-grid { display:grid; grid-template-columns:1fr; gap:24px; align-items:center; }
	@media(min-width:900px){ .sp-overview-grid{grid-template-columns:1fr 1fr;} }
	.sp-label { font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--color-cyan); margin-bottom:14px; }
	.sp-overview-text h2 { font-size:26px; font-weight:700; color:white; margin-bottom:14px; }
	.sp-overview-text p { font-size:15px; color:rgba(255,255,255,.7); line-height:1.75; margin:0; }

	/* Services 2×2 */
	.sp-services-grid { display:grid; grid-template-columns:1fr; gap:24px; }
	@media(min-width:768px){ .sp-services-grid{grid-template-columns:1fr 1fr;} }
	.sp-svc-card h3 { font-size:20px; font-weight:700; color:white; margin-bottom:10px; }
	.sp-svc-desc { font-size:14px; color:rgba(255,255,255,.65); line-height:1.65; margin-bottom:20px; }
	.sp-svc-label { font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:rgba(255,255,255,.4); margin-bottom:12px; }

	/* Icon */
	.sp-icon-wrap { width:52px; height:52px; background:linear-gradient(135deg,rgba(255,255,255,.05),rgba(255,255,255,.01)); border:1px solid rgba(255,255,255,.1); border-radius:14px; display:flex; align-items:center; justify-content:center; color:var(--color-cyan); margin-bottom:20px; transition:all .3s; }
	.sp-glass:hover .sp-icon-wrap { background:linear-gradient(135deg,rgba(6,182,212,.15),rgba(90,20,240,.15)); border-color:rgba(6,182,212,.5); color:white; transform:scale(1.05) rotate(-2deg); }

	/* Checklist */
	.sp-checklist { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; }
	.sp-checklist li { display:flex; align-items:center; gap:9px; font-size:14px; color:rgba(255,255,255,.8); }
	.sp-checklist li :global(svg) { color:var(--color-cyan); flex-shrink:0; }

	/* Image row */
	.sp-img-row { display:grid; grid-template-columns:1fr; gap:24px; }
	@media(min-width:768px){ .sp-img-row{grid-template-columns:1fr 1fr;} }

	/* Process */
	.sp-process-track { display:grid; grid-template-columns:1fr; gap:20px; }
	@media(min-width:640px){ .sp-process-track{grid-template-columns:1fr 1fr;} }
	@media(min-width:1024px){ .sp-process-track{grid-template-columns:repeat(5,1fr);} }
	.sp-process-card { padding:28px 24px; }
	.sp-process-num { font-size:40px; font-weight:900; color:rgba(6,182,212,.15); line-height:1; margin-bottom:16px; }
	.sp-process-card h3 { font-size:17px; font-weight:700; color:white; margin-bottom:8px; }
	.sp-process-card p { font-size:13px; color:rgba(255,255,255,.6); line-height:1.65; margin:0; }

	/* Tech */
	.sp-tech-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
	@media(min-width:768px){ .sp-tech-grid{grid-template-columns:repeat(4,1fr);} }
	.sp-tech-card { padding:24px; }
	.sp-tech-cat { font-size:12px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:rgba(255,255,255,.4); margin-bottom:14px; }
	.sp-tech-pills { display:flex; flex-wrap:wrap; gap:8px; }
	.sp-pill { font-size:13px; font-weight:600; padding:5px 12px; border-radius:20px; border:1px solid rgba(6,182,212,.25); color:rgba(6,182,212,.9); background:rgba(6,182,212,.06); }

	/* Benefits */
	.sp-benefits-grid { display:grid; grid-template-columns:1fr; gap:16px; }
	@media(min-width:768px){ .sp-benefits-grid{grid-template-columns:1fr 1fr;} }
	.sp-benefit-card { flex-direction:row; align-items:flex-start; gap:16px; padding:24px 28px; }
	.sp-benefit-card h3 { font-size:17px; font-weight:700; color:white; margin-bottom:6px; }
	.sp-benefit-card p { font-size:14px; color:rgba(255,255,255,.65); line-height:1.6; margin:0; }

	/* FAQ */
	.sp-faq-list { display:flex; flex-direction:column; gap:12px; }
	.sp-faq-card { padding:0; overflow:hidden; }
	.sp-faq-card:hover { transform:none; }
	.sp-faq-q { width:100%; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:22px 28px; background:none; border:none; color:white; font-size:16px; font-weight:600; cursor:pointer; text-align:left; }
	.sp-faq-q :global(.sp-faq-chev) { flex-shrink:0; color:var(--color-cyan); transition:transform .25s; }
	.sp-faq-open .sp-faq-q :global(.sp-faq-chev) { transform:rotate(90deg); }
	.sp-faq-a { padding:0 28px 22px; font-size:15px; color:rgba(255,255,255,.7); line-height:1.7; margin:0; }

	/* Images */
	.sp-img-card { padding:0!important; overflow:hidden; min-height:280px; position:relative; }
	.sp-img { width:100%; height:100%; object-fit:cover; position:absolute; inset:0; }
	.sp-img-ph { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; min-height:280px; color:rgba(255,255,255,.3); font-size:13px; text-align:center; padding:24px; }
</style>
