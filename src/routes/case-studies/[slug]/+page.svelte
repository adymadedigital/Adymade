<script lang="ts">
	import type { PageData } from './$types';
	import type { CaseStudyDB } from '$lib/supabase';
	import {
		ArrowLeft,
		ArrowRight,
		Building2,
		Layers,
		Wrench,
		Clock,
		CheckCircle2,
		Image as ImageIcon,
		Newspaper,
		ShieldAlert,
		Quote,
		Users,
		Images,
		HardHat
	} from 'lucide-svelte';
	import { base } from '$app/paths';

	let { data }: { data: PageData } = $props();
	let study: CaseStudyDB = $derived(data.study);

	// True when there are no content blocks other than under-construction
	let isUnderConstruction = $derived(
		!Array.isArray(study.content) ||
		study.content.length === 0 ||
		!study.content.some((b) => b.type !== 'under-construction')
	);

	let ucBlock = $derived(
		Array.isArray(study.content)
			? study.content.find((b) => b.type === 'under-construction')
			: null
	);
	let eta = $derived(ucBlock?.eta || 'Coming soon');

	let snapshot = $derived([
		{ label: 'Client', value: study.title.replace(/<\/?[^>]+(>|$)/g, ''), icon: Building2 },
		{ label: 'Industry', value: study.industry || 'Technology', icon: Wrench },
		{ label: 'Services', value: study.services ? study.services.join(' · ') : 'N/A', icon: Layers },
		{ label: 'Timeline', value: study.duration || 'N/A', icon: Clock }
	]);
</script>

<svelte:head>
	<title>{study.title.replace(/<\/?[^>]+(>|$)/g, '')} — Case Study | Adymade</title>
	<meta name="description" content={study.short_description || `How Adymade delivered results for ${study.title}`} />
</svelte:head>

<!-- Main wrapper dynamically theme-driven using CSS variables -->
	<main class="cs-page" style="
		--color-theme: {study.featured ? '#06b6d4' : '#a78bfa'};
		--color-theme-dark: {study.featured ? '#0891b2' : '#7c3aed'};
		--color-theme-gradient-start: {study.featured ? '#06b6d4' : '#a78bfa'};
		--color-theme-gradient-end: {study.featured ? '#0891b2' : '#7c3aed'};
		--color-theme-bg: {study.featured ? 'rgba(6, 182, 212, 0.03)' : 'rgba(139, 92, 246, 0.03)'};
		--color-theme-border: {study.featured ? 'rgba(6, 182, 212, 0.15)' : 'rgba(139, 92, 246, 0.15)'};
		--color-theme-card-hover: {study.featured ? 'rgba(6, 182, 212, 0.3)' : 'rgba(139, 92, 246, 0.3)'};
		--color-theme-pill-bg: {study.featured ? 'rgba(6, 182, 212, 0.04)' : 'rgba(255, 255, 255, 0.03)'};
		--color-theme-pill-border: {study.featured ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.08)'};
		--color-theme-icon-bg: {study.featured ? 'rgba(6, 182, 212, 0.1)' : 'rgba(139, 92, 246, 0.1)'};
		--color-theme-tag-bg: {study.featured ? 'rgba(6, 182, 212, 0.08)' : 'rgba(139, 92, 246, 0.08)'};
		--color-theme-tag-border: {study.featured ? 'rgba(6, 182, 212, 0.2)' : 'rgba(139, 92, 246, 0.2)'};
		--color-theme-testimonial-bg: {study.featured ? 'rgba(6, 182, 212, 0.04)' : 'rgba(139, 92, 246, 0.04)'};
		--color-theme-quote-icon: {study.featured ? 'rgba(6, 182, 212, 0.4)' : 'rgba(139, 92, 246, 0.4)'};
		--color-theme-btn-gradient-start: {study.featured ? '#0891b2' : '#7c3aed'};
		--color-theme-btn-gradient-end: {study.featured ? '#06b6d4' : '#5a14f0'};
	">
		<!-- Back link -->
		<div class="cs-back-bar">
			<div class="container">
				<a href="{base}/case-studies#studies" class="back-link">
					<ArrowLeft size={16} /> Back to Case Studies
				</a>
			</div>
		</div>

		<!-- Hero -->
		<section class="cs-hero">
			<div class="container">
				<span class="cs-badge">
					{study.badge || study.filter_category}
				</span>
				<h1>{study.title}</h1>
				<p class="cs-subtitle">{study.short_description}</p>

				{#if study.metrics && study.metrics.length > 0}
					<div class="metrics-row">
						{#each study.metrics as metric (metric.value)}
							<div class="metric-pill">
								<span class="mp-value">{metric.value}</span>
								<span class="mp-label">{metric.description}</span>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</section>

		{#if isUnderConstruction}
			<!-- Under Construction Block (Rendered by default when there is no detailed content blocks) -->
			<section class="uc-section">
				<div class="container">
					<div class="uc-card">
						<div class="uc-icon-wrap">
							<HardHat size={48} strokeWidth={1.5} />
						</div>
						<h2>Under Construction</h2>
						<p>
							We're crafting the full write-up for this case study — complete with process breakdowns,
							screenshots, and measurable outcomes. Check back soon!
						</p>
						<div class="uc-eta">
							<Clock size={14} />
							<span>{eta}</span>
						</div>
						<div style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap; justify-content: center;">
							<a href="/case-studies" class="btn-primary">← Back to Case Studies</a>
							<a href="/" class="btn-secondary">Return Home</a>
						</div>
					</div>
				</div>
			</section>
		{:else}
			<!-- Project Snapshot (Only visible if detailed content is available) -->
			<section class="section">
				<div class="container">
					<div class="snapshot-grid">
						{#each snapshot as item (item.label)}
							<div class="snapshot-item">
								<div class="snapshot-icon">
									<item.icon size={18} />
								</div>
								<div>
									<div class="snapshot-label">{item.label}</div>
									<div class="snapshot-value">{item.value}</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</section>

			<!-- Dynamic Content Blocks (Skip under-construction blocks as content is available) -->
			{#each (study.content || []).filter(b => b.type !== 'under-construction') as block, i (block.type + '-' + i)}
				{#if block.type === 'text'}
					<!-- Text Block -->
					<section class="section" class:alt-bg={block.altBg}>
						<div class="container narrow">
							{#if block.title}
								<h2>{block.title}</h2>
							{/if}
							{#each block.paragraphs || [] as p, i (i)}
								<p class="body-text">{p}</p>
							{/each}
						</div>
					</section>

				{:else if block.type === 'features-grid'}
					<!-- Features Grid Block -->
					<section class="section" class:alt-bg={block.altBg}>
						<div class="container">
							{#if block.title}
								<h2>{block.title}</h2>
							{/if}
							{#if block.intro}
								<p class="body-text intro">{block.intro}</p>
							{/if}
							<div class="feature-grid">
								{#each block.items || [] as s, i (i)}
									<div class="feature-card">
										<h3>{s.title}</h3>
										<p>{s.description}</p>
									</div>
								{/each}
							</div>
							{#if block.footnote}
								<p class="body-text foot-note">{block.footnote}</p>
							{/if}
						</div>
					</section>

				{:else if block.type === 'tags-list'}
					<!-- CMS / Tags List Block -->
					<section class="section" class:alt-bg={block.altBg}>
						<div class="container">
							{#if block.title}
								<h2>{block.title}</h2>
							{/if}
							{#if block.intro}
								<p class="body-text intro">{block.intro}</p>
							{/if}
							<div class="tag-cloud">
								{#each block.tags || [] as tag, i (i)}
									<span class="cms-tag">{tag}</span>
								{/each}
							</div>
							{#if block.notice}
								<div class="notice-box">
									<ShieldAlert size={16} />
									<span>{block.notice}</span>
								</div>
							{/if}
						</div>
					</section>

				{:else if block.type === 'key-improvements'}
					<!-- Key Improvements Checklists Block -->
					<section class="section" class:alt-bg={block.altBg}>
						<div class="container">
							{#if block.title}
								<h2>{block.title}</h2>
							{/if}
							<div class="improve-grid">
								{#each block.items || [] as item, i (i)}
									<div class="improve-item">
										<CheckCircle2 size={18} class="improve-check" />
										<span>{item}</span>
									</div>
								{/each}
							</div>
						</div>
					</section>

				{:else if block.type === 'showcase'}
					<!-- Screenshots Showcase Block -->
					<section class="section" class:alt-bg={block.altBg}>
						<div class="container">
							{#if block.title}
								<h2>{block.title}</h2>
							{/if}
							{#each block.sections || [] as sub, si (si)}
								<h3 class="showcase-subhead">
									{#if sub.type === 'web'}
										<ImageIcon size={16} />
									{:else}
										<Newspaper size={16} />
									{/if}
									{sub.heading}
								</h3>
								<div class="shot-grid">
									{#each sub.images || [] as labelOrUrl, ii (ii)}
										{#if labelOrUrl.startsWith('http://') || labelOrUrl.startsWith('https://') || labelOrUrl.startsWith('/')}
											<div class="shot-image-wrapper">
												<img src={labelOrUrl} alt={sub.heading} class="shot-img" />
											</div>
										{:else}
											<div class="shot-placeholder">
												<Images size={22} />
												<span>{labelOrUrl}</span>
											</div>
										{/if}
									{/each}
								</div>
							{/each}
							{#if block.notice}
								<div class="notice-box" style="margin-top: 2rem;">
									<ShieldAlert size={16} />
									<span>{block.notice}</span>
								</div>
							{/if}
						</div>
					</section>

				{:else if block.type === 'testimonial'}
					<!-- Client Testimonial Block -->
					<section class="section" class:alt-bg={block.altBg}>
						<div class="container narrow">
							<div class="testimonial-card">
								{#if block.pending}
									<span class="placeholder-tag">Placeholder — pending client approval</span>
								{/if}
								<Quote size={28} class="quote-icon" />
								<p class="testimonial-text">"{block.quote}"</p>
								<div class="testimonial-author">
									<Users size={16} />
									<span>{block.author} {block.role ? `· ${block.role}` : ''}</span>
								</div>
							</div>
						</div>
					</section>
				{/if}
			{/each}

			<!-- Bottom CTA (Only rendered if details are available) -->
			<section class="cta-section" style="background: linear-gradient(180deg, var(--color-theme-bg), transparent);">
				<div class="container narrow" style="text-align:center;">
					<h2>Need similar results for your business?</h2>
					<p class="body-text" style="margin-inline:auto;">
						Adymade builds complete custom systems with modern design, robust backend, CMS control,
						and AI automation — tailored to solve your business bottlenecks.
					</p>
					<div style="display: flex; gap: 1rem; justify-content: center; align-items: center; margin-top: 2rem; flex-wrap: wrap;">
						<a
							href="https://calendly.com/addymade/15-minute-consultation-call"
							class="btn-primary"
							target="_blank"
							rel="noopener"
						>
							Book a 15-Min Strategy Call <ArrowRight size={16} />
						</a>
						<a href="/case-studies" class="btn-secondary">
							← Back to Case Studies
						</a>
					</div>
				</div>
			</section>
		{/if}
	</main>

<style>
	.cs-page {
		background: var(--theme-bg);
		min-height: 100vh;
		color: var(--theme-text);
		font-family: inherit;
	}


	/* Back bar */
	.cs-back-bar {
		padding: 1.25rem 0;
		border-bottom: 1px solid var(--theme-border);
	}
	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: var(--theme-text-muted);
		font-size: 0.85rem;
		text-decoration: none;
		transition: color 0.2s;
	}
	.back-link:hover {
		color: var(--theme-heading);
	}

	/* Hero */
	.cs-hero {
		padding: 5rem 0 3.5rem;
		text-align: center;
	}
	.cs-badge {
		display: inline-block;
		padding: 0.35rem 1rem;
		border-radius: 999px;
		font-size: 0.78rem;
		letter-spacing: 0.04em;
		margin-bottom: 1.5rem;
		text-transform: uppercase;
		font-weight: 600;
		background: var(--color-theme-icon-bg);
		border: 1px solid var(--color-theme-border);
		color: var(--color-theme);
	}
	.cs-hero h1 {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 800;
		line-height: 1.15;
		margin: 0 auto 1.5rem;
		max-width: 800px;
		color: var(--theme-heading);
	}
	.cs-hero :global(.grad) {
		background: linear-gradient(135deg, #a78bfa, #7c3aed);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	.cs-hero :global(.grad-cyan) {
		background: linear-gradient(135deg, #06b6d4, #0891b2);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	.cs-subtitle {
		color: var(--theme-text-secondary);
		font-size: 1.15rem;
		max-width: 600px;
		margin: 0 auto 2.5rem;
		line-height: 1.6;
	}

	/* Metrics row */
	.metrics-row {
		display: flex;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
	}
	.metric-pill {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		background: var(--theme-card-bg);
		border: 1px solid var(--theme-card-border);
		border-radius: 14px;
		padding: 1.25rem 2rem;
		min-width: 140px;
	}
	.mp-value {
		font-size: 2rem;
		font-weight: 800;
		background: linear-gradient(135deg, var(--color-theme-gradient-start), var(--color-theme-gradient-end));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	.mp-label {
		font-size: 0.78rem;
		color: var(--theme-text-muted);
		text-align: center;
	}

	.container {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}
	.container.narrow {
		max-width: 760px;
	}

	/* Generic sections */
	.section {
		padding: 4rem 0;
	}
	.section.alt-bg {
		background: var(--color-theme-bg);
		border-block: 1px solid var(--theme-card-border);
	}
	.section h2 {
		font-size: clamp(1.5rem, 3vw, 2rem);
		font-weight: 700;
		margin: 0 0 1.5rem;
		color: var(--theme-heading);
	}
	.body-text {
		color: var(--theme-text-secondary);
		font-size: 1rem;
		line-height: 1.75;
		margin: 0 0 1.25rem;
	}
	.body-text.intro {
		max-width: 760px;
		font-size: 1.05rem;
	}
	.body-text.foot-note {
		margin-top: 1.75rem;
		font-size: 0.9rem;
		color: var(--theme-text-muted);
	}

	/* Project snapshot */
	.snapshot-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
	}
	.snapshot-item {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		background: var(--theme-card-bg);
		border: 1px solid var(--theme-card-border);
		border-radius: 12px;
		padding: 1rem 1.1rem;
	}
	.snapshot-icon {
		width: 34px;
		height: 34px;
		flex-shrink: 0;
		border-radius: 9px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-theme-icon-bg);
		color: var(--color-theme);
	}
	.snapshot-label {
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--theme-text-muted);
		margin-bottom: 0.2rem;
	}
	.snapshot-value {
		font-size: 0.9rem;
		font-weight: 600;
		line-height: 1.4;
		color: var(--theme-heading);
	}

	/* Feature grid (What Adymade Built) */
	.feature-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin-top: 2rem;
	}
	.feature-card {
		background: var(--theme-card-bg);
		border: 1px solid var(--theme-card-border);
		border-radius: 14px;
		padding: 1.5rem;
		transition: border-color 0.2s ease;
	}
	.feature-card:hover {
		border-color: var(--color-theme-card-hover) !important;
	}
	.feature-card h3 {
		font-size: 1.05rem;
		font-weight: 700;
		margin: 0 0 0.5rem;
		color: var(--color-theme);
	}
	.feature-card p {
		font-size: 0.9rem;
		color: var(--theme-text-secondary);
		line-height: 1.6;
		margin: 0;
	}

	/* CMS tag cloud */
	.tag-cloud {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		margin: 1.5rem 0 2rem;
	}
	.cms-tag {
		padding: 0.5rem 1rem;
		border-radius: 999px;
		color: var(--theme-heading);
		font-size: 0.85rem;
		font-weight: 500;
		background: var(--color-theme-tag-bg);
		border: 1px solid var(--color-theme-tag-border);
	}

	/* Problem / Solution */
	.prob-sol-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}
	.prob-sol-card {
		background: var(--theme-card-bg);
		border-radius: 16px;
		padding: 2rem;
		border: 1px solid var(--theme-card-border);
	}
	.prob-sol-card.prob {
		border-left: 3px solid #ef4444;
	}
	.prob-sol-card.sol {
		border-left: 3px solid #10b981;
	}
	.prob-sol-card h3 {
		font-size: 1.1rem;
		font-weight: 700;
		margin: 0 0 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--theme-heading);
	}
	.prob-sol-card.prob h3 {
		color: #ef4444;
	}
	.prob-sol-card.sol h3 {
		color: #10b981;
	}
	.prob-sol-card p {
		font-size: 0.95rem;
		line-height: 1.7;
		color: var(--theme-text-secondary);
		margin: 0;
	}

	/* Notice box */
	.notice-box {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		background: var(--theme-card-bg);
		border: 1px solid var(--theme-card-border);
		border-radius: 12px;
		padding: 0.9rem 1.1rem;
		font-size: 0.85rem;
		line-height: 1.5;
		margin-top: 1rem;
		color: var(--theme-text-secondary);
	}
	.notice-box :global(svg) {
		flex-shrink: 0;
		margin-top: 0.1rem;
	}

	/* Key improvements */
	.improve-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.9rem;
	}
	.improve-item {
		display: flex;
		align-items: flex-start;
		gap: 0.65rem;
		font-size: 0.92rem;
		color: var(--theme-text);
		line-height: 1.5;
	}


	/* Visual showcase */
	.showcase-subhead {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.95rem;
		font-weight: 700;
		color: var(--theme-heading);
		margin: 2rem 0 1rem;
	}
	.shot-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}
	.shot-placeholder {
		aspect-ratio: 16 / 10;
		border: 1px dashed var(--theme-card-border);
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		color: var(--theme-text-muted);
		font-size: 0.8rem;
		background: var(--theme-card-bg);
	}
	.shot-image-wrapper {
		aspect-ratio: 16 / 10;
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid var(--theme-card-border);
	}
	.shot-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s;
	}
	.shot-img:hover {
		transform: scale(1.03);
	}

	/* Testimonial */
	.testimonial-card {
		position: relative;
		border-radius: 20px;
		padding: 2.5rem;
		text-align: center;
		background: var(--theme-card-bg);
		border: 1px solid var(--theme-card-border);
	}
	.placeholder-tag {
		display: inline-block;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #fbbf24;
		background: rgba(251, 191, 36, 0.08);
		border: 1px solid rgba(251, 191, 36, 0.2);
		border-radius: 999px;
		padding: 0.25rem 0.75rem;
		margin-bottom: 1.25rem;
	}

	.testimonial-text {
		font-size: 1.1rem;
		line-height: 1.7;
		color: var(--theme-text);
		font-style: italic;
		margin: 0 0 1.25rem;
	}
	.testimonial-author {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.85rem;
		color: var(--theme-text-muted);
		font-weight: 600;
	}

	/* Under Construction */
	.uc-section {
		padding: 4rem 0 6rem;
	}
	.uc-card {
		max-width: 560px;
		margin: 0 auto;
		background: var(--theme-card-bg);
		border: 1px solid var(--theme-card-border);
		border-radius: 24px;
		padding: 3.5rem 2.5rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
	}
	.uc-icon-wrap {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background: var(--theme-icon-bg);
		border: 1px solid var(--theme-icon-border);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--theme-icon-color);
	}
	.uc-card h2 {
		font-size: 1.75rem;
		font-weight: 700;
		margin: 0;
		color: var(--theme-heading);
	}
	.uc-card p {
		color: var(--theme-text-secondary);
		font-size: 1rem;
		line-height: 1.7;
		margin: 0;
		max-width: 420px;
	}
	.uc-eta {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.35rem 1rem;
		border-radius: 999px;
		background: rgba(251, 191, 36, 0.08);
		border: 1px solid rgba(251, 191, 36, 0.2);
		color: #fbbf24;
		font-size: 0.8rem;
	}
	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 2rem;
		border-radius: 10px;
		background: linear-gradient(135deg, var(--color-theme-btn-gradient-start), var(--color-theme-btn-gradient-end));
		color: #fff;
		font-weight: 600;
		font-size: 0.9rem;
		text-decoration: none;
		transition: opacity 0.2s, transform 0.2s;
	}
	.btn-primary:hover {
		opacity: 0.88;
		transform: translateY(-2px);
	}
	.btn-secondary {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 2rem;
		border-radius: 10px;
		background: var(--theme-glass-bg);
		border: 1px solid var(--theme-card-border);
		color: var(--theme-heading);
		font-weight: 600;
		font-size: 0.9rem;
		text-decoration: none;
		transition: background-color 0.2s, transform 0.2s;
	}
	.btn-secondary:hover {
		background: var(--theme-glass-hover-bg);
		transform: translateY(-2px);
	}

	/* CTA */
	.cta-section {
		padding: 5rem 0 6rem;
		border-top: 1px solid var(--theme-border);
	}
	.cta-section h2 {
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		font-weight: 800;
		margin: 0 0 1rem;
		color: var(--theme-heading);
	}

	/* Responsive */
	@media (max-width: 900px) {
		.snapshot-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.feature-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.shot-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.improve-grid {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 560px) {
		.snapshot-grid {
			grid-template-columns: 1fr;
		}
		.feature-grid {
			grid-template-columns: 1fr;
		}
		.shot-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
