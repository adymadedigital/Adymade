<script lang="ts">
	import {
		Bot, Clapperboard, ClipboardCheck, Globe, Settings2,
		TrendingUp, Search, Sparkles, ArrowRight
	} from 'lucide-svelte';
	import { services } from '$lib/data/services';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const iconMap: Record<string, any> = {
		Bot, Clapperboard, ClipboardCheck, Globe, Settings2,
		TrendingUp, Search, Sparkles
	};
</script>

<section class="section" id="services">
	<div class="container">
		<div class="section-header">
			<div class="eyebrow">What We Do</div>
			<h2>Everything Your Business Needs to<br /><span class="grad">Compete in the AI Era</span></h2>
			<p>Eight services. One team. Zero hand-offs. We build your entire digital and AI growth engine.</p>
		</div>

		<div class="services-grid">
			{#each services as svc}
				{@const Icon = iconMap[svc.icon]}
				<a href={svc.href} class="svc-card">
					<div class="svc-icon">
						{#if Icon}
							<Icon size={24} />
						{/if}
					</div>
					<h3>{svc.title}</h3>
					<p>{svc.description}</p>
					<span class="svc-arrow">Learn more <ArrowRight size={13} /></span>
				</a>
			{/each}
		</div>
	</div>
</section>
