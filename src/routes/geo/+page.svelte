<script lang="ts">
	import { Sparkles, Search, FileText, Star, Database, Activity, ArrowRight, CheckCircle2, TrendingUp, Clock, ShieldCheck, Zap } from 'lucide-svelte';
	import FinalCTA from '$lib/components/FinalCTA.svelte';

	const services = [
		{ icon: Search, title: "AI Search Visibility Audit", desc: "Identify how AI platforms currently perceive your business, products, and brand across all major AI search engines." },
		{ icon: FileText, title: "Content Optimization", desc: "Create AI-friendly content structures and knowledge assets that AI systems can easily discover, interpret, and cite." },
		{ icon: Star, title: "Authority Building", desc: "Improve credibility through expert content, digital PR, and a stronger brand presence that AI platforms reference." },
		{ icon: Database, title: "Structured Data Enhancement", desc: "Help AI systems understand your business information with schema markup, knowledge panels, and entity optimization." },
		{ icon: Activity, title: "Knowledge Graph Optimization", desc: "Strengthen brand recognition across AI ecosystems by building robust entity relationships and semantic signals." },
	];

	const whyMatters = [
		{ icon: TrendingUp, title: "AI Search is Growing", desc: "More users are asking AI assistants instead of traditional search engines. This shift is accelerating rapidly." },
		{ icon: Clock, title: "Early-Mover Advantage", desc: "Most businesses are still focused only on SEO. GEO gives you a significant competitive head start." },
		{ icon: ShieldCheck, title: "Higher Trust", desc: "AI recommendations carry strong authority and can directly influence purchasing decisions at the moment of intent." },
		{ icon: Zap, title: "Future-Proof Marketing", desc: "Prepare your business for the next generation of search before your competitors even realize the opportunity." },
	];

	const framework = [
		"AI Visibility Assessment",
		"Content Gap Analysis",
		"Entity & Brand Optimization",
		"Authority Development",
		"AI Citation Monitoring",
		"Continuous Optimization",
	];

	const faqs = [
		{ q: "Is GEO replacing SEO?", a: "No. GEO complements SEO and prepares businesses for AI-powered search experiences. Both are essential for a complete digital strategy." },
		{ q: "Which AI platforms do you optimize for?", a: "We focus on major AI assistants, including ChatGPT, Gemini, Claude, and Perplexity — the platforms capturing the most user intent today." },
	];

	// Image error states
	let img1Error = $state(false);
	let img2Error = $state(false);
	let img3Error = $state(false);
	let img4Error = $state(false);
	let img5Error = $state(false);
	let img6Error = $state(false);
</script>

<svelte:head>
	<title>GEO – AI Search Optimization | Adymade CMS</title>
	<meta name="description" content="Optimize your brand for AI-powered search engines. Be found by ChatGPT, Gemini, Claude, and Perplexity before your competitors." />
</svelte:head>

<div class="relative min-h-screen geo-bg overflow-hidden">
	<div class="admin-login-ambient-1" style="position: absolute; z-index: 0;"></div>
	<div class="admin-login-ambient-2" style="position: absolute; z-index: 0;"></div>

	<main class="relative z-10">

		<!-- Hero -->
		<section class="geo-hero">
			<div class="container">
				<div class="geo-hero-inner">
					<div class="geo-hero-text">
						<div class="eyebrow" style="background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); backdrop-filter: blur(10px); margin-bottom: 24px;">
							GEO — Generative Engine Optimization
						</div>
						<h1>Be Found by AI <span class="grad">Before Your Competitors</span></h1>
						<p class="geo-hero-sub">
							Traditional SEO focuses on rankings. GEO focuses on ensuring AI platforms like ChatGPT, Gemini, Claude, and Perplexity can discover, understand, and recommend your business.
						</p>
						<a href="https://calendly.com/addymade/15-minute-consultation-call" target="_blank" rel="noopener" class="geo-cta">
							Start Your GEO Strategy <ArrowRight size={18} />
						</a>
					</div>

					<!-- Hero Image 1 -->
					<div class="geo-hero-media glass-card">
						{#if !img1Error}
							<img src="/geo-hero.jpg" alt="GEO AI Search" class="geo-img" onerror={() => img1Error = true} />
						{:else}
							<div class="geo-img-placeholder">
								<Sparkles size={56} color="rgba(6,182,212,0.5)" />
								<span>Image 1 — Place in static/</span>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</section>

		<section class="section pt-0">
			<div class="container">

				<!-- What is GEO -->
				<div class="geo-category">
					<div class="geo-what-grid">
						<div class="glass-card geo-what-text">
							<div class="geo-section-label">What is GEO?</div>
							<h2>Optimize for the AI Era of Search</h2>
							<p>Generative Engine Optimization (GEO) is the practice of improving how AI systems interpret and reference your brand, products, services, and expertise.</p>
							<p style="margin-top: 16px;">As users increasingly ask AI assistants instead of search engines, businesses must optimize content for AI-generated answers — or risk becoming invisible to the next generation of customers.</p>
						</div>

						<!-- Image 2 -->
						<div class="glass-card geo-img-card">
							{#if !img2Error}
								<img src="/geo-what.jpg" alt="What is GEO" class="geo-img" onerror={() => img2Error = true} />
							{:else}
								<div class="geo-img-placeholder">
									<Search size={40} color="rgba(6,182,212,0.5)" />
									<span>Image 2 — Place in static/</span>
								</div>
							{/if}
						</div>
					</div>
				</div>

				<!-- GEO Services -->
				<div class="geo-category">
					<div class="geo-section-header">
						<h2>GEO Services</h2>
						<p>A comprehensive suite of AI search optimization solutions.</p>
					</div>
					<div class="geo-services-grid">
						{#each services as svc}
							<div class="glass-card">
								<div class="gc-icon"><svc.icon size={22} /></div>
								<h3>{svc.title}</h3>
								<p>{svc.desc}</p>
							</div>
						{/each}

						<!-- Image 3 — spans to fill the 5-item + 1 image = 2×3 grid -->
						<div class="glass-card geo-img-card">
							{#if !img3Error}
								<img src="/geo-services.jpg" alt="GEO Services" class="geo-img" onerror={() => img3Error = true} />
							{:else}
								<div class="geo-img-placeholder">
									<Activity size={40} color="rgba(6,182,212,0.5)" />
									<span>Image 3 — Place in static/</span>
								</div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Why GEO Matters -->
				<div class="geo-category">
					<div class="geo-section-header">
						<h2>Why GEO Matters</h2>
						<p>The shift to AI search is happening now — and early movers will capture the most value.</p>
					</div>
					<div class="geo-why-grid">
						{#each whyMatters as w}
							<div class="glass-card">
								<div class="gc-icon"><w.icon size={22} /></div>
								<h3>{w.title}</h3>
								<p>{w.desc}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- Image Row -->
				<div class="geo-category">
					<div class="geo-img-row">
						<div class="glass-card geo-img-card">
							{#if !img4Error}
								<img src="/geo-strategy.jpg" alt="GEO Strategy" class="geo-img" onerror={() => img4Error = true} />
							{:else}
								<div class="geo-img-placeholder">
									<TrendingUp size={40} color="rgba(6,182,212,0.5)" />
									<span>Image 4 — Place in static/</span>
								</div>
							{/if}
						</div>
						<div class="glass-card geo-img-card">
							{#if !img5Error}
								<img src="/geo-results.jpg" alt="GEO Results" class="geo-img" onerror={() => img5Error = true} />
							{:else}
								<div class="geo-img-placeholder">
									<Star size={40} color="rgba(6,182,212,0.5)" />
									<span>Image 5 — Place in static/</span>
								</div>
							{/if}
						</div>
					</div>
				</div>

				<!-- GEO Strategy Framework -->
				<div class="geo-category">
					<div class="geo-section-header">
						<h2>GEO Strategy Framework</h2>
						<p>Our proven 6-step framework for dominating AI search.</p>
					</div>
					<div class="geo-framework-grid">
						{#each framework as step, i}
							<div class="glass-card geo-framework-card">
								<div class="geo-framework-num">0{i + 1}</div>
								<div class="geo-framework-content">
									<CheckCircle2 size={20} color="var(--color-cyan)" />
									<h3>{step}</h3>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- FAQ -->
				<div class="geo-category">
					<div class="geo-section-header">
						<h2>Frequently Asked Questions</h2>
					</div>
					<div class="geo-faq-list">
						{#each faqs as faq}
							<div class="glass-card geo-faq-card">
								<h3>{faq.q}</h3>
								<p>{faq.a}</p>
							</div>
						{/each}

						<!-- Image 6 in FAQ row -->
						<div class="glass-card geo-img-card" style="min-height: 200px;">
							{#if !img6Error}
								<img src="/geo-faq.jpg" alt="GEO FAQ" class="geo-img" onerror={() => img6Error = true} />
							{:else}
								<div class="geo-img-placeholder">
									<Sparkles size={40} color="rgba(6,182,212,0.5)" />
									<span>Image 6 — Place in static/</span>
								</div>
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
	.geo-bg { background: #08051a; }

	.geo-hero {
		padding: 140px 0 80px;
		position: relative;
	}

	.geo-hero-inner {
		display: grid;
		grid-template-columns: 1fr;
		gap: 48px;
		align-items: center;
	}

	@media (min-width: 900px) {
		.geo-hero-inner { grid-template-columns: 1fr 1fr; }
	}

	.geo-hero-text h1 {
		font-size: clamp(34px, 5vw, 58px);
		font-weight: 800;
		color: white;
		line-height: 1.1;
		letter-spacing: -0.02em;
		margin-bottom: 24px;
	}

	.geo-hero-sub {
		font-size: 17px;
		color: rgba(255,255,255,0.7);
		line-height: 1.7;
		margin-bottom: 36px;
		max-width: 520px;
	}

	.geo-cta {
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

	.geo-cta:hover {
		transform: translateY(-3px);
		box-shadow: 0 10px 30px rgba(255,255,255,0.25);
	}

	.geo-hero-media {
		border-radius: 24px;
		overflow: hidden;
		padding: 0 !important;
		min-height: 380px;
		position: relative;
	}

	/* Sections */
	.geo-category { margin-bottom: 80px; }
	.geo-category:last-child { margin-bottom: 40px; }

	.geo-section-header {
		margin-bottom: 40px;
		border-bottom: 1px solid rgba(255,255,255,0.05);
		padding-bottom: 24px;
	}

	.geo-section-header h2 {
		font-size: 32px;
		font-weight: 700;
		color: white;
		letter-spacing: -0.02em;
		margin-bottom: 8px;
	}

	.geo-section-header p { font-size: 16px; color: rgba(255,255,255,0.6); }

	/* What is GEO */
	.geo-what-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
		align-items: center;
	}

	@media (min-width: 900px) {
		.geo-what-grid { grid-template-columns: 1fr 1fr; }
	}

	.geo-section-label {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-cyan);
		margin-bottom: 16px;
	}

	.geo-what-text h2 {
		font-size: 28px;
		font-weight: 700;
		color: white;
		margin-bottom: 16px;
		letter-spacing: -0.01em;
	}

	.geo-what-text p {
		font-size: 16px;
		color: rgba(255,255,255,0.7);
		line-height: 1.7;
		margin: 0;
	}

	/* Services grid — 2 cols on desktop with 6 items total (5 cards + 1 image) */
	.geo-services-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}

	@media (min-width: 768px) {
		.geo-services-grid { grid-template-columns: 1fr 1fr; }
	}

	/* Why Grid */
	.geo-why-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}

	@media (min-width: 640px) {
		.geo-why-grid { grid-template-columns: 1fr 1fr; }
	}

	/* Image Row */
	.geo-img-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}

	@media (min-width: 768px) {
		.geo-img-row { grid-template-columns: 1fr 1fr; }
	}

	/* Framework */
	.geo-framework-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 16px;
	}

	@media (min-width: 640px) {
		.geo-framework-grid { grid-template-columns: 1fr 1fr; }
	}

	@media (min-width: 1024px) {
		.geo-framework-grid { grid-template-columns: repeat(3, 1fr); }
	}

	.geo-framework-card { padding: 24px 28px; }

	.geo-framework-num {
		font-size: 36px;
		font-weight: 900;
		color: rgba(6,182,212,0.15);
		line-height: 1;
		margin-bottom: 12px;
	}

	.geo-framework-content {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.geo-framework-content h3 {
		font-size: 16px;
		font-weight: 600;
		color: white;
		margin: 0;
	}

	/* FAQ */
	.geo-faq-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.geo-faq-card { padding: 28px 32px; }

	.geo-faq-card h3 {
		font-size: 19px;
		font-weight: 700;
		color: white;
		margin-bottom: 10px;
	}

	/* Images */
	.geo-img-card {
		padding: 0 !important;
		overflow: hidden;
		min-height: 280px;
		position: relative;
	}

	.geo-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: absolute;
		inset: 0;
	}

	.geo-img-placeholder {
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

	/* Scoped glass card */
	.glass-card {
		background: rgba(255,255,255,0.02);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		border: 1px solid rgba(255,255,255,0.08);
		border-radius: 24px;
		padding: 32px;
		text-decoration: none;
		transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
		display: flex;
		flex-direction: column;
		height: 100%;
		box-shadow: 0 10px 30px rgba(0,0,0,0.2);
	}

	.glass-card:hover {
		background: rgba(255,255,255,0.04);
		border-color: rgba(6,182,212,0.4);
		transform: translateY(-4px);
		box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(6,182,212,0.08);
	}

	.gc-icon {
		width: 52px;
		height: 52px;
		background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
		border: 1px solid rgba(255,255,255,0.1);
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-cyan);
		margin-bottom: 20px;
		transition: all 0.3s ease;
	}

	.glass-card:hover .gc-icon {
		background: linear-gradient(135deg, rgba(6,182,212,0.15), rgba(90,20,240,0.15));
		border-color: rgba(6,182,212,0.5);
		color: white;
		transform: scale(1.05) rotate(-2deg);
	}

	.glass-card h3 {
		font-size: 20px;
		font-weight: 700;
		color: white;
		margin-bottom: 12px;
		letter-spacing: -0.01em;
	}

	.glass-card p {
		font-size: 15px;
		color: rgba(255,255,255,0.65);
		line-height: 1.7;
		margin-bottom: 0;
		flex: 1;
	}
</style>
