<script lang="ts">
	import { Settings2, Cpu, Building2, Users, ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-svelte';
	import FinalCTA from '$lib/components/FinalCTA.svelte';

	const solutions = [
		{
			icon: Building2,
			title: "Enterprise Software Development",
			desc: "Comprehensive business systems that centralize operations and improve efficiency.",
			label: "Examples Include:",
			items: ["ERP Systems", "Resource Management Platforms", "Workflow Management Solutions", "Operational Dashboards"],
		},
		{
			icon: Cpu,
			title: "Business Process Automation",
			desc: "Automate repetitive tasks and eliminate manual bottlenecks.",
			label: "Capabilities Include:",
			items: ["Approval Workflows", "Data Processing", "Document Automation", "Reporting Systems", "Notification Engines"],
		},
		{
			icon: Settings2,
			title: "Industry-Specific Software",
			desc: "Tailored solutions built for specialized requirements.",
			label: "Industries Include:",
			items: ["Healthcare", "Manufacturing", "Logistics", "Education", "Finance", "Professional Services"],
		},
		{
			icon: Users,
			title: "Customer & Employee Portals",
			desc: "Create secure and efficient digital experiences.",
			label: "Features Include:",
			items: ["Self-Service Portals", "Employee Dashboards", "Vendor Management", "Customer Relationship Tools", "Internal Collaboration Platforms"],
		},
	];

	const whyCustom = [
		{ title: "Tailored Functionality", desc: "Built specifically around your business processes — not forced to fit generic templates." },
		{ title: "Greater Operational Efficiency", desc: "Reduce manual work and increase productivity with purpose-built automation." },
		{ title: "Competitive Differentiation", desc: "Gain capabilities unavailable through standard off-the-shelf software." },
		{ title: "Long-Term Scalability", desc: "Adapt and expand functionality as your business evolves and grows." },
	];

	const methodology = [
		{ num: "01", title: "Business Discovery", desc: "Understand goals, challenges, and workflows in depth." },
		{ num: "02", title: "Solution Architecture", desc: "Design a scalable and secure technical foundation." },
		{ num: "03", title: "Agile Development", desc: "Deliver in phases with continuous feedback and iteration." },
		{ num: "04", title: "Quality Assurance", desc: "Comprehensive testing and rigorous validation." },
		{ num: "05", title: "Deployment & Training", desc: "Successful implementation with full user onboarding." },
	];

	const capabilities = [
		{ title: "Workflow Automation", desc: "Automate approvals, tasks, and operations." },
		{ title: "Real-Time Reporting", desc: "Access critical business insights instantly." },
		{ title: "API Integration", desc: "Connect systems and eliminate data silos." },
		{ title: "Advanced Analytics", desc: "Turn operational data into actionable intelligence." },
		{ title: "Cloud Accessibility", desc: "Secure access from anywhere in the world." },
		{ title: "Role-Based Security", desc: "Control access and permissions efficiently." },
	];

	const outcomes = [
		{ title: "Reduced Operational Costs", desc: "Optimize processes and resources through automation." },
		{ title: "Improved Productivity", desc: "Empower teams with better, purpose-built tools." },
		{ title: "Better Decision-Making", desc: "Gain visibility through real-time data and dashboards." },
		{ title: "Increased Agility", desc: "Respond quickly to changing business needs." },
	];

	const faqs = [
		{ q: "How long does custom software development take?", a: "Timelines vary based on complexity, features, integrations, and project scope. Most projects range from several weeks to several months." },
		{ q: "Can custom software integrate with existing systems?", a: "Yes. We specialize in integrating software with CRMs, ERPs, databases, cloud platforms, and third-party applications." },
		{ q: "Is custom software secure?", a: "Security is built into every stage of development, including architecture, testing, deployment, and ongoing maintenance." },
	];

	let img1Error = $state(false);
	let img2Error = $state(false);
	let img3Error = $state(false);
	let img4Error = $state(false);
	let faqOpen = $state<number | null>(null);
</script>

<svelte:head>
	<title>Custom Software Development | Adymade CMS</title>
	<meta name="description" content="Software built around your business. Stop adapting to generic tools — get custom solutions that fit your workflows and drive competitive advantage." />
</svelte:head>

<div class="cs-page">
	<div class="admin-login-ambient-1" style="position:absolute;z-index:0;"></div>
	<div class="admin-login-ambient-2" style="position:absolute;z-index:0;"></div>

	<main class="relative z-10">

		<!-- ─── Hero ─── -->
		<section class="cs-hero">
			<div class="container">
				<div class="cs-hero-inner">
					<div class="cs-hero-text">
						<div class="eyebrow" style="background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);backdrop-filter:blur(10px);margin-bottom:24px;">Custom Software Development</div>
						<h1>Software Built Around <span class="grad">Your Business</span></h1>
						<p class="cs-hero-sub">Stop adapting your processes to generic software. We create custom solutions that fit your workflows, improve productivity, and provide a lasting competitive advantage.</p>
						<a href="https://calendly.com/addymade/15-minute-consultation-call" target="_blank" rel="noopener" class="cs-cta">Discuss Your Requirements <ArrowRight size={18} /></a>
					</div>
					<div class="cs-hero-media cs-glass">
						{#if !img1Error}
							<img src="/software-hero.jpg" alt="Custom Software" class="cs-img" onerror={() => img1Error = true} />
						{:else}
							<div class="cs-img-ph"><Settings2 size={56} color="rgba(6,182,212,0.5)" /><span>Image 1 — Place in static/</span></div>
						{/if}
					</div>
				</div>
			</div>
		</section>

		<section class="section pt-0">
			<div class="container">

				<!-- ─── Overview ─── -->
				<div class="cs-block">
					<div class="cs-overview-grid">
						<div class="cs-glass cs-overview-text">
							<div class="cs-label">Overview</div>
							<h2>Complete Flexibility. Zero Compromise.</h2>
							<p>Every business has unique challenges, workflows, and goals. Off-the-shelf software often addresses only part of the problem.</p>
							<p style="margin-top:14px;">Custom software delivers complete flexibility, enabling organizations to streamline operations, improve decision-making, and scale without limitations.</p>
						</div>
						<div class="cs-glass cs-img-card">
							{#if !img2Error}
								<img src="/software-overview.jpg" alt="Custom Software Overview" class="cs-img" onerror={() => img2Error = true} />
							{:else}
								<div class="cs-img-ph"><Cpu size={40} color="rgba(6,182,212,0.5)" /><span>Image 2 — Place in static/</span></div>
							{/if}
						</div>
					</div>
				</div>

				<!-- ─── Solutions ─── -->
				<div class="cs-block">
					<div class="cs-section-head"><h2>Our Solutions</h2><p>Four core software delivery areas covering every enterprise need.</p></div>
					<div class="cs-solutions-grid">
						{#each solutions as sol}
							<div class="cs-glass cs-sol-card">
								<div class="cs-icon-wrap"><sol.icon size={24} /></div>
								<h3>{sol.title}</h3>
								<p class="cs-sol-desc">{sol.desc}</p>
								<div class="cs-sol-label">{sol.label}</div>
								<ul class="cs-checklist">
									{#each sol.items as item}
										<li><CheckCircle2 size={15} /><span>{item}</span></li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
				</div>

				<!-- ─── Why Custom ─── -->
				<div class="cs-block">
					<div class="cs-section-head"><h2>Why Custom Software?</h2><p>The advantages of purpose-built software versus off-the-shelf alternatives.</p></div>
					<div class="cs-why-grid">
						{#each whyCustom as w}
							<div class="cs-glass cs-why-card">
								<ChevronRight size={22} color="var(--color-cyan)" style="flex-shrink:0;margin-top:2px;" />
								<div>
									<h3>{w.title}</h3>
									<p>{w.desc}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- ─── Image Row ─── -->
				<div class="cs-block">
					<div class="cs-img-row">
						<div class="cs-glass cs-img-card">
							{#if !img3Error}
								<img src="/software-team.jpg" alt="Software Team" class="cs-img" onerror={() => img3Error = true} />
							{:else}
								<div class="cs-img-ph"><Building2 size={40} color="rgba(6,182,212,0.5)" /><span>Image 3 — Place in static/</span></div>
							{/if}
						</div>
						<div class="cs-glass cs-img-card">
							{#if !img4Error}
								<img src="/software-dashboard.jpg" alt="Software Dashboard" class="cs-img" onerror={() => img4Error = true} />
							{:else}
								<div class="cs-img-ph"><Users size={40} color="rgba(6,182,212,0.5)" /><span>Image 4 — Place in static/</span></div>
							{/if}
						</div>
					</div>
				</div>

				<!-- ─── Methodology ─── -->
				<div class="cs-block">
					<div class="cs-section-head"><h2>Development Methodology</h2><p>Our structured, transparent approach to delivering custom software.</p></div>
					<div class="cs-process-track">
						{#each methodology as step}
							<div class="cs-glass cs-process-card">
								<div class="cs-process-num">{step.num}</div>
								<h3>{step.title}</h3>
								<p>{step.desc}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- ─── Capabilities ─── -->
				<div class="cs-block">
					<div class="cs-section-head"><h2>Key Capabilities</h2><p>Core technical capabilities baked into every custom solution we build.</p></div>
					<div class="cs-cap-grid">
						{#each capabilities as cap}
							<div class="cs-glass cs-cap-card">
								<h3>{cap.title}</h3>
								<p>{cap.desc}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- ─── Business Outcomes ─── -->
				<div class="cs-block">
					<div class="cs-section-head"><h2>Business Outcomes</h2><p>Measurable results our clients achieve with custom software.</p></div>
					<div class="cs-outcomes-grid">
						{#each outcomes as o, i}
							<div class="cs-glass cs-outcome-card">
								<div class="cs-outcome-num">0{i + 1}</div>
								<h3>{o.title}</h3>
								<p>{o.desc}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- ─── FAQ ─── -->
				<div class="cs-block" style="margin-bottom:40px;">
					<div class="cs-section-head"><h2>FAQ</h2></div>
					<div class="cs-faq-list">
						{#each faqs as faq, i}
							<div class="cs-glass cs-faq-card" class:cs-faq-open={faqOpen === i}>
								<button class="cs-faq-q" onclick={() => faqOpen = faqOpen === i ? null : i}>
									<span>{faq.q}</span>
									<ChevronRight size={18} class="cs-faq-chev" />
								</button>
								{#if faqOpen === i}
									<p class="cs-faq-a">{faq.a}</p>
								{/if}
							</div>
						{/each}
					</div>
				</div>

			</div>
		</section>

		<FinalCTA />
	</main>
</div>

<style>
	.cs-page { background:#08051a; min-height:100vh; overflow:hidden; position:relative; }

	/* Hero */
	.cs-hero { padding:140px 0 80px; position:relative; }
	.cs-hero-inner { display:grid; grid-template-columns:1fr; gap:48px; align-items:center; }
	@media(min-width:900px){ .cs-hero-inner{grid-template-columns:55% 1fr;} }
	.cs-hero-text h1 { font-size:clamp(34px,5vw,58px); font-weight:800; color:white; line-height:1.1; letter-spacing:-0.02em; margin-bottom:22px; }
	.cs-hero-sub { font-size:17px; color:rgba(255,255,255,0.7); line-height:1.75; margin-bottom:36px; max-width:560px; }
	.cs-hero-media { padding:0!important; min-height:420px; overflow:hidden; position:relative; border-radius:24px; }

	/* CTA */
	.cs-cta { display:inline-flex; align-items:center; gap:10px; background:white; color:#08051a; padding:15px 30px; border-radius:50px; font-weight:700; font-size:16px; text-decoration:none; transition:all .3s; box-shadow:0 4px 20px rgba(255,255,255,.15); }
	.cs-cta:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(255,255,255,.25); }

	/* Glass */
	.cs-glass { background:rgba(255,255,255,.02); backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px); border:1px solid rgba(255,255,255,.08); border-radius:24px; padding:32px; display:flex; flex-direction:column; transition:all .3s cubic-bezier(.4,0,.2,1); box-shadow:0 10px 30px rgba(0,0,0,.2); }
	.cs-glass:hover { background:rgba(255,255,255,.04); border-color:rgba(6,182,212,.4); transform:translateY(-4px); box-shadow:0 20px 40px rgba(0,0,0,.4),0 0 20px rgba(6,182,212,.08); }

	/* Sections */
	.cs-block { margin-bottom:80px; }
	.cs-section-head { margin-bottom:40px; border-bottom:1px solid rgba(255,255,255,.05); padding-bottom:24px; }
	.cs-section-head h2 { font-size:32px; font-weight:700; color:white; letter-spacing:-0.02em; margin-bottom:8px; }
	.cs-section-head p { font-size:16px; color:rgba(255,255,255,.6); }

	/* Overview */
	.cs-overview-grid { display:grid; grid-template-columns:1fr; gap:24px; align-items:center; }
	@media(min-width:900px){ .cs-overview-grid{grid-template-columns:1fr 1fr;} }
	.cs-label { font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--color-cyan); margin-bottom:14px; }
	.cs-overview-text h2 { font-size:26px; font-weight:700; color:white; margin-bottom:14px; }
	.cs-overview-text p { font-size:15px; color:rgba(255,255,255,.7); line-height:1.75; margin:0; }

	/* Solutions 2×2 */
	.cs-solutions-grid { display:grid; grid-template-columns:1fr; gap:24px; }
	@media(min-width:768px){ .cs-solutions-grid{grid-template-columns:1fr 1fr;} }
	.cs-sol-card h3 { font-size:20px; font-weight:700; color:white; margin-bottom:10px; }
	.cs-sol-desc { font-size:14px; color:rgba(255,255,255,.65); line-height:1.65; margin-bottom:20px; }
	.cs-sol-label { font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:rgba(255,255,255,.4); margin-bottom:12px; }

	/* Icon */
	.cs-icon-wrap { width:52px; height:52px; background:linear-gradient(135deg,rgba(255,255,255,.05),rgba(255,255,255,.01)); border:1px solid rgba(255,255,255,.1); border-radius:14px; display:flex; align-items:center; justify-content:center; color:var(--color-cyan); margin-bottom:20px; transition:all .3s; }
	.cs-glass:hover .cs-icon-wrap { background:linear-gradient(135deg,rgba(6,182,212,.15),rgba(90,20,240,.15)); border-color:rgba(6,182,212,.5); color:white; transform:scale(1.05) rotate(-2deg); }

	/* Checklist */
	.cs-checklist { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; }
	.cs-checklist li { display:flex; align-items:center; gap:9px; font-size:14px; color:rgba(255,255,255,.8); }
	.cs-checklist li :global(svg) { color:var(--color-cyan); flex-shrink:0; }

	/* Why */
	.cs-why-grid { display:grid; grid-template-columns:1fr; gap:16px; }
	@media(min-width:768px){ .cs-why-grid{grid-template-columns:1fr 1fr;} }
	.cs-why-card { flex-direction:row; align-items:flex-start; gap:16px; padding:24px 28px; }
	.cs-why-card h3 { font-size:17px; font-weight:700; color:white; margin-bottom:6px; }
	.cs-why-card p { font-size:14px; color:rgba(255,255,255,.65); line-height:1.6; margin:0; }

	/* Image row */
	.cs-img-row { display:grid; grid-template-columns:1fr; gap:24px; }
	@media(min-width:768px){ .cs-img-row{grid-template-columns:1fr 1fr;} }

	/* Process */
	.cs-process-track { display:grid; grid-template-columns:1fr; gap:20px; }
	@media(min-width:640px){ .cs-process-track{grid-template-columns:1fr 1fr;} }
	@media(min-width:1024px){ .cs-process-track{grid-template-columns:repeat(5,1fr);} }
	.cs-process-card { padding:28px 24px; }
	.cs-process-num { font-size:40px; font-weight:900; color:rgba(6,182,212,.15); line-height:1; margin-bottom:16px; }
	.cs-process-card h3 { font-size:17px; font-weight:700; color:white; margin-bottom:8px; }
	.cs-process-card p { font-size:13px; color:rgba(255,255,255,.6); line-height:1.65; margin:0; }

	/* Capabilities 3×2 */
	.cs-cap-grid { display:grid; grid-template-columns:1fr; gap:16px; }
	@media(min-width:640px){ .cs-cap-grid{grid-template-columns:1fr 1fr;} }
	@media(min-width:1024px){ .cs-cap-grid{grid-template-columns:repeat(3,1fr);} }
	.cs-cap-card { padding:24px 28px; }
	.cs-cap-card h3 { font-size:17px; font-weight:700; color:white; margin-bottom:8px; }
	.cs-cap-card p { font-size:14px; color:rgba(255,255,255,.65); line-height:1.6; margin:0; }

	/* Outcomes */
	.cs-outcomes-grid { display:grid; grid-template-columns:1fr; gap:16px; }
	@media(min-width:768px){ .cs-outcomes-grid{grid-template-columns:1fr 1fr;} }
	.cs-outcome-card { padding:28px; }
	.cs-outcome-num { font-size:40px; font-weight:900; background:linear-gradient(135deg,var(--color-electric),var(--color-cyan)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; line-height:1; margin-bottom:14px; }
	.cs-outcome-card h3 { font-size:19px; font-weight:700; color:white; margin-bottom:8px; }
	.cs-outcome-card p { font-size:14px; color:rgba(255,255,255,.65); line-height:1.6; margin:0; }

	/* FAQ */
	.cs-faq-list { display:flex; flex-direction:column; gap:12px; }
	.cs-faq-card { padding:0; overflow:hidden; }
	.cs-faq-card:hover { transform:none; }
	.cs-faq-q { width:100%; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:22px 28px; background:none; border:none; color:white; font-size:16px; font-weight:600; cursor:pointer; text-align:left; }
	.cs-faq-q :global(.cs-faq-chev) { flex-shrink:0; color:var(--color-cyan); transition:transform .25s; }
	.cs-faq-open .cs-faq-q :global(.cs-faq-chev) { transform:rotate(90deg); }
	.cs-faq-a { padding:0 28px 22px; font-size:15px; color:rgba(255,255,255,.7); line-height:1.7; margin:0; }

	/* Images */
	.cs-img-card { padding:0!important; overflow:hidden; min-height:280px; position:relative; }
	.cs-img { width:100%; height:100%; object-fit:cover; position:absolute; inset:0; }
	.cs-img-ph { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; min-height:280px; color:rgba(255,255,255,.3); font-size:13px; text-align:center; padding:24px; }
</style>
