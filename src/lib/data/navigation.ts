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
	{ name: 'RGS', logo: '/logos/rgs.png' },
	// { name: 'UltraTech Cement', logo: '/logos/ultraa.png' },
	// { name: 'Axis Bank', logo: '/logos/axiss.png' },
	// { name: 'HDFC', logo: '/logos/hdfcc.png' },
	// { name: 'SBI', logo: '/logos/sbii.png' },
	// { name: 'Ipca', logo: '/logos/ipcaa.png' },
	// { name: 'Cisco', logo: '/logos/cisco.png' },
	{ name: 'Amulyam', logo: '/logos/amulyam.png' },
	{ name: 'Anasuria', logo: '/logos/anasuria.png' },
	{ name: 'ATL Systems', logo: '/logos/atlsystems.png' },
	{ name: 'BizFusion', logo: '/logos/bizfusion.png' },
	// { name: 'Brotherman London', logo: '/logos/brotherman london.png' },
	// { name: 'Brotherspath', logo: '/logos/brotherspath.png' },
	{ name: 'City2City', logo: '/logos/city2city.png' },
	// { name: 'Digearth', logo: '/logos/digearth.png' },
	{ name: 'Ezeecomforts', logo: '/logos/ezee comforts.png' },
	// { name: 'Fixbiome', logo: '/logos/fixbiome.png' },
	// { name: 'Grupio', logo: '/logos/Grupio.png' },
	// { name: 'HPN', logo: '/logos/hpn.png' },
	// { name: 'Ipca', logo: '/logos/ipca.png' },
	// { name: 'Leadmines Media', logo: '/logos/leadmines media.png' },
	// { name: 'Lexiquest', logo: '/logos/lexiquest.png' },
	// { name: 'Mindii', logo: '/logos/mindii.png' },
	// { name: 'Mivaas', logo: '/logos/mivaas.png' },
	// { name: 'Moodup App', logo: '/logos/moodup app.png' },
	// { name: 'Orcomm', logo: '/logos/orcomm.png' },
	// { name: 'Oriheal', logo: '/logos/oriheal.png' },
	// { name: 'Pisarv', logo: '/logos/pisarv.png' },
	// { name: 'Redant Media', logo: '/logos/redant media.png' },
	// { name: 'Sampurnam', logo: '/logos/sampurnam.png' },
	// { name: 'Shadibyahwale', logo: '/logos/shadibyahwale.png' },
	// { name: 'Sif', logo: '/logos/sif.png' },
	// { name: 'Skintherapybysusan', logo: '/logos/skintherapybysusan.png' },
	// { name: 'Skootr', logo: '/logos/skootr.png' },
	// { name: 'Solcare', logo: '/logos/solcare.png' },
	// { name: 'Starforge', logo: '/logos/starforge.png' },
	// { name: 'Stratola', logo: '/logos/stratola.png' },
	// { name: 'Trilok', logo: '/logos/trilok.png' },
	// { name: 'Weaddo', logo: '/logos/weaddo.png' },
	// { name: 'Wellyfy', logo: '/logos/wellyfy.png' }
];


export const allClientChips: ClientChip[] = [
	{ name: 'RGS', logo: '/logos/rgs.png' },
	{ name: 'UltraTech Cement', logo: '/logos/ultraa.png' },
	{ name: 'Axis Bank', logo: '/logos/axiss.png' },
	{ name: 'HDFC', logo: '/logos/hdfcc.png' },
	{ name: 'SBI', logo: '/logos/sbii.png' },
	{ name: 'Cisco', logo: '/logos/cisco.png' },
	{ name: 'Amulyam', logo: '/logos/amulyam.png' },
	{ name: 'Anasuria', logo: '/logos/anasuria.png' },
	{ name: 'ATL Systems', logo: '/logos/atlsystems.png' },
	{ name: 'BizFusion', logo: '/logos/bizfusion.png' },
	{ name: 'Brotherman London', logo: '/logos/brotherman london.png' },
	{ name: 'Brotherspath', logo: '/logos/brotherspath.png' },
	{ name: 'City2City', logo: '/logos/city2city.png' },
	{ name: 'Digearth', logo: '/logos/digearth.png' },
	{ name: 'Ezeecomforts', logo: '/logos/ezee comforts.png' },
	{ name: 'Fixbiome', logo: '/logos/fixbiome.png' },
	{ name: 'Grupio', logo: '/logos/Grupio.png' },
	{ name: 'HPN', logo: '/logos/hpn.png' },
	{ name: 'Ipca', logo: '/logos/ipca.png' },
	{ name: 'Leadmines Media', logo: '/logos/leadmines media.png' },
	{ name: 'Lexiquest', logo: '/logos/lexiquest.png' },
	{ name: 'Mindii', logo: '/logos/mindii.png' },
	{ name: 'Mivaas', logo: '/logos/mivaas.png' },
	{ name: 'Moodup App', logo: '/logos/moodup app.png' },
	{ name: 'Orcomm', logo: '/logos/orcomm.png' },
	{ name: 'Oriheal', logo: '/logos/oriheal.png' },
	{ name: 'Pisarv', logo: '/logos/pisarv.png' },
	{ name: 'Redant Media', logo: '/logos/redant media.png' },
	{ name: 'Sampurnam', logo: '/logos/sampurnam.png' },
	{ name: 'Shadibyahwale', logo: '/logos/shadibyahwale.png' },
	{ name: 'Sif', logo: '/logos/sif.png' },
	{ name: 'Skintherapybysusan', logo: '/logos/skintherapybysusan.png' },
	{ name: 'Skootr', logo: '/logos/skootr.png' },
	{ name: 'Solcare', logo: '/logos/solcare.png' },
	{ name: 'Starforge', logo: '/logos/starforge.png' },
	{ name: 'Stratola', logo: '/logos/stratola.png' },
	{ name: 'Trilok', logo: '/logos/trilok.png' },
	{ name: 'Weaddo', logo: '/logos/weaddo.png' },
	{ name: 'Wellyfy', logo: '/logos/wellyfy.png' }

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