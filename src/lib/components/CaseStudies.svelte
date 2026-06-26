<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight } from 'lucide-svelte';
	import { supabase, type CaseStudyDB } from '$lib/supabase';
	import { caseStudies as staticFallback } from '$lib/data/caseStudies';

	// ── Data ─────────────────────────────────────────────────────────────────
	let studies = $state<CaseStudyDB[]>([]);
	let loading = $state(true);

	onMount(async () => {
		const { data, error } = await supabase
			.from('case_studies')
			.select('*')
			.order('created_at', { ascending: true });

		if (!error && data && data.length > 0) {
			studies = data as CaseStudyDB[];
		} else {
			// Graceful fallback to static data
			studies = staticFallback.map((cs, i) => ({
				id: String(i),
				badge: cs.badge,
				title: cs.title,
				href: cs.href,
				metrics: cs.metrics,
				badge_style: cs.badgeStyle,
				link_style: cs.linkStyle,
				card_style: cs.cardStyle,
				featured: cs.featured
			}));
		}
		loading = false;
	});

	// Carousel: duplicate the list so the loop is seamless
	let carousel = $derived(studies.length > 3 ? [...studies, ...studies] : studies);
	let useCarousel = $derived(studies.length > 3);
</script>

<section class="section section-alt">
	<div class="container">
		<div class="section-header">
			<div class="eyebrow">Proof, Not Promises</div>
			<h2>Real Businesses. <span class="grad">Measurable Results.</span></h2>
			<p>Every project we take on has a clear before-and-after. Here's the evidence.</p>
		</div>

		{#if loading}
			<!-- Skeleton shimmer -->
			<div class="cases-grid">
				{#each [1, 2, 3] as _}
					<div class="case-card skeleton-card">
						<div class="sk-badge"></div>
						<div class="sk-title"></div>
						<div class="sk-line"></div>
						<div class="sk-line short"></div>
						<div class="sk-line"></div>
					</div>
				{/each}
			</div>

		{:else if useCarousel}
			<!-- ── Infinite marquee carousel ── -->
			<div class="cs-track-outer" aria-label="Case studies carousel">
				<div class="cs-track">
					{#each carousel as cs (cs.id + '-' + Math.random())}
						<a
							href={cs.href}
							class="case-card cs-carousel-card"
							style={cs.card_style ?? ''}
							tabindex="-1"
							aria-hidden="true"
						>
							<span class="case-badge" style={cs.badge_style ?? ''}>{cs.badge}</span>
							<h3>{cs.title}</h3>
							<div class="metrics-list">
								{#each cs.metrics as metric}
									<div class="metric-row">
										<span class="m-val">{metric.value}</span>
										<span class="m-desc">{metric.description}</span>
									</div>
								{/each}
							</div>
							<span class="case-link" style={cs.link_style ?? ''}>
								Read full case study <ArrowRight size={13} />
							</span>
						</a>
					{/each}
				</div>
			</div>

		{:else}
			<!-- ── Static grid (≤ 3 cards) ── -->
			<div class="cases-grid">
				{#each studies as cs (cs.id)}
					<a href={cs.href} class="case-card" style={cs.card_style ?? ''}>
						<span class="case-badge" style={cs.badge_style ?? ''}>{cs.badge}</span>
						<h3>{cs.title}</h3>
						<div class="metrics-list">
							{#each cs.metrics as metric}
								<div class="metric-row">
									<span class="m-val">{metric.value}</span>
									<span class="m-desc">{metric.description}</span>
								</div>
							{/each}
						</div>
						<span class="case-link" style={cs.link_style ?? ''}>
							Read full case study <ArrowRight size={13} />
						</span>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	/* ── Carousel wrapper ─────────────────────────────── */
	.cs-track-outer {
		overflow: hidden;
		/* Fade edges */
		-webkit-mask-image: linear-gradient(
			to right,
			transparent 0%,
			black 8%,
			black 92%,
			transparent 100%
		);
		mask-image: linear-gradient(
			to right,
			transparent 0%,
			black 8%,
			black 92%,
			transparent 100%
		);
	}

	.cs-track {
		display: flex;
		gap: 24px;
		width: max-content;
		animation: cs-marquee 40s linear infinite;
	}

	/* Pause on hover */
	.cs-track-outer:hover .cs-track {
		animation-play-state: paused;
	}

	@keyframes cs-marquee {
		0%   { transform: translateX(0); }
		100% { transform: translateX(-50%); }
	}

	/* ── Carousel card sizing ─────────────────────────── */
	.cs-carousel-card {
		width: 340px;
		flex-shrink: 0;
	}

	/* ── Skeleton shimmer ─────────────────────────────── */
	.skeleton-card {
		pointer-events: none;
	}

	.sk-badge,
	.sk-title,
	.sk-line {
		background: linear-gradient(
			90deg,
			rgba(255 255 255 / 0.06) 25%,
			rgba(255 255 255 / 0.12) 50%,
			rgba(255 255 255 / 0.06) 75%
		);
		background-size: 200% 100%;
		animation: shimmer 1.6s infinite;
		border-radius: 6px;
		margin-bottom: 12px;
	}
	.sk-badge  { width: 140px; height: 24px; }
	.sk-title  { width: 80%;   height: 28px; margin-bottom: 20px; }
	.sk-line   { width: 100%;  height: 16px; }
	.sk-line.short { width: 60%; }

	@keyframes shimmer {
		0%   { background-position: 200% 0; }
		100% { background-position: -200% 0; }
	}
</style>
