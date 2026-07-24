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
	<title>Our Services | Adymade</title>
	<meta name="description" content="Explore Adymade's comprehensive services including AI & Automation, Development, Marketing, and GCC Expertise." />
</svelte:head>

<svelte:window onscroll={handleScroll} />

<!-- Liquid Glass Wrapper -->
<div class="relative min-h-screen overflow-hidden">

	<!-- Ambient Background Orbs -->
	<div class="admin-login-ambient-1" style="position: absolute; z-index: 0;"></div>
	<div class="admin-login-ambient-2" style="position: absolute; z-index: 0;"></div>

	<main class="relative z-10">
		<!-- Hero Section -->
		<section class="services-hero">
			<div class="container relative">
				<div class="hero-content text-center">
					<div class="eyebrow" style="justify-content: center; margin-bottom: 24px;">Our Capabilities</div>
					<h1 style="font-size: clamp(40px, 6vw, 64px); font-weight: 800; line-height: 1.1; margin-bottom: 24px; color: var(--theme-heading);">
						Transform Your Business with <br/><span class="grad">Next-Gen Solutions</span>
					</h1>
					<p style="font-size: 18px; color: var(--theme-text-secondary); max-width: 650px; margin: 0 auto 40px; line-height: 1.6;">
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
						<p>High-performance web and software engineering tailored to your requirements.</p>
					</div>
					<div class="services-grid">
						<a href="/web-development" class="glass-card">
							<div class="gc-icon"><Globe size={32} /></div>
							<h3>Web Development</h3>
							<p>Ultra-fast Next.js &amp; SvelteKit websites built for maximum conversions.</p>
							<span class="gc-link">Learn more <ArrowRight size={16} /></span>
						</a>
						<a href="/software-development" class="glass-card">
							<div class="gc-icon"><Settings2 size={32} /></div>
							<h3>Custom Software</h3>
							<p>Scalable SaaS platforms, custom internal tools &amp; enterprise portals.</p>
							<span class="gc-link">Learn more <ArrowRight size={16} /></span>
						</a>
					</div>
				</div>

				<!-- Marketing -->
				<div class="service-category" id="marketing-cat">
					<div class="category-header">
						<h2>Digital Marketing</h2>
						<p>Data-backed marketing strategies engineered to scale revenues.</p>
					</div>
					<div class="services-grid">
						<a href="/digital-marketing" class="glass-card">
							<div class="gc-icon"><TrendingUp size={32} /></div>
							<h3>Performance Marketing</h3>
							<p>ROI-focused Google Ads, Meta Ads &amp; funnel optimization.</p>
							<span class="gc-link">Learn more <ArrowRight size={16} /></span>
						</a>
						<a href="/seo-services" class="glass-card">
							<div class="gc-icon"><Search size={32} /></div>
							<h3>SEO Services</h3>
							<p>Organic search strategies to dominate SERPs and drive intent traffic.</p>
							<span class="gc-link">Learn more <ArrowRight size={16} /></span>
						</a>
					</div>
				</div>

				<!-- GCC Expertise -->
				<div class="service-category" id="gcc-cat">
					<div class="category-header">
						<h2>GCC Expertise</h2>
						<p>Specialized digital transformation services for the Gulf Region.</p>
					</div>

					<div class="glass-card featured-glass-card">
						<div class="featured-card-content">
							<div class="gc-icon featured-icon">
								<HardHat size={36} />
							</div>
							<div style="flex: 1;">
								<span class="eyebrow" style="margin-bottom: 12px;">Middle East Specialization</span>
								<h3 style="font-size: 26px; margin-bottom: 12px;">GCC Digital Transformation</h3>
								<p style="font-size: 16px; margin-bottom: 0;">
									Custom digital infrastructure, Arabic/English localized AI workflows, and compliance-ready enterprise solutions tailored for Saudi Arabia, UAE, and Qatar markets.
								</p>
							</div>
							<a href="/contact" class="btn btn-primary" style="align-self: center; white-space: nowrap;">
								Get Started <ArrowRight size={18} />
							</a>
						</div>
					</div>
				</div>

			</div>
		</section>

		<FinalCTA />
	</main>
</div>

<style>
	.services-hero {
		padding: 140px 0 60px;
		position: relative;
	}

	.cat-nav-sticky {
		position: sticky;
		top: 72px;
		z-index: 50;
		background: var(--theme-header-bg);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border-top: 1px solid var(--theme-border);
		border-bottom: 1px solid var(--theme-border);
		padding: 14px 0;
		margin-bottom: 32px;
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
		border: 1px solid var(--theme-border);
		background: transparent;
		color: var(--theme-text-secondary);
		font-size: 13px;
		font-weight: 500;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.2s ease;
		white-space: nowrap;
	}

	.cat-nav-btn:hover {
		border-color: var(--color-cyan);
		color: var(--theme-heading);
	}

	.cat-nav-btn.active {
		background: var(--color-electric, #5a14f0);
		border-color: var(--color-electric, #5a14f0);
		color: white !important;
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
		border-bottom: 1px solid var(--theme-border);
		padding-bottom: 24px;
	}

	.category-header h2 {
		font-size: 32px;
		font-weight: 700;
		color: var(--theme-heading);
		margin-bottom: 8px;
		letter-spacing: -0.02em;
	}

	.category-header p {
		font-size: 16px;
		color: var(--theme-text-secondary);
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

	.featured-glass-card {
		background: var(--theme-card-bg);
		border: 1px solid var(--theme-border-hover);
	}

	.featured-icon {
		background: linear-gradient(135deg, var(--color-electric), var(--color-cyan));
		color: white;
		width: 72px;
		height: 72px;
		border: none;
		box-shadow: 0 10px 20px rgba(6, 182, 212, 0.3);
	}

	.featured-card-content {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	@media (min-width: 900px) {
		.featured-card-content {
			flex-direction: row;
			align-items: center;
			gap: 40px;
		}
	}
</style>
