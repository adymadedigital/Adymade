<script lang="ts">
	import { Bot, Clapperboard, ClipboardCheck, Globe, Settings2, TrendingUp, Search, Sparkles, HardHat, ArrowRight } from 'lucide-svelte';
	import FinalCTA from '$lib/components/FinalCTA.svelte';

	const categories = [
		{ id: 'ai-automation-cat', label: 'AI & Automation' },
		{ id: 'development-cat', label: 'Development' },
		{ id: 'marketing-cat', label: 'Marketing' },
		{ id: 'gcc-cat', label: 'GCC Expertise' }
	];

	let activeCat = $state('ai-automation-cat');

	function scrollToCat(id: string) {
		const el = document.getElementById(id);
		if (el) {
			const y = el.getBoundingClientRect().top + window.scrollY - 140;
			window.scrollTo({ top: y, behavior: 'smooth' });
		}
		activeCat = id;
	}

	function handleScroll() {
		const offsets = categories.map((c) => {
			const el = document.getElementById(c.id);
			return { id: c.id, top: el ? el.getBoundingClientRect().top : Infinity };
		});
		const current = offsets
			.filter((o) => o.top < 180)
			.sort((a, b) => b.top - a.top)[0];
		if (current) activeCat = current.id;
	}
</script>

<svelte:head>
	<title>Our Services | Adymade CMS</title>
	<meta name="description" content="Explore Adymade's comprehensive services including AI & Automation, Development, Marketing, and GCC Expertise." />
</svelte:head>

<svelte:window onscroll={handleScroll} />

<!-- Liquid Glass Wrapper -->
<div class="relative min-h-screen bg-[#08051a] overflow-hidden">

	<!-- Ambient Background Orbs -->
	<div class="admin-login-ambient-1" style="position: absolute; z-index: 0;"></div>
	<div class="admin-login-ambient-2" style="position: absolute; z-index: 0;"></div>

	<main class="relative z-10">
		<!-- Hero Section -->
		<section class="services-hero">
			<div class="container relative">
				<div class="hero-content text-center">
					<div class="eyebrow" style="justify-content: center; margin-bottom: 24px; background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); backdrop-filter: blur(10px);">Our Capabilities</div>
					<h1 style="font-size: clamp(40px, 6vw, 64px); font-weight: 800; line-height: 1.1; margin-bottom: 24px; color: white;">
						Transform Your Business with <br/><span class="grad">Next-Gen Solutions</span>
					</h1>
					<p style="font-size: 18px; color: rgba(255,255,255,0.7); max-width: 650px; margin: 0 auto 40px; line-height: 1.6;">
						From AI automation to high-performance web development and enterprise-grade marketing, we provide end-to-end digital solutions utilizing a premium, data-driven approach.
					</p>
				</div>
			</div>
		</section>

		<!-- Sticky Category Nav -->
		<div class="cat-nav-sticky">
			<div class="container">
				<div class="cat-nav-bar">
					{#each categories as cat}
						<button
							class="cat-nav-btn"
							class:active={activeCat === cat.id}
							onclick={() => scrollToCat(cat.id)}
						>
							{cat.label}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Services Grid -->
		<section class="section pt-0">
			<div class="container">

				<!-- AI & Automation -->
				<div class="service-category" id="ai-automation-cat">
					<div class="category-header">
						<h2>AI &amp; Automation</h2>
						<p>Intelligent solutions to streamline operations and scale your brand.</p>
					</div>
					<div class="services-grid">
						<a href="/ai-automation" class="glass-card">
							<div class="gc-icon"><Bot size={32} /></div>
							<h3>AI Automation &amp; Agents</h3>
							<p>Autonomous AI agents for support, lead qualification &amp; workflows.</p>
							<span class="gc-link">Learn more <ArrowRight size={16} /></span>
						</a>
						<a href="/ai-videos" class="glass-card">
							<div class="gc-icon"><Clapperboard size={32} /></div>
							<h3>AI Videos &amp; Creatives</h3>
							<p>High-converting AI video content for ads, Reels &amp; TikTok.</p>
							<span class="gc-link">Learn more <ArrowRight size={16} /></span>
						</a>
						<a href="/compliance-videos" class="glass-card">
							<div class="gc-icon"><ClipboardCheck size={32} /></div>
							<h3>Compliance Videos</h3>
							<p>AI avatar training videos, localized fast across offices.</p>
							<span class="gc-link">Learn more <ArrowRight size={16} /></span>
						</a>
						<a href="/geo" class="glass-card">
							<div class="gc-icon"><Sparkles size={32} /></div>
							<h3>GEO — AI Search</h3>
							<p>Rank as the top answer inside ChatGPT, Claude &amp; Gemini.</p>
							<span class="gc-link">Learn more <ArrowRight size={16} /></span>
						</a>
					</div>
				</div>

				<!-- Development -->
				<div class="service-category" id="development-cat">
					<div class="category-header">
						<h2>Development</h2>
						<p>Robust, scalable, and high-performance digital infrastructure.</p>
					</div>
					<div class="services-grid">
						<a href="/web-development" class="glass-card">
							<div class="gc-icon"><Globe size={32} /></div>
							<h3>Web &amp; App Development</h3>
							<p>Fast websites &amp; apps built for scale and conversions.</p>
							<span class="gc-link">Learn more <ArrowRight size={16} /></span>
						</a>
						<a href="/software-development" class="glass-card">
							<div class="gc-icon"><Settings2 size={32} /></div>
							<h3>Custom Software</h3>
							<p>Bespoke SaaS &amp; ERP systems engineered for your operations.</p>
							<span class="gc-link">Learn more <ArrowRight size={16} /></span>
						</a>
					</div>
				</div>

				<!-- Marketing -->
				<div class="service-category" id="marketing-cat">
					<div class="category-header">
						<h2>Marketing</h2>
						<p>Data-driven strategies to dominate your market and capture intent.</p>
					</div>
					<div class="services-grid">
						<a href="/digital-marketing" class="glass-card">
							<div class="gc-icon"><TrendingUp size={32} /></div>
							<h3>Digital Marketing</h3>
							<p>ROI-focused campaigns across Google, Meta &amp; LinkedIn.</p>
							<span class="gc-link">Learn more <ArrowRight size={16} /></span>
						</a>
						<a href="/seo-services" class="glass-card">
							<div class="gc-icon"><Search size={32} /></div>
							<h3>SEO Services</h3>
							<p>Technical &amp; content SEO for sustainable organic growth.</p>
							<span class="gc-link">Learn more <ArrowRight size={16} /></span>
						</a>
					</div>
				</div>

				<!-- GCC Expertise -->
				<div class="service-category" id="gcc-cat">
					<div class="category-header">
						<h2>GCC Expertise</h2>
						<p>Specialized enterprise solutions for the Middle East market.</p>
					</div>
					<div class="services-grid" style="grid-template-columns: 1fr;">
						<a href="/case-studies/rgs-saudi-arabia" class="glass-card featured-glass-card">
							<div class="featured-card-content">
								<div class="gc-icon featured-icon">
									<HardHat size={36} color="white" />
								</div>
								<div style="flex: 1;">
									<h3 style="font-size: 24px; margin-bottom: 12px;">🇸🇦 RGS — Tamimi Group</h3>
									<p style="font-size: 16px; margin-bottom: 0;">Enterprise website rebuild &amp; digital transformation for a leading Saudi scaffolding company.</p>
								</div>
								<span class="glass-btn-inline">View Case Study <ArrowRight size={16} /></span>
							</div>
						</a>
					</div>
				</div>

			</div>
		</section>

		<FinalCTA />
	</main>
</div>

<style>
	.services-hero {
		padding: 140px 0 40px;
		position: relative;
	}

	/* ── Sticky category nav ── */
	.cat-nav-sticky {
		position: sticky;
		top: 72px; /* sits just below the fixed header */
		z-index: 50;
		background: rgba(8, 5, 26, 0.85);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		padding: 14px 0;
		margin-bottom: 8px;
	}

	.cat-nav-bar {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		justify-content: center;
	}

	.cat-nav-btn {
		padding: 8px 20px;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: transparent;
		color: rgba(255, 255, 255, 0.6);
		font-size: 13px;
		font-weight: 500;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.2s ease;
		white-space: nowrap;
	}

	.cat-nav-btn:hover {
		border-color: rgba(6, 182, 212, 0.4);
		color: white;
	}

	.cat-nav-btn.active {
		background: var(--color-electric, #5a14f0);
		border-color: var(--color-electric, #5a14f0);
		color: white;
	}

	.service-category {
		margin-bottom: 72px;
		scroll-margin-top: 140px;
	}

	.service-category:last-child {
		margin-bottom: 40px;
	}

	.category-header {
		margin-bottom: 32px;
		border-bottom: 1px solid rgba(255,255,255,0.05);
		padding-bottom: 24px;
	}

	.category-header h2 {
		font-size: 32px;
		font-weight: 700;
		color: white;
		margin-bottom: 8px;
		letter-spacing: -0.02em;
	}

	.category-header p {
		font-size: 16px;
		color: rgba(255, 255, 255, 0.6);
	}

	.services-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}

	@media (min-width: 768px) {
		.services-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	/* Liquid Glass Card Styling */
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
		transform: translateY(-6px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(6, 182, 212, 0.1);
	}

	.gc-icon {
		width: 76px;
		height: 76px;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01));
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-cyan);
		margin-bottom: 24px;
		transition: all 0.3s ease;
		box-shadow: inset 0 2px 10px rgba(255,255,255,0.05);
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
		margin-bottom: 10px;
		letter-spacing: -0.01em;
	}

	.glass-card p {
		font-size: 14px;
		color: rgba(255, 255, 255, 0.6);
		line-height: 1.55;
		margin-bottom: 24px;
		flex: 1;
	}

	.gc-link {
		font-size: 15px;
		font-weight: 600;
		color: var(--color-cyan);
		display: flex;
		align-items: center;
		gap: 8px;
		transition: gap 0.2s, color 0.2s;
	}

	.glass-card:hover .gc-link {
		gap: 12px;
		color: white;
	}

	.featured-glass-card {
		background: linear-gradient(135deg, rgba(90, 20, 240, 0.05), rgba(6, 182, 212, 0.05));
		border: 1px solid rgba(90, 20, 240, 0.2);
	}

	.featured-glass-card:hover {
		background: linear-gradient(135deg, rgba(90, 20, 240, 0.08), rgba(6, 182, 212, 0.08));
		border: 1px solid rgba(90, 20, 240, 0.4);
	}

	.featured-icon {
		background: linear-gradient(135deg, var(--color-electric), var(--color-cyan));
		color: white;
		width: 72px;
		height: 72px;
		border: none;
		box-shadow: 0 10px 20px rgba(6, 182, 212, 0.3);
	}

	.featured-glass-card:hover .featured-icon {
		transform: scale(1.05);
	}

	.featured-card-content {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.glass-btn-inline {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		background: white;
		color: #08051a;
		padding: 12px 24px;
		border-radius: 12px;
		font-weight: 600;
		transition: all 0.2s ease;
		align-self: flex-start;
		box-shadow: 0 4px 15px rgba(255,255,255,0.1);
	}

	.featured-glass-card:hover .glass-btn-inline {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(255,255,255,0.25);
	}

	@media (min-width: 900px) {
		.featured-card-content {
			flex-direction: row;
			align-items: center;
			gap: 40px;
		}

		.glass-btn-inline {
			align-self: center;
			white-space: nowrap;
		}
	}
</style>