<script lang="ts">
	import {
		Bot, Clapperboard, ClipboardCheck, Globe, Settings2,
		TrendingUp, Search, Sparkles, ArrowRight
	} from 'lucide-svelte';
	import { services as fallbackServices } from '$lib/data/services';

	let { services = [] } = $props();

	// Use hardcoded services as fallback if database returned nothing
	const activeServices = $derived(services && services.length > 0 ? services : fallbackServices);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const iconMap: Record<string, any> = {
		Bot, Clapperboard, ClipboardCheck, Globe, Settings2,
		TrendingUp, Search, Sparkles
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const serviceMetaMap: Record<string, { icon: any; href: string }> = {
		'ai-automation-agents': { icon: Bot, href: '/ai-automation' },
		'ai-videos': { icon: Clapperboard, href: '/ai-videos' },
		'compliance-videos': { icon: ClipboardCheck, href: '/compliance-videos' },
		'web-app-development': { icon: Globe, href: '/web-development' },
		'custom-software': { icon: Settings2, href: '/software-development' },
		'digital-marketing': { icon: TrendingUp, href: '/digital-marketing' },
		'seo': { icon: Search, href: '/digital-marketing#seo' },
		'geo': { icon: Sparkles, href: '/geo' }
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
			{#each activeServices as svc}
				{@const slug = svc.slug}
				{@const meta = slug ? (serviceMetaMap[slug] || { icon: Bot, href: `/${slug}` }) : { icon: iconMap[svc.icon], href: svc.href }}
				{@const Icon = meta.icon}
				<a href={meta.href} class="svc-card">
					<div class="svc-icon">
						{#if Icon}
							<Icon size={28} />
						{/if}
					</div>
					<h3>{svc.title}</h3>
					<p>{svc.description || svc.short_description}</p>
					<span class="svc-arrow">Learn more <ArrowRight size={13} /></span>
				</a>
			{/each}
		</div>
	</div>
</section>


