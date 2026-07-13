export interface BlogPost {
	slug: string;
	title: string;
	category: string;
	excerpt: string;
	image: string;
	date: string;
	readTime: string;
	featured?: boolean;
}

export interface BlogCategory {
	name: string;
	count: number;
}


// dummy/placeholder data


export const blogPosts: BlogPost[] = [
	{
		slug: 'lead-response-time-ai-automation',
		title: "How We Cut a Client's Lead Response Time From 8 Hours to 30 Minutes",
		category: 'AI Automation',
		excerpt:
			"Every sales team knows the pain of a lead going cold overnight. Here's the exact AI automation stack we built — from WhatsApp intake to CRM routing.",
		image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=80',
		date: 'Jul 6, 2026',
		readTime: '7 min read',
		featured: true
	},
	{
		slug: 'ai-video-vs-traditional-production',
		title: 'AI Video vs Traditional Production: What Actually Changes at 80% Less Cost',
		category: 'AI Video',
		excerpt:
			'A breakdown of where AI video genuinely saves money — and the two stages where a human editor still matters.',
		image: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=600&q=80',
		date: 'Jul 2, 2026',
		readTime: '5 min read'
	},
	{
		slug: 'website-costing-you-enterprise-clients',
		title: '7 Signs Your Website Is Costing You Enterprise Clients',
		category: 'Web Development',
		excerpt:
			"Slow load times and generic templates read as risk to a procurement team. Here's what to fix first.",
		image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=600&q=80',
		date: 'Jun 29, 2026',
		readTime: '6 min read'
	},
	{
		slug: 'geo-101-ai-overviews',
		title: 'GEO 101: Getting Your Brand Cited Inside ChatGPT & AI Overviews',
		category: 'SEO & GEO',
		excerpt:
			"Ranking in Google isn't enough anymore. How we structure content to get picked up by AI answer engines.",
		image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=600&q=80',
		date: 'Jun 25, 2026',
		readTime: '8 min read'
	},
	{
		slug: 'build-vs-buy-custom-software',
		title: "Build vs Buy: A Founder's Framework for Custom Software Decisions",
		category: 'Software Dev',
		excerpt:
			'Not every workflow needs a bespoke build. A simple checklist we walk every client through before quoting.',
		image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
		date: 'Jun 20, 2026',
		readTime: '4 min read'
	},
	{
		slug: 'compliance-video-marketing',
		title: 'Compliance Video Marketing: What Regulated Industries Get Wrong',
		category: 'Digital Marketing',
		excerpt:
			'Pharma, finance and healthcare brands can still make scroll-stopping video — inside the guardrails.',
		image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80',
		date: 'Jun 17, 2026',
		readTime: '5 min read'
	},
	{
		slug: 'ai-agents-mid-size-business-2026',
		title: '5 AI Agents Every Mid-Size Business Should Deploy in 2026',
		category: 'AI Automation',
		excerpt:
			'From inbox triage to invoice reconciliation — the agents delivering ROI inside 30 days, not 6 months.',
		image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80',
		date: 'Jun 9, 2026',
		readTime: '6 min read'
	}
];

export const blogCategories: BlogCategory[] = [
	{ name: 'All Topics', count: 48 },
	{ name: 'AI Automation', count: 14 },
	{ name: 'AI Video Production', count: 9 },
	{ name: 'Web Development', count: 8 },
	{ name: 'Software Development', count: 6 },
	{ name: 'SEO & GEO', count: 7 },
	{ name: 'Digital Marketing', count: 4 }
];

export const blogTags: string[] = [
	'AI Agents',
	'Lead Gen',
	'Video Ads',
	'SaaS',
	'ChatGPT SEO',
	'Compliance'
];