export interface NavDropdownItem {
	icon: string; // Lucide icon component name
	label: string;
	href: string;
}

export interface NavDropdownColumn {
	heading: string;
	items: NavDropdownItem[];
}

export interface NavLink {
	label: string;
	href?: string;
	dropdown?: NavDropdownColumn[];
	featured?: {
		heading: string;
		title: string;
		description: string;
		linkLabel: string;
		linkHref: string;
	};
}

export const navLinks: NavLink[] = [
	{
		label: 'Services',
		dropdown: [
			{
				heading: 'AI & Automation',
				items: [
					{ icon: 'Bot',           label: 'AI Automation & Agents',  href: '/ai-automation' },
					{ icon: 'Clapperboard',  label: 'AI Videos & Creatives',   href: '/ai-videos' },
					{ icon: 'ClipboardCheck',label: 'Compliance Videos',        href: '/compliance-videos' },
					{ icon: 'Sparkles',      label: 'GEO — AI Search Ranking', href: '/geo' }
				]
			},
			{
				heading: 'Development',
				items: [
					{ icon: 'Globe',      label: 'Web & App Development', href: '/web-development' },
					{ icon: 'Settings2',  label: 'Custom Software',       href: '/software-development' },
					{ icon: 'TrendingUp', label: 'Digital Marketing',     href: '/digital-marketing' },
					{ icon: 'Search',     label: 'SEO Services',          href: '/digital-marketing#seo' }
				]
			}
		],
		featured: {
			heading: 'GCC Expertise',
			title: '🇸🇦 RGS — Tamimi Group',
			description: 'Website built for a Tamimi Group scaffolding company in Saudi Arabia',
			linkLabel: 'View case study →',
			linkHref: '/case-studies/rgs-saudi-arabia'
		}
	},
	{
		label: 'Industries',
		dropdown: [
			{
				heading: 'By Industry',
				items: [
					{ icon: 'HardHat',    label: 'Construction & Scaffolding', href: '/industries/construction' },
					{ icon: 'HeartPulse', label: 'Healthcare & Clinics',       href: '/industries/healthcare' }
				]
			},
			{
				heading: '',
				items: [
					{ icon: 'ShoppingCart', label: 'E-commerce', href: '/industries/ecommerce' },
					{ icon: 'Lightbulb',    label: 'SaaS & Tech', href: '/industries/saas' }
				]
			}
		]
	},
	{ label: 'Our Work', href: '/case-studies' },
	{ label: 'About',    href: '/about' },
	{ label: 'Blog',     href: '/blog' },
	{ label: 'Contact',  href: '/contact' }
];

export interface ClientChip {
	name: string;
	sub?: string;
	star?: boolean;
	logo?: string;
}

export const clientChips: ClientChip[] = [
	{ name: 'RGS', sub: 'Tamimi Group 🇸🇦', star: true },
	{ name: 'UltraTech Cement', logo: '/logos/ultratech-premium.webp'},
	{ name: 'Axis Bank', logo: '/logos/axis-bank.gif'},
	{ name: 'HDFC', logo: '/logos/hdfc-logo-hdfc-.jpg'},
	{ name: 'SBI', logo: '/logos/OIP.webp'},
	{ name: 'Ipca', logo: '/logos/logo1.jpg'},
	{ name: 'Cisco', logo: '/logos/cisco-logo-transparent.png'}
];

export const flagPills = [
	{ code: 'in', label: 'India' },
	{ code: 'sa', label: 'Saudi Arabia' },
	{ code: 'ae', label: 'UAE' },
	{ code: 'gb', label: 'United Kingdom' },
	{ code: 'au', label: 'Australia' },
	{ code: 'us', label: 'USA' }
];
