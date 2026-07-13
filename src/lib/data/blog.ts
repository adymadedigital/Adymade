export interface BlogPost {
	slug: string;
	title: string;
	category: string;
	excerpt: string;
	image: string;
	date: string;
	readTime: string;
	featured?: boolean;
	content?: string[];
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
		image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
		date: 'Jul 6, 2026',
		readTime: '7 min read',
		featured: true,
		content: [
			'Every sales team knows the pain of a lead going cold overnight. A prospect fills a form at 11pm, and by the time someone from the sales team replies the next morning, they have already spoken to two competitors.',
			'This is the exact problem one of our clients came to us with. Their average first-response time was sitting at 8 hours — mostly because leads sat in an inbox until someone manually checked it.',
			'We rebuilt the intake flow end to end: WhatsApp and web form submissions now route directly into an automation layer that qualifies the lead, drafts a personalised reply, and pings the right sales rep — all within minutes.',
			'The result was a drop from 8 hours to under 30 minutes average response time, and a measurable increase in lead-to-call conversion within the first month.'
		]
	},
	{
		slug: 'ai-video-vs-traditional-production',
		title: 'AI Video vs Traditional Production: What Actually Changes at 80% Less Cost',
		category: 'AI Video',
		excerpt:
			'A breakdown of where AI video genuinely saves money — and the two stages where a human editor still matters.',
		image: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=1200&q=80',
		date: 'Jul 2, 2026',
		readTime: '5 min read',
		content: [
			'AI video production has moved from novelty to a genuine line item on marketing budgets. But "80% cheaper" only tells half the story.',
			'The real savings come from cutting out the pre-production cycle — no location scouting, no actor scheduling, no reshoots for a single line change.',
			'Where a human editor still matters is in the final pass: pacing, emotional beats, and making sure the output does not feel uncanny. We keep that stage human on every project.'
		]
	},
	{
		slug: 'website-costing-you-enterprise-clients',
		title: '7 Signs Your Website Is Costing You Enterprise Clients',
		category: 'Web Development',
		excerpt:
			"Slow load times and generic templates read as risk to a procurement team. Here's what to fix first.",
		image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80',
		date: 'Jun 29, 2026',
		readTime: '6 min read',
		content: [
			'Enterprise procurement teams judge a vendor long before the sales call — and your website is usually the first impression.',
			'Slow load times, a generic template, and missing case studies all read as risk signals to someone deciding whether to trust you with a six-figure contract.',
			'Here are the seven things we audit first on any client site before a major B2B push, starting with load speed and mobile responsiveness.'
		]
	},
	{
		slug: 'geo-101-ai-overviews',
		title: 'GEO 101: Getting Your Brand Cited Inside ChatGPT & AI Overviews',
		category: 'SEO & GEO',
		excerpt:
			"Ranking in Google isn't enough anymore. How we structure content to get picked up by AI answer engines.",
		image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=1200&q=80',
		date: 'Jun 25, 2026',
		readTime: '8 min read',
		content: [
			'Ranking on page one of Google used to be the finish line. Now, a growing share of searches end inside an AI answer — ChatGPT, Perplexity, Google AI Overviews — before a person ever clicks a blue link.',
			'Generative Engine Optimization (GEO) is about structuring your content so these models cite your brand as the source, not a competitor.',
			'That means clear, extractable answers near the top of a page, structured data, and consistent factual claims across your entire site.'
		]
	},
	{
		slug: 'build-vs-buy-custom-software',
		title: "Build vs Buy: A Founder's Framework for Custom Software Decisions",
		category: 'Software Dev',
		excerpt:
			'Not every workflow needs a bespoke build. A simple checklist we walk every client through before quoting.',
		image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
		date: 'Jun 20, 2026',
		readTime: '4 min read',
		content: [
			'Not every operational headache needs a custom-built solution. Sometimes an off-the-shelf SaaS tool solves 90% of the problem for a fraction of the cost.',
			'Before quoting any custom software project, we walk founders through a simple checklist: how unique is this workflow really, and what does it cost you to NOT have it built exactly your way.',
			'This framework has saved more than one client from an unnecessary six-month build.'
		]
	},
	{
		slug: 'compliance-video-marketing',
		title: 'Compliance Video Marketing: What Regulated Industries Get Wrong',
		category: 'Digital Marketing',
		excerpt:
			'Pharma, finance and healthcare brands can still make scroll-stopping video — inside the guardrails.',
		image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&q=80',
		date: 'Jun 17, 2026',
		readTime: '5 min read',
		content: [
			'Regulated industries — pharma, finance, healthcare — often default to bland, legal-approved-to-a-fault video content, assuming compliance and creativity cannot coexist.',
			'That is not true. The brands winning attention in these spaces have simply learned where the real guardrails are, and where there was always more creative room than their internal teams assumed.',
			'We walk through three campaigns where a regulated client still produced scroll-stopping video without a single compliance flag.'
		]
	},
	{
		slug: 'ai-agents-mid-size-business-2026',
		title: '5 AI Agents Every Mid-Size Business Should Deploy in 2026',
		category: 'AI Automation',
		excerpt:
			'From inbox triage to invoice reconciliation — the agents delivering ROI inside 30 days, not 6 months.',
		image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80',
		date: 'Jun 9, 2026',
		readTime: '6 min read',
		content: [
			'Most businesses evaluating "AI agents" picture a year-long enterprise rollout. In practice, the highest-ROI agents are narrow, boring, and live in 30 days.',
			'Inbox triage, invoice reconciliation, meeting note summarisation, lead qualification, and support ticket routing — these five consistently pay for themselves within the first month.',
			'We break down what each one actually automates and where the human still needs to stay in the loop.'
		]
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