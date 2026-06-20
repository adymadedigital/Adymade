<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	import { caseStudies } from '$lib/data/caseStudies';
</script>

<section class="section section-alt">
	<div class="container">
		<div class="section-header">
			<div class="eyebrow">Proof, Not Promises</div>
			<h2>Real Businesses. <span class="grad">Measurable Results.</span></h2>
			<p>Every project we take on has a clear before-and-after. Here's the evidence.</p>
		</div>

		<div class="cases-grid">
			{#each caseStudies as cs}
				<a href={cs.href} class="case-card" style={cs.cardStyle ?? ''}>
					<span class="case-badge" style={cs.badgeStyle ?? ''}>{cs.badge}</span>
					<h3>{cs.title}</h3>
					<div class="metrics-list">
						{#each cs.metrics as metric}
							<div class="metric-row">
								<span class="m-val">{metric.value}</span>
								<span class="m-desc">{metric.description}</span>
							</div>
						{/each}
					</div>
					<span class="case-link" style={cs.linkStyle ?? ''}>
						Read full case study <ArrowRight size={13} />
					</span>
				</a>
			{/each}
		</div>
	</div>
</section>
