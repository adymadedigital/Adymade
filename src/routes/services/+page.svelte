<script lang="ts">
	import { Bot, Clapperboard, ClipboardCheck, Globe, Settings2, TrendingUp, Search, Sparkles, HardHat, ArrowRight } from 'lucide-svelte';
	import FinalCTA from '$lib/components/FinalCTA.svelte';
</script>

<svelte:head>
	<title>Our Services | Adymade CMS</title>
	<meta name="description" content="Explore Adymade's comprehensive services including AI & Automation, Development, Marketing, and GCC Expertise." />
</svelte:head>

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

		<!-- Services Grid -->
		<section class="section pt-0">
			<div class="container">
				
				<!-- AI & Automation -->
				<div class="service-category">
					<div class="category-header">
						<h2>AI &amp; Automation</h2>
						<p>Intelligent solutions to streamline operations and scale your brand.</p>
					</div>
					<div class="services-grid">
						<a href="/ai-automation" class="glass-card">
							<div class="gc-icon"><Bot size={24} /></div>
							<h3>AI Automation &amp; Agents</h3>
							<p>Deploy intelligent, autonomous AI agents capable of handling complex customer service, lead qualification, and data processing. We build custom workflows that seamlessly integrate with your existing CRM and tech stack to reduce manual labor and scale your productivity 10x.</p>
							<span class="gc-link">Learn more <ArrowRight size={16} /></span>
						</a>
						<a href="/ai-videos" class="glass-card">
							<div class="gc-icon"><Clapperboard size={24} /></div>
							<h3>AI Videos &amp; Creatives</h3>
							<p>Leverage the power of generative AI to produce high-converting, personalized video creatives at scale. From engaging short-form TikTok/Reels content to highly targeted ad creatives, we reduce production costs while driving massive engagement and ROI.</p>
							<span class="gc-link">Learn more <ArrowRight size={16} /></span>
						</a>
						<a href="/compliance-videos" class="glass-card">
							<div class="gc-icon"><ClipboardCheck size={24} /></div>
							<h3>Compliance Videos</h3>
							<p>Turn dry, text-heavy regulatory manuals into engaging, easy-to-understand compliance training videos. We use AI avatars and voiceovers to quickly localize and update content, ensuring your workforce stays compliant across all global offices with zero production delays.</p>
							<span class="gc-link">Learn more <ArrowRight size={16} /></span>
						</a>
						<a href="/geo" class="glass-card">
							<div class="gc-icon"><Sparkles size={24} /></div>
							<h3>GEO — AI Search</h3>
							<p>Generative Engine Optimization (GEO) is the future of search. We optimize your brand's digital presence so you rank natively as the top recommended solution inside AI platforms like ChatGPT, Claude, and Google Gemini. Capture intent before your competitors do.</p>
							<span class="gc-link">Learn more <ArrowRight size={16} /></span>
						</a>
					</div>
				</div>

				<!-- Development -->
				<div class="service-category">
					<div class="category-header">
						<h2>Development</h2>
						<p>Robust, scalable, and high-performance digital infrastructure.</p>
					</div>
					<div class="services-grid">
						<a href="/web-development" class="glass-card">
							<div class="gc-icon"><Globe size={24} /></div>
							<h3>Web &amp; App Development</h3>
							<p>End-to-end development of lightning-fast websites and custom web applications. We utilize modern frameworks to deliver exceptional user experiences, robust backend architecture, and seamless API integrations optimized for high traffic.</p>
							<span class="gc-link">Learn more <ArrowRight size={16} /></span>
						</a>
						<a href="/software-development" class="glass-card">
							<div class="gc-icon"><Settings2 size={24} /></div>
							<h3>Custom Software</h3>
							<p>Bespoke enterprise software designed to solve your most complex operational bottlenecks. From custom SaaS platforms to internal ERP systems, we engineer scalable, secure, and maintainable software that acts as the backbone of your digital infrastructure.</p>
							<span class="gc-link">Learn more <ArrowRight size={16} /></span>
						</a>
					</div>
				</div>

				<!-- Marketing -->
				<div class="service-category">
					<div class="category-header">
						<h2>Marketing</h2>
						<p>Data-driven strategies to dominate your market and capture intent.</p>
					</div>
					<div class="services-grid">
						<a href="/digital-marketing" class="glass-card">
							<div class="gc-icon"><TrendingUp size={24} /></div>
							<h3>Digital Marketing</h3>
							<p>Omnichannel performance marketing focused strictly on ROI. We design and execute aggressive campaigns across Google Ads, Meta Ads, and LinkedIn to capture high-intent leads, nurture prospects through automated funnels, and maximize your customer lifetime value.</p>
							<span class="gc-link">Learn more <ArrowRight size={16} /></span>
						</a>
						<a href="/digital-marketing#seo" class="glass-card">
							<div class="gc-icon"><Search size={24} /></div>
							<h3>SEO Services</h3>
							<p>Dominate search engine results pages with our technical and content-driven SEO strategies. We conduct deep technical audits, build high-authority backlinks, and write intent-optimized content to ensure your brand captures sustainable, organic traffic long-term.</p>
							<span class="gc-link">Learn more <ArrowRight size={16} /></span>
						</a>
					</div>
				</div>

				<!-- GCC Expertise -->
				<div class="service-category">
					<div class="category-header">
						<h2>GCC Expertise</h2>
						<p>Specialized enterprise solutions for the Middle East market.</p>
					</div>
					<div class="services-grid" style="grid-template-columns: 1fr;">
						<a href="/case-studies/rgs-saudi-arabia" class="glass-card featured-glass-card">
							<div class="featured-card-content">
								<div class="gc-icon featured-icon">
									<HardHat size={32} color="white" />
								</div>
								<div style="flex: 1;">
									<h3 style="font-size: 24px; margin-bottom: 12px;">🇸🇦 RGS — Tamimi Group</h3>
									<p style="font-size: 16px; margin-bottom: 0;">A comprehensive digital transformation and enterprise website rebuild for a leading Tamimi Group scaffolding company in Saudi Arabia. This project focused on ensuring strict corporate compliance, establishing a commanding digital presence, and building a robust B2B lead generation engine capable of showcasing massive infrastructural capabilities across the Middle East.</p>
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
		padding: 140px 0 60px;
		position: relative;
	}

	.service-category {
		margin-bottom: 80px;
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
		width: 56px;
		height: 56px;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01));
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 16px;
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
		font-size: 22px;
		font-weight: 700;
		color: white;
		margin-bottom: 16px;
		letter-spacing: -0.01em;
	}

	.glass-card p {
		font-size: 15px;
		color: rgba(255, 255, 255, 0.65);
		line-height: 1.7;
		margin-bottom: 32px;
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
