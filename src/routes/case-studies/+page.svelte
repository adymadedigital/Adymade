<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { ArrowRight, Clock, Loader2 } from 'lucide-svelte';
	import FAQ from '$lib/components/FAQ.svelte';
	import FinalCTA from '$lib/components/FinalCTA.svelte';
	import { supabase, type CaseStudyDB } from '$lib/supabase';

	let studies = $state<CaseStudyDB[]>([]);
	let loading = $state(true);

	const filters = ['All', 'AI & Automation', 'Development', 'Marketing'];
	let activeFilter = $state('All');

	const filteredStudies = $derived(
		activeFilter === 'All' ? studies : studies.filter((s) => s.filter_category === activeFilter)
	);

	const globalStats = [
		{ value: '50+', label: 'Projects Completed' },
		{ value: '95%', label: 'Client Retention' },
		{ value: '₹3L+', label: 'Revenue Recovered' },
		{ value: '3×', label: 'Average Efficiency Gain' }
	];

	const processSteps = [
		{ num: '01', name: 'Discover', desc: 'Deep-dive into your goals, pain points, and success metrics.' },
		{ num: '02', name: 'Research', desc: 'Audit your current setup and benchmark against best practices.' },
		{ num: '03', name: 'Strategy', desc: 'Build a custom roadmap with clear deliverables and timelines.' },
		{ num: '04', name: 'Execute', desc: 'Ship fast with weekly check-ins and zero scope creep.' },
		{ num: '05', name: 'Optimise', desc: 'Review data, iterate, and fine-tune for peak performance.' },
		{ num: '06', name: 'Grow', desc: "Scale what's working and build on the foundation we've laid." }
	];

	// ── Case study cards: scroll-scrubbed stacked-deck fan-out ──
	let cardRefs: HTMLElement[] = [];
	let cardProgress = $state<number[]>([]);

	function computeCardProgress(el: HTMLElement) {
		const rect = el.getBoundingClientRect();
		const vh = window.innerHeight;
		const start = vh * 0.95; // card just entering from bottom → 0
		const end = vh * 0.35;   // card reaching resting position → 1
		return Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
	}

	function updateCardProgress() {
		cardProgress = cardRefs.map((el) => (el ? computeCardProgress(el) : 0));
	}

	// ── Process section: pinned scroll-scrubbed stack ──
	let processPinEl: HTMLElement;
	let sectionProgress = $state(0);

	function computeSectionProgress() {
		if (!processPinEl) return 0;
		const rect = processPinEl.getBoundingClientRect();
		const vh = window.innerHeight;
		const total = rect.height - vh; // scrollable distance while pinned
		if (total <= 0) return 0;
		const scrolled = Math.min(Math.max(-rect.top, 0), total);
		return scrolled / total;
	}

	// ── Shared scroll loop ──
	let rafId = 0;
	function updateAll() {
		updateCardProgress();
		sectionProgress = computeSectionProgress();
	}
	function onScroll() {
		if (rafId) return;
		rafId = requestAnimationFrame(() => {
			updateAll();
			rafId = 0;
		});
	}

	onMount(async () => {
		try {
			const { data, error } = await supabase
				.from('case_studies')
				.select('*')
				.eq('published', true)
				.order('sort_order', { ascending: true });

			if (!error && data) {
				studies = data as CaseStudyDB[];
			}
		} catch (e) {
			console.error('Error fetching case studies:', e);
		} finally {
			loading = false;
			await tick();
			updateAll();
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});

	// re-measure card positions whenever the filtered list changes (cards re-mount)
	$effect(() => {
		const _unused = filteredStudies;
		tick().then(updateCardProgress);
	});
</script>

<svelte:head>
	<title>Case Studies | Adymade — Real Results for Real Businesses</title>
	<meta
		name="description"
		content="Explore Adymade case studies — real client results across AI automation, web development, and digital marketing. See the measurable impact behind every project."
	/>
	<meta property="og:title" content="Case Studies | Adymade" />
	<meta
		property="og:description"
		content="Real results from real projects. See how Adymade delivers measurable impact for businesses across India, GCC, and beyond."
	/>
	<meta property="og:type" content="website" />
</svelte:head>

<main class="cs-page">
	<!-- 1. HERO -->
	<section class="cs-page-hero">
		<div class="container">
			<div class="cs-hero-inner">
				<div class="eyebrow">Proof, Not Promises</div>
				<h1>
					Real Results for<br />
					<span class="grad">Real Businesses</span>
				</h1>
				<p class="cs-hero-desc">
					Explore how we've helped businesses increase efficiency, generate leads, and scale revenue
					through precise AI automation, web development, and digital strategy.
				</p>
				<div class="cs-hero-actions">
					<a href="#studies" class="btn btn-primary">
						View Case Studies <ArrowRight size={16} />
					</a>
					<a
						href="https://calendly.com/addymade/15-minute-consultation-call"
						class="btn btn-ghost"
						target="_blank"
						rel="noopener"
					>
						Book a Consultation
					</a>
				</div>
				<div class="cs-trust-strip">
					<span class="cs-trust-item">
						<span class="cs-trust-dot" aria-hidden="true"></span>50+ Projects Delivered
					</span>
					<span class="cs-trust-item">
						<span class="cs-trust-dot" aria-hidden="true"></span>India · GCC · UK
					</span>
					<span class="cs-trust-item">
						<span class="cs-trust-dot" aria-hidden="true"></span>95% Client Retention
					</span>
				</div>
			</div>
		</div>
	</section>

	<!-- 2. STUDIES SECTION — sticky filter lives inside so it un-sticks once the list ends -->
	<section id="studies" class="cs-featured cs-studies-wrap" aria-label="Case studies">
		<div class="container">
			<div class="cs-filter-section" aria-label="Filter case studies">
				<div class="cs-filter-top">
					<div class="cs-filter-bar" role="group" aria-label="Filter by category">
						{#each filters as f (f)}
							<button
								class="cs-filter-btn"
								class:active={activeFilter === f}
								onclick={() => (activeFilter = f)}
								aria-pressed={activeFilter === f}
							>
								{f}
							</button>
						{/each}
					</div>
				</div>
			</div>

			<div class="cs-studies-list">
				{#if loading}
					<div style="display: flex; justify-content: center; padding: 6rem 0;">
						<Loader2 class="animate-spin" size={40} style="color: #06b6d4;" />
					</div>
				{:else}
					{#each filteredStudies as study, i (study.id)}
						{@const p = cardProgress[i] ?? 0}
						{@const dir = i % 2 === 0 ? -1 : 1}
						<div
							class="cs-featured-card"
							class:cs-opposite={i % 2 === 1}
							bind:this={cardRefs[i]}
							style="
								opacity: {Math.max(p, 0.001)};
								transform:
									translateY({(1 - p) * 70}px)
									translateX({dir * (1 - p) * 90}px)
									rotate({dir * (1 - p) * 14}deg)
									scale({0.9 + p * 0.1});
								z-index: {Math.min(1 + i, 100)};
							"
						>
							<!-- Left: info -->
							<div class="cs-featured-left">
								<span class="cs-featured-tag">{study.industry}</span>
								<h2 class="cs-featured-title">{@html study.title}</h2>
								<p class="cs-featured-desc">{study.short_description}</p>

								{#if study.metrics && study.metrics.length > 0}
									<div class="cs-featured-metrics-left">
										{#each study.metrics as metric (metric.description)}
											<div class="cs-feat-metric-left">
												<div class="cs-feat-metric-val">{metric.value}</div>
												<div class="cs-feat-metric-desc">{metric.description}</div>
											</div>
										{/each}
									</div>
								{/if}

								<div class="cs-featured-services">
									{#each study.services || [] as svc (svc)}
										<span class="cs-service-tag">{svc}</span>
									{/each}
									{#if study.duration}
										<span class="cs-service-tag">
											<Clock size={11} aria-hidden="true" />{study.duration}
										</span>
									{/if}
								</div>
								<a href="/case-studies/{study.slug}" class="btn btn-primary" style="align-self: flex-start;">
									Read Full Case Study <ArrowRight size={16} />
								</a>
							</div>

							<!-- Right: mockup image side -->
							<div class="cs-featured-right-mockup">
								<div class="cs-mockup-wrapper">
									<img src={study.hero_image} alt={study.title.replace(/<\/?[^>]+(>|$)/g, '')} class="cs-mockup-img" loading="lazy" />
								</div>
							</div>
						</div>
					{/each}

					{#if filteredStudies.length === 0}
						<div class="cs-empty" role="status">
							<p>No case studies found for this filter. More coming soon!</p>
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</section>

	<!-- 3. GLOBAL SUCCESS METRICS BAND -->
	<section class="cs-stats" aria-label="Company-wide results">
		<div class="container">
			<div class="cs-stats-grid">
				{#each globalStats as stat (stat.label)}
					<div class="cs-stat">
						<div class="cs-stat-value">
							<span class="grad">{stat.value}</span>
						</div>
						<div class="cs-stat-label">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- 4. PROCESS SECTION — pinned scroll-scrubbed stack -->
	<section class="section cs-process-pin" bind:this={processPinEl} aria-label="Our process">
		<div class="cs-process-sticky">
			<div class="container">
				<div class="section-header">
					<div class="eyebrow">How We Work</div>
					<h2>Our Proven <span class="grad">6-Step Process</span></h2>
					<p>
						Every project follows the same disciplined process — so you always know where we are and
						what's coming next.
					</p>
				</div>

				<div class="cs-process-grid">
					{#each processSteps as step, i (step.num)}
						{@const windowSize = 1 / processSteps.length}
						{@const localRaw = (sectionProgress - i * windowSize) / windowSize}
						{@const local = Math.min(Math.max(localRaw, 0), 1)}
						{@const depth = (i % 2 === 0 ? 1 : -1) * (1 - local) * 14}
						<div
							class="cs-process-step"
							style="
								opacity: {local};
								transform: translateY({(1 - local) * 70}px) translateX({depth}px) scale({0.9 + local * 0.1});
							"
						>
							<div class="cs-process-num">{step.num}</div>
							<div class="cs-process-name">{step.name}</div>
							<div class="cs-process-desc">{step.desc}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- 5. FAQ -->
	<FAQ />

	<!-- 6. FINAL CTA -->
	<FinalCTA />
</main>

<style>
	.cs-studies-wrap {
		position: relative;
	}
	.cs-filter-section {
		position: sticky;
		top: 5.5rem; /* adjust to sit just below your header */
		z-index: 150;
		padding-block: 0.75rem;
	}

	.cs-featured-card {
		will-change: transform, opacity;
	}

	.cs-process-pin {
		position: relative;
		height: 250vh; /* scroll runway — tune for pace */
	}
	.cs-process-sticky {
		position: sticky;
		top: 0;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;
	}
	.cs-process-step {
		will-change: transform, opacity;
	}

	@media (prefers-reduced-motion: reduce) {
		.cs-featured-card,
		.cs-process-step {
			opacity: 1 !important;
			transform: none !important;
		}
	}
</style>