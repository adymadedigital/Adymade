<script lang="ts">
	import {
		HardHat, HeartPulse, ShoppingCart, Lightbulb, Building2, Factory
	} from 'lucide-svelte';
	import { industries } from '$lib/data/industries';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const iconMap: Record<string, any> = {
		HardHat, HeartPulse, ShoppingCart, Lightbulb, Building2, Factory
	};

	// Duplicate list so the loop looks seamless
	const marqueeItems = [...industries, ...industries];
</script>

<section class="section">
	<div class="container">
		<div class="section-header">
			<div class="eyebrow">Industries</div>
			<h2>Industries We <span class="grad">Know Deeply</span></h2>
			<p>
				We understand your industry's specific challenges, regulations, and growth levers — not just
				the technology.
			</p>
		</div>
	</div>

	<div class="marquee-wrap">
		<div class="marquee-track">
			{#each marqueeItems as ind}
				{@const Icon = iconMap[ind.icon]}
				<a href={ind.href} class="ind-pill">
					{#if Icon}
						<Icon size={18} />
					{/if}
					{ind.label}
				</a>
			{/each}
		</div>
	</div>
</section>
