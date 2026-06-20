export interface Metric {
	value: string;
	description: string;
}

export interface CaseStudy {
	badge: string;
	title: string;
	metrics: Metric[];
	href: string;
	featured?: boolean; // cyan styling for RGS card
	badgeStyle?: string;
	linkStyle?: string;
	cardStyle?: string;
}

export const caseStudies: CaseStudy[] = [
	{
		badge: 'Healthcare · AI Automation · Indore',
		title: 'Dental Clinic Management System',
		metrics: [
			{ value: '25%', description: 'Better chair utilisation rate' },
			{ value: '0%', description: 'Billing errors (was 4%)' },
			{ value: '3 hrs', description: 'Admin time saved per day' }
		],
		href: '/case-studies/dental-clinic'
	},
	{
		badge: 'Sales · AI Automation',
		title: 'AI-Powered Sales Pipeline Automation',
		metrics: [
			{ value: '+15%', description: 'Revenue growth in 6 months' },
			{ value: '30 min', description: 'Lead response time (was 8 hrs)' },
			{ value: '3×', description: 'Lead qualification rate' }
		],
		href: '/case-studies/sales-pipeline'
	},
	{
		badge: 'Construction · Web Dev · 🇸🇦 Saudi Arabia',
		title: 'RGS — A Tamimi Group Company',
		metrics: [
			{ value: 'EN+AR', description: 'Bilingual website delivered' },
			{ value: '100%', description: 'Mobile-first, SEO-ready' },
			{ value: 'Enterprise', description: 'Tamimi Group subsidiary — Saudi Arabia' }
		],
		href: '/case-studies/rgs-saudi-arabia',
		featured: true,
		badgeStyle: 'background:rgba(6,182,212,0.1);border-color:rgba(6,182,212,0.25);color:#06b6d4',
		linkStyle: 'color:#06b6d4',
		cardStyle: 'border-color:rgba(90,20,240,0.3)'
	}
];
