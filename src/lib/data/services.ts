export interface Service {
	icon: string; // Lucide icon component name
	title: string;
	description: string;
	href: string;
}

export const services: Service[] = [
	{
		icon: 'Bot',
		title: 'AI Automation & Agents',
		description:
			'Custom AI workflows, lead qualification bots, CRM automation, and intelligent agents that work 24/7 so your team doesn\'t have to.',
		href: '/ai-automation'
	},
	{
		icon: 'Clapperboard',
		title: 'AI Videos & Creatives',
		description:
			'Studio-quality AI videos, social content, and product creatives at 80% lower cost and 10× faster than traditional production.',
		href: '/ai-videos'
	},
	{
		icon: 'ClipboardCheck',
		title: 'Compliance Videos',
		description:
			'Safety training, onboarding, and regulatory compliance videos that meet ISO, NEBOSH, and GCC labor law requirements.',
		href: '/compliance-videos'
	},
	{
		icon: 'Globe',
		title: 'Web & App Development',
		description:
			'Performance-first websites and web apps built with modern frameworks — fast, accessible, SEO-ready, and conversion-focused.',
		href: '/web-development'
	},
	{
		icon: 'Settings2',
		title: 'Custom Software',
		description:
			'Bespoke internal tools, dashboards, ERPs, and automation platforms tailored exactly to your business processes.',
		href: '/software-development'
	},
	{
		icon: 'TrendingUp',
		title: 'Digital Marketing',
		description:
			'Full-funnel campaigns across Meta, Google, LinkedIn, and more — driven by data, creative strategy, and relentless optimisation.',
		href: '/digital-marketing'
	},
	{
		icon: 'Search',
		title: 'SEO Services',
		description:
			'Technical SEO, content strategy, and link building to dominate organic rankings in India, GCC, UK, and beyond.',
		href: '/digital-marketing#seo'
	},
	{
		icon: 'Sparkles',
		title: 'GEO — AI Search Ranking',
		description:
			'Generative Engine Optimisation to make your brand the answer that AI tools like ChatGPT, Gemini, and Perplexity recommend.',
		href: '/geo'
	}
];
