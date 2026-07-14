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