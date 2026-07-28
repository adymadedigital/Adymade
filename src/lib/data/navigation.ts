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
	{ label: 'Gallery',  href: '/gallery' },
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
	{ name: 'Client 1', logo: '/logos/logo png (1).png' },
	{ name: 'Client 2', logo: '/logos/logo png (2).png' },
	{ name: 'Client 8', logo: '/logos/logo png (8).png' },
	{ name: 'Client 10', logo: '/logos/logo png (10).png' },
	{ name: 'Client 11', logo: '/logos/logo png (11).png' },
	{ name: 'Client 15', logo: '/logos/logo png (15).png' },
	{ name: 'Client 25', logo: '/logos/logo png (25).png' },
	{ name: 'Client 41', logo: '/logos/logo png (41).png' },
	{ name: 'Client Original', logo: '/logos/Original.png' }
];


export const allClientChips: ClientChip[] = [
	{ name: 'Client 38', logo: '/logos/logo png (38).png' },
	{ name: 'Client 39', logo: '/logos/logo png (39).png' },
	{ name: 'Client 40', logo: '/logos/logo png (40).png' },
	{ name: 'Client 41', logo: '/logos/logo png (41).png' },
	{ name: 'Client Original', logo: '/logos/Original.png' },
	{ name: 'Client 1', logo: '/logos/logo png (1).png' },
	{ name: 'Client 2', logo: '/logos/logo png (2).png' },
	{ name: 'Client 3', logo: '/logos/logo png (3).png' },
	{ name: 'Client 4', logo: '/logos/logo png (4).png' },
	{ name: 'Client 5', logo: '/logos/logo png (5).png' },
	{ name: 'Client 6', logo: '/logos/logo png (6).png' },
	{ name: 'Client 8', logo: '/logos/logo png (8).png' },
	{ name: 'Client 9', logo: '/logos/logo png (9).png' },
	{ name: 'Client 10', logo: '/logos/logo png (10).png' },
	{ name: 'Client 11', logo: '/logos/logo png (11).png' },
	{ name: 'Client 12', logo: '/logos/logo png (12).png' },
	{ name: 'Client 13', logo: '/logos/logo png (13).png' },
	{ name: 'Client 14', logo: '/logos/logo png (14).png' },
	{ name: 'Client 15', logo: '/logos/logo png (15).png' },
	{ name: 'Client 16', logo: '/logos/logo png (16).png' },
	{ name: 'Client 17', logo: '/logos/logo png (17).png' },
	{ name: 'Client 18', logo: '/logos/logo png (18).png' },
	{ name: 'Client 19', logo: '/logos/logo png (19).png' },
	{ name: 'Client 20', logo: '/logos/logo png (20).png' },
	{ name: 'Client 21', logo: '/logos/logo png (21).png' },
	{ name: 'Client 22', logo: '/logos/logo png (22).png' },
	{ name: 'Client 23', logo: '/logos/logo png (23).png' },
	{ name: 'Client 24', logo: '/logos/logo png (24).png' },
	{ name: 'Client 25', logo: '/logos/logo png (25).png' },
	{ name: 'Client 26', logo: '/logos/logo png (26).png' },
	{ name: 'Client 27', logo: '/logos/logo png (27).png' },
	{ name: 'Client 28', logo: '/logos/logo png (28).png' },
	{ name: 'Client 29', logo: '/logos/logo png (29).png' },
	{ name: 'Client 30', logo: '/logos/logo png (30).png' },
	{ name: 'Client 31', logo: '/logos/logo png (31).png' },
	{ name: 'Client 32', logo: '/logos/logo png (32).png' },
	{ name: 'Client 33', logo: '/logos/logo png (33).png' },
	{ name: 'Client 34', logo: '/logos/logo png (34).png' },
	{ name: 'Client 36', logo: '/logos/logo png (36).png' },
	{ name: 'Client 37', logo: '/logos/logo png (37).png' },
];


export const flagPills = [
	{ code: 'in', label: 'India' },
	{ code: 'sa', label: 'Saudi Arabia' },
	{ code: 'ae', label: 'UAE' },
	{ code: 'gb', label: 'United Kingdom' },
	{ code: 'au', label: 'Australia' },
	{ code: 'us', label: 'USA' },
	{ code: 'nl', label: 'Netherlands' },
    { code: 'pl', label: 'Poland' },
    { code: 'se', label: 'Sweden' },
    { code: 'fj', label: 'Fiji' }
];