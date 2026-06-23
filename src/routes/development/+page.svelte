<script lang="ts">
	import { Globe, Settings2, ShieldCheck, Layers, Plug, Zap, ArrowRight, CheckCircle2 } from 'lucide-svelte';
	import FinalCTA from '$lib/components/FinalCTA.svelte';

	const offerings = [
		{
			icon: Globe,
			title: "Web & App Development",
			desc: "Modern websites, web applications, customer portals, and mobile applications designed for performance, scalability, and exceptional user experiences. From landing pages to full-stack SaaS platforms — we build it right.",
			tags: ["React / Next.js / SvelteKit", "Progressive Web Apps", "Customer Portals", "E-commerce Platforms"],
		},
		{
			icon: Settings2,
			title: "Custom Software Development",
			desc: "Purpose-built software solutions that automate workflows, improve operational efficiency, and solve complex business challenges. Tailored to your exact requirements — not off-the-shelf limitations.",
			tags: ["Business Process Automation", "ERP & CRM Systems", "API Development", "Data Dashboards"],
		},
	];

	const benefits = [
		{ icon: Layers,     text: "Custom-built solutions aligned with your specific business goals" },
		{ icon: Zap,        text: "Scalable architecture designed for future growth from day one" },
		{ icon: ShieldCheck, text: "Enterprise-grade security and production reliability" },
		{ icon: Plug,       text: "Seamless third-party integrations with your existing tools" },
		{ icon: ArrowRight, text: "Faster digital transformation with an experienced delivery team" },
	];

	// Image error states
	let img1Error = $state(false);
	let img2Error = $state(false);
	let img3Error = $state(false);
	let img4Error = $state(false);
</script>

<svelte:head>
	<title>Development Services | Adymade CMS</title>
	<meta name="description" content="Build scalable digital solutions — custom web applications, mobile apps, and enterprise software tailored to your business goals." />
</svelte:head>

<div class="dev-page">
	<div class="admin-login-ambient-1" style="position: absolute; z-index: 0;"></div>
	<div class="admin-login-ambient-2" style="position: absolute; z-index: 0;"></div>

	<main class="relative z-10">

		<!-- ─── Hero ─── -->
		<section class="dev-hero">
			<div class="container">
				<div class="dev-hero-inner">

					<div class="dev-hero-text">
						<div class="eyebrow" style="background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); backdrop-filter: blur(10px); margin-bottom: 24px;">
							Development
						</div>
						<h1>Build Scalable <span class="grad">Digital Solutions</span></h1>
						<p class="dev-hero-sub">
							Transform ideas into powerful digital products with custom web applications, mobile apps, and enterprise software tailored to your business goals.
						</p>
						<p class="dev-hero-body">
							Whether you need a customer-facing platform, an internal business system, or a complete digital transformation initiative, our development team delivers secure, scalable, and future-ready solutions.
						</p>
						<a href="https://calendly.com/addymade/15-minute-consultation-call" target="_blank" rel="noopener" class="dev-cta">
							Explore Development Services <ArrowRight size={18} />
						</a>
					</div>

					<!-- Image 1 -->
					<div class="dev-hero-media dev-glass-card">
						{#if !img1Error}
							<img src="/dev-hero.jpg" alt="Development Services" class="dev-img" onerror={() => img1Error = true} />
						{:else}
							<div class="dev-img-ph">
								<Globe size={56} color="rgba(6,182,212,0.5)" />
								<span>Image 1 — Place in static/</span>
							</div>
						{/if}
					</div>

				</div>
			</div>
		</section>

		<section class="section pt-0">
			<div class="container">

				<!-- ─── What We Offer ─── -->
				<div class="dev-block">
					<div class="dev-section-head">
						<h2>What We Offer</h2>
						<p>Two core service lines covering every stage of your digital product journey.</p>
					</div>

					<div class="dev-offer-grid">
						{#each offerings as offer}
							<div class="dev-glass-card dev-offer-card">
								<div class="dev-icon-wrap"><offer.icon size={26} /></div>
								<h3>{offer.title}</h3>
								<p>{offer.desc}</p>
								<div class="dev-tags">
									{#each offer.tags as tag}
										<span class="dev-tag">{tag}</span>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- ─── Image Row A ─── -->
				<div class="dev-block">
					<div class="dev-img-row">
						<div class="dev-glass-card dev-img-card">
							{#if !img2Error}
								<img src="/dev-web.jpg" alt="Web Development" class="dev-img" onerror={() => img2Error = true} />
							{:else}
								<div class="dev-img-ph">
									<Globe size={40} color="rgba(6,182,212,0.5)" />
									<span>Image 2 — Place in static/</span>
								</div>
							{/if}
						</div>
						<div class="dev-glass-card dev-img-card">
							{#if !img3Error}
								<img src="/dev-software.jpg" alt="Custom Software" class="dev-img" onerror={() => img3Error = true} />
							{:else}
								<div class="dev-img-ph">
									<Settings2 size={40} color="rgba(6,182,212,0.5)" />
									<span>Image 3 — Place in static/</span>
								</div>
							{/if}
						</div>
					</div>
				</div>

				<!-- ─── Key Benefits ─── -->
				<div class="dev-block">
					<div class="dev-section-head">
						<h2>Key Benefits</h2>
						<p>Why businesses choose Adymade for their development needs.</p>
					</div>

					<div class="dev-benefits-grid">
						{#each benefits as b}
							<div class="dev-glass-card dev-benefit-card">
								<div class="dev-icon-wrap dev-icon-sm"><b.icon size={20} /></div>
								<p class="dev-benefit-text">{b.text}</p>
							</div>
						{/each}

						<!-- Image 4 — takes up remaining cell -->
						<div class="dev-glass-card dev-img-card">
							{#if !img4Error}
								<img src="/dev-team.jpg" alt="Development Team" class="dev-img" onerror={() => img4Error = true} />
							{:else}
								<div class="dev-img-ph">
									<Layers size={40} color="rgba(6,182,212,0.5)" />
									<span>Image 4 — Place in static/</span>
								</div>
							{/if}
						</div>
					</div>
				</div>

				<!-- ─── CTA Banner ─── -->
				<div class="dev-block" style="margin-bottom: 40px;">
					<div class="dev-cta-banner dev-glass-card">
						<div class="dev-cta-text">
							<h2>Ready to Build Something Powerful?</h2>
							<p>Tell us about your project and we'll map the right technical approach to your goals — free, no obligation.</p>
						</div>
						<a href="https://calendly.com/addymade/15-minute-consultation-call" target="_blank" rel="noopener" class="dev-cta dev-cta-white">
							Book a Free Consultation <ArrowRight size={18} />
						</a>
					</div>
				</div>

			</div>
		</section>

		<FinalCTA />
	</main>
</div>

<style>
	/* ── Page wrapper ── */
	.dev-page {
		background: #08051a;
		min-height: 100vh;
		overflow: hidden;
		position: relative;
	}

	/* ── Hero ── */
	.dev-hero {
		padding: 140px 0 80px;
		position: relative;
	}

	.dev-hero-inner {
		display: grid;
		grid-template-columns: 1fr;
		gap: 48px;
		align-items: center;
	}

	@media (min-width: 900px) {
		.dev-hero-inner { grid-template-columns: 55% 1fr; }
	}

	.dev-hero-text h1 {
		font-size: clamp(36px, 5vw, 60px);
		font-weight: 800;
		color: white;
		line-height: 1.1;
		letter-spacing: -0.02em;
		margin-bottom: 24px;
	}

	.dev-hero-sub {
		font-size: 18px;
		color: rgba(255,255,255,0.75);
		line-height: 1.7;
		margin-bottom: 16px;
		max-width: 580px;
	}

	.dev-hero-body {
		font-size: 15px;
		color: rgba(255,255,255,0.55);
		line-height: 1.75;
		margin-bottom: 36px;
		max-width: 580px;
	}

	.dev-hero-media {
		padding: 0 !important;
		min-height: 420px;
		overflow: hidden;
		position: relative;
	}

	/* ── CTA button ── */
	.dev-cta {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		background: white;
		color: #08051a;
		padding: 16px 32px;
		border-radius: 50px;
		font-weight: 700;
		font-size: 16px;
		text-decoration: none;
		transition: all 0.3s ease;
		box-shadow: 0 4px 20px rgba(255,255,255,0.15);
	}

	.dev-cta:hover {
		transform: translateY(-3px);
		box-shadow: 0 10px 30px rgba(255,255,255,0.25);
	}

	/* ── Section blocks ── */
	.dev-block { margin-bottom: 80px; }

	.dev-section-head {
		margin-bottom: 40px;
		border-bottom: 1px solid rgba(255,255,255,0.05);
		padding-bottom: 24px;
	}

	.dev-section-head h2 {
		font-size: 32px;
		font-weight: 700;
		color: white;
		letter-spacing: -0.02em;
		margin-bottom: 8px;
	}

	.dev-section-head p { font-size: 16px; color: rgba(255,255,255,0.6); }

	/* ── Glass card base ── */
	.dev-glass-card {
		background: rgba(255,255,255,0.02);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		border: 1px solid rgba(255,255,255,0.08);
		border-radius: 24px;
		padding: 36px;
		display: flex;
		flex-direction: column;
		transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
		box-shadow: 0 10px 30px rgba(0,0,0,0.2);
	}

	.dev-glass-card:hover {
		background: rgba(255,255,255,0.04);
		border-color: rgba(6,182,212,0.35);
		transform: translateY(-4px);
		box-shadow: 0 20px 40px rgba(0,0,0,0.35), 0 0 20px rgba(6,182,212,0.08);
	}

	/* ── Offer cards ── */
	.dev-offer-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}

	@media (min-width: 768px) {
		.dev-offer-grid { grid-template-columns: 1fr 1fr; }
	}

	.dev-offer-card h3 {
		font-size: 22px;
		font-weight: 700;
		color: white;
		margin-bottom: 14px;
		letter-spacing: -0.01em;
	}

	.dev-offer-card p {
		font-size: 15px;
		color: rgba(255,255,255,0.65);
		line-height: 1.75;
		margin-bottom: 24px;
		flex: 1;
	}

	.dev-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; }

	.dev-tag {
		font-size: 12px;
		font-weight: 600;
		padding: 5px 12px;
		border-radius: 20px;
		border: 1px solid rgba(6,182,212,0.3);
		color: rgba(6,182,212,0.9);
		background: rgba(6,182,212,0.06);
		letter-spacing: 0.02em;
	}

	/* ── Icon wrapper ── */
	.dev-icon-wrap {
		width: 56px;
		height: 56px;
		background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
		border: 1px solid rgba(255,255,255,0.1);
		border-radius: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-cyan);
		margin-bottom: 22px;
		transition: all 0.3s ease;
	}

	.dev-icon-sm {
		width: 44px;
		height: 44px;
		border-radius: 12px;
		margin-bottom: 16px;
	}

	.dev-glass-card:hover .dev-icon-wrap {
		background: linear-gradient(135deg, rgba(6,182,212,0.15), rgba(90,20,240,0.15));
		border-color: rgba(6,182,212,0.5);
		color: white;
		transform: scale(1.06) rotate(-2deg);
	}

	/* ── Image row ── */
	.dev-img-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}

	@media (min-width: 768px) {
		.dev-img-row { grid-template-columns: 1fr 1fr; }
	}

	/* ── Benefits grid: 3 cols + 1 image ── */
	.dev-benefits-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}

	@media (min-width: 640px) {
		.dev-benefits-grid { grid-template-columns: 1fr 1fr; }
	}

	@media (min-width: 1024px) {
		.dev-benefits-grid { grid-template-columns: repeat(3, 1fr); }
	}

	.dev-benefit-card {
		flex-direction: row;
		align-items: flex-start;
		gap: 16px;
		padding: 24px;
	}

	.dev-benefit-card .dev-icon-wrap { flex-shrink: 0; margin-bottom: 0; }

	.dev-benefit-text {
		font-size: 15px;
		color: rgba(255,255,255,0.8);
		line-height: 1.6;
		margin: 0;
	}

	/* ── Image helpers ── */
	.dev-img-card {
		padding: 0 !important;
		overflow: hidden;
		min-height: 280px;
		position: relative;
	}

	.dev-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: absolute;
		inset: 0;
	}

	.dev-img-ph {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 12px;
		min-height: 280px;
		color: rgba(255,255,255,0.3);
		font-size: 13px;
		text-align: center;
		padding: 24px;
	}

	/* ── CTA Banner ── */
	.dev-cta-banner {
		flex-direction: column;
		align-items: flex-start;
		gap: 32px;
		background: linear-gradient(135deg, rgba(90,20,240,0.06), rgba(6,182,212,0.06));
		border-color: rgba(90,20,240,0.2);
		padding: 48px;
	}

	.dev-cta-banner:hover {
		border-color: rgba(6,182,212,0.4);
		transform: none;
	}

	@media (min-width: 768px) {
		.dev-cta-banner {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}
	}

	.dev-cta-text h2 {
		font-size: 26px;
		font-weight: 700;
		color: white;
		margin-bottom: 8px;
		letter-spacing: -0.01em;
	}

	.dev-cta-text p {
		font-size: 15px;
		color: rgba(255,255,255,0.65);
		line-height: 1.6;
		max-width: 500px;
	}

	.dev-cta-white { white-space: nowrap; flex-shrink: 0; }
</style>
