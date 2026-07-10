<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	import type { CaseStudyDB } from '$lib/supabase';

	interface Props {
		studies: Pick<CaseStudyDB, 'id' | 'slug' | 'title' | 'badge' | 'filter_category' | 'metrics' | 'featured'>[];
	}

	let { studies }: Props = $props();

	function getStudyStyles(cs: Props['studies'][number]) {
		if (cs.featured) {
			return {
				card: 'border-color:rgba(6,182,212,0.3)',
				badge: 'background:rgba(6,182,212,0.1);border-color:rgba(6,182,212,0.25);color:#06b6d4',
				link: 'color:#06b6d4'
			};
		}
		return { card: '', badge: '', link: '' };
	}
</script>

<section class="section section-alt">
	<div class="container">
		<div class="section-header">
			<div class="eyebrow">Proof, Not Promises</div>
			<h2>Real Businesses. <span class="grad">Measurable Results.</span></h2>
			<p>Every project we take on has a clear before-and-after. Here's the evidence.</p>
		</div>

		{#if studies.length === 0}
			<div class="cs-empty-state">
				<p>No case studies published yet.</p>
			</div>
		{:else}
			<div class="cases-grid">
				{#each studies as cs (cs.id)}
					{@const styles = getStudyStyles(cs)}
					<a href="/case-studies/{cs.slug}" class="case-card" style={styles.card}>
						<span class="case-badge" style={styles.badge}>{cs.badge || cs.filter_category}</span>
						<h3>{cs.title}</h3>
						<div class="metrics-list">
							{#each cs.metrics || [] as metric (metric.value)}
								<div class="metric-row">
									<span class="m-val">{metric.value}</span>
									<span class="m-desc">{metric.description}</span>
								</div>
							{/each}
						</div>
						<span class="case-link" style={styles.link}>
							Read full case study <ArrowRight size={13} />
						</span>
					</a>
				{/each}
			</div>

			<div class="see-more-wrap">
				<a href="/case-studies" class="btn btn-primary">
					See More Case Studies <ArrowRight size={16} />
				</a>
			</div>
		{/if}
	</div>
</section>

<style>
	.cs-empty-state {
		text-align: center;
		padding: 4rem 1.5rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px dashed rgba(255, 255, 255, 0.1);
		border-radius: 16px;
		color: rgba(255, 255, 255, 0.45);
		font-size: 0.95rem;
	}

	.see-more-wrap {
		display: flex;
		justify-content: center;
		margin-top: 3.5rem;
	}
</style>
