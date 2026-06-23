<script lang="ts">
	import { Clapperboard, Film, Globe, Mic, Zap, TrendingDown, MessageSquare, Users, ArrowRight, CheckCircle2 } from 'lucide-svelte';
	import FinalCTA from '$lib/components/FinalCTA.svelte';

	const benefits = [
		{ icon: Zap, title: "Faster Production", desc: "Deliver campaigns in days, not weeks. AI cuts editing, voiceover, and revision cycles dramatically." },
		{ icon: TrendingDown, title: "Lower Production Costs", desc: "Eliminate expensive studio shoots, voice actors, and post-production overhead with AI-native workflows." },
		{ icon: MessageSquare, title: "Consistent Brand Messaging", desc: "Maintain a unified visual identity and tone across every video, ad, and creative asset at scale." },
		{ icon: Globe, title: "Multi-Language Reach", desc: "Launch in 20+ languages instantly with AI dubbing, lip-sync, and subtitle generation." },
		{ icon: Film, title: "High-Volume Content Creation", desc: "Generate hundreds of video variations and ad creatives from a single brief for A/B testing." },
	];

	const useCases = [
		"Marketing Campaigns",
		"Product Launches",
		"Social Media Marketing",
		"Corporate Training",
		"Internal Communications",
	];

	// Image error states — set to true to always show placeholder
	let img1Error = $state(false);
	let img2Error = $state(false);
	let img3Error = $state(false);
	let img4Error = $state(false);
</script>

<svelte:head>
	<title>AI Videos & Creatives | Adymade CMS</title>
	<meta name="description" content="Create professional-quality videos, ads, graphics, and marketing assets faster than ever using AI-powered production workflows." />
</svelte:head>

<div class="relative min-h-screen bg-[#08051a] overflow-hidden">
	<div class="admin-login-ambient-1" style="position: absolute; z-index: 0;"></div>
	<div class="admin-login-ambient-2" style="position: absolute; z-index: 0;"></div>

	<main class="relative z-10">

		<!-- Hero Section -->
		<section class="aiv-hero">
			<div class="container">
				<div class="aiv-hero-inner">

					<!-- Left: Text -->
					<div class="aiv-hero-text">
						<div class="eyebrow" style="background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); backdrop-filter: blur(10px); margin-bottom: 24px;">AI Videos &amp; Creatives</div>
						<h1>Create More Content <br /><span class="grad">in Less Time</span></h1>
						<p class="aiv-hero-sub">
							From promotional videos and social media reels to product showcases and animated explainers, we use AI to accelerate content production while maintaining creative quality.
						</p>
						<a href="https://calendly.com/addymade/15-minute-consultation-call" target="_blank" rel="noopener" class="aiv-cta">
							Book a Free Consultation <ArrowRight size={18} />
						</a>
					</div>

					<!-- Right: Hero Image 1 -->
					<div class="aiv-hero-media glass-card" style="padding: 0; overflow: hidden; min-height: 380px;">
						{#if !img1Error}
							<img src="/ai-video-hero.jpg" alt="AI Video Production" class="aiv-img" onerror={() => img1Error = true} />
						{:else}
							<div class="aiv-img-placeholder">
								<Clapperboard size={48} color="rgba(6,182,212,0.5)" />
								<span>Image 1 — Place in static/</span>
							</div>
						{/if}
					</div>

				</div>
			</div>
		</section>

		<!-- Our Creative Services -->
		<section class="section pt-0">
			<div class="container">

				<!-- Services Grid -->
				<div class="aiv-category">
					<div class="aiv-section-header">
						<h2>Our Creative Services</h2>
						<p>End-to-end AI-powered content production tailored to your brand.</p>
					</div>

					<div class="aiv-services-grid">

						<!-- AI Video Production -->
						<div class="glass-card">
							<div class="gc-icon"><Film size={24} /></div>
							<h3>AI Video Production</h3>
							<ul class="aiv-list">
								<li><CheckCircle2 size={16} /><span>Promotional Videos</span></li>
								<li><CheckCircle2 size={16} /><span>Product Videos</span></li>
								<li><CheckCircle2 size={16} /><span>Corporate Videos</span></li>
								<li><CheckCircle2 size={16} /><span>Explainer Videos</span></li>
								<li><CheckCircle2 size={16} /><span>Training Videos</span></li>
							</ul>
						</div>

						<!-- AI Content Creation -->
						<div class="glass-card">
							<div class="gc-icon"><Clapperboard size={24} /></div>
							<h3>AI Content Creation</h3>
							<ul class="aiv-list">
								<li><CheckCircle2 size={16} /><span>Social Media Creatives</span></li>
								<li><CheckCircle2 size={16} /><span>Ad Creatives</span></li>
								<li><CheckCircle2 size={16} /><span>Visual Branding Assets</span></li>
								<li><CheckCircle2 size={16} /><span>Marketing Graphics</span></li>
								<li><CheckCircle2 size={16} /><span>Motion Design</span></li>
							</ul>
						</div>

						<!-- Voice & Localization -->
						<div class="glass-card">
							<div class="gc-icon"><Mic size={24} /></div>
							<h3>Voice &amp; Localization</h3>
							<ul class="aiv-list">
								<li><CheckCircle2 size={16} /><span>AI Voiceovers</span></li>
								<li><CheckCircle2 size={16} /><span>Multi-language Dubbing</span></li>
								<li><CheckCircle2 size={16} /><span>Subtitle Generation</span></li>
								<li><CheckCircle2 size={16} /><span>Lip Sync Localization</span></li>
							</ul>
						</div>

						<!-- Image 2 -->
						<div class="glass-card aiv-img-card">
							{#if !img2Error}
								<img src="/ai-video-services.jpg" alt="AI Creative Services" class="aiv-img" onerror={() => img2Error = true} />
							{:else}
								<div class="aiv-img-placeholder">
									<Film size={40} color="rgba(6,182,212,0.5)" />
									<span>Image 2 — Place in static/</span>
								</div>
							{/if}
						</div>

					</div>
				</div>

				<!-- Benefits Section -->
				<div class="aiv-category">
					<div class="aiv-section-header">
						<h2>Why Businesses Choose AI Content</h2>
						<p>Transform your content operations with measurable advantages.</p>
					</div>

					<div class="aiv-benefits-grid">
						{#each benefits as b}
							<div class="glass-card">
								<div class="gc-icon"><b.icon size={22} /></div>
								<h3>{b.title}</h3>
								<p>{b.desc}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- Image Row -->
				<div class="aiv-category">
					<div class="aiv-img-row">
						<!-- Image 3 -->
						<div class="glass-card aiv-img-card">
							{#if !img3Error}
								<img src="/ai-video-production.jpg" alt="AI Production Workflow" class="aiv-img" onerror={() => img3Error = true} />
							{:else}
								<div class="aiv-img-placeholder">
									<Clapperboard size={40} color="rgba(6,182,212,0.5)" />
									<span>Image 3 — Place in static/</span>
								</div>
							{/if}
						</div>

						<!-- Image 4 -->
						<div class="glass-card aiv-img-card">
							{#if !img4Error}
								<img src="/ai-video-results.jpg" alt="AI Video Results" class="aiv-img" onerror={() => img4Error = true} />
							{:else}
								<div class="aiv-img-placeholder">
									<Globe size={40} color="rgba(6,182,212,0.5)" />
									<span>Image 4 — Place in static/</span>
								</div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Use Cases -->
				<div class="aiv-category" style="margin-bottom: 40px;">
					<div class="aiv-section-header">
						<h2>Use Cases</h2>
						<p>Industries and scenarios where our AI video solutions deliver maximum impact.</p>
					</div>

					<div class="aiv-use-cases">
						{#each useCases as uc, i}
							<div class="glass-card aiv-usecase-card">
								<div class="aiv-usecase-num">0{i + 1}</div>
								<div class="aiv-usecase-content">
									<Users size={20} color="var(--color-cyan)" />
									<h3>{uc}</h3>
								</div>
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
	/* Hero */
	.aiv-hero {
		padding: 140px 0 80px;
		position: relative;
	}

	.aiv-hero-inner {
		display: grid;
		grid-template-columns: 1fr;
		gap: 48px;
		align-items: center;
	}

	@media (min-width: 900px) {
		.aiv-hero-inner {
			grid-template-columns: 1fr 1fr;
		}
	}

	.aiv-hero-text h1 {
		font-size: clamp(36px, 5vw, 60px);
		font-weight: 800;
		color: white;
		line-height: 1.1;
		letter-spacing: -0.02em;
		margin-bottom: 24px;
	}

	.aiv-hero-sub {
		font-size: 17px;
		color: rgba(255, 255, 255, 0.7);
		line-height: 1.7;
		margin-bottom: 36px;
		max-width: 520px;
	}

	.aiv-cta {
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

	.aiv-cta:hover {
		transform: translateY(-3px);
		box-shadow: 0 10px 30px rgba(255,255,255,0.25);
	}

	.aiv-hero-media {
		border-radius: 24px;
		overflow: hidden;
		position: relative;
	}

	/* Section Headers */
	.aiv-category {
		margin-bottom: 80px;
	}

	.aiv-section-header {
		margin-bottom: 40px;
		border-bottom: 1px solid rgba(255,255,255,0.05);
		padding-bottom: 24px;
	}

	.aiv-section-header h2 {
		font-size: 32px;
		font-weight: 700;
		color: white;
		letter-spacing: -0.02em;
		margin-bottom: 8px;
	}

	.aiv-section-header p {
		font-size: 16px;
		color: rgba(255,255,255,0.6);
	}

	/* Services 2x2 Grid */
	.aiv-services-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}

	@media (min-width: 768px) {
		.aiv-services-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	/* Benefits grid */
	.aiv-benefits-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}

	@media (min-width: 640px) {
		.aiv-benefits-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (min-width: 1024px) {
		.aiv-benefits-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	/* Image helpers */
	.aiv-img-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}

	@media (min-width: 768px) {
		.aiv-img-row {
			grid-template-columns: 1fr 1fr;
		}
	}

	.aiv-img-card {
		padding: 0;
		overflow: hidden;
		min-height: 280px;
		position: relative;
	}

	.aiv-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: absolute;
		inset: 0;
	}

	.aiv-img-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 12px;
		height: 100%;
		min-height: 280px;
		color: rgba(255,255,255,0.3);
		font-size: 13px;
		text-align: center;
	}

	/* Service checklist */
	.aiv-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.aiv-list li {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 15px;
		color: rgba(255,255,255,0.8);
	}

	.aiv-list li :global(svg) {
		color: var(--color-cyan);
		flex-shrink: 0;
	}

	/* Use cases */
	.aiv-use-cases {
		display: grid;
		grid-template-columns: 1fr;
		gap: 16px;
	}

	@media (min-width: 640px) {
		.aiv-use-cases {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (min-width: 1024px) {
		.aiv-use-cases {
			grid-template-columns: repeat(5, 1fr);
		}
	}

	.aiv-usecase-card {
		padding: 24px;
		align-items: flex-start;
		gap: 12px;
	}

	.aiv-usecase-num {
		font-size: 28px;
		font-weight: 800;
		color: rgba(6,182,212,0.3);
		line-height: 1;
		margin-bottom: 8px;
	}

	.aiv-usecase-content {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.aiv-usecase-content h3 {
		font-size: 16px;
		font-weight: 600;
		color: white;
		margin: 0;
	}

	/* Glass card for this page (scoped) */
	.glass-card {
		background: rgba(255, 255, 255, 0.02);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 24px;
		padding: 32px;
		text-decoration: none;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		display: flex;
		flex-direction: column;
		height: 100%;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	.glass-card:hover {
		background: rgba(255, 255, 255, 0.04);
		border-color: rgba(6, 182, 212, 0.4);
		transform: translateY(-4px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(6, 182, 212, 0.08);
	}

	.gc-icon {
		width: 52px;
		height: 52px;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01));
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-cyan);
		margin-bottom: 20px;
		transition: all 0.3s ease;
	}

	.glass-card:hover .gc-icon {
		background: linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(90, 20, 240, 0.15));
		border-color: rgba(6, 182, 212, 0.5);
		color: white;
		transform: scale(1.05) rotate(-2deg);
	}

	.glass-card h3 {
		font-size: 20px;
		font-weight: 700;
		color: white;
		margin-bottom: 16px;
		letter-spacing: -0.01em;
	}

	.glass-card p {
		font-size: 15px;
		color: rgba(255, 255, 255, 0.65);
		line-height: 1.7;
		margin-bottom: 0;
		flex: 1;
	}
</style>
