export interface Industry {
	icon: string; // Lucide icon component name
	label: string;
	href: string;
}

export const industries: Industry[] = [
	{ icon: 'HardHat',      label: 'Construction & Scaffolding', href: '/industries/construction' },
	{ icon: 'HeartPulse',   label: 'Healthcare & Clinics',       href: '/industries/healthcare' },
	{ icon: 'ShoppingCart', label: 'E-commerce & D2C',           href: '/industries/ecommerce' },
	{ icon: 'Lightbulb',    label: 'SaaS & Technology',          href: '/industries/saas' },
	{ icon: 'Building2',    label: 'Real Estate',                 href: '#' },
	{ icon: 'Factory',      label: 'Manufacturing',               href: '#' }
];

export interface Stat {
	value: string;
	label: string;
}

export const statsband: Stat[] = [
	{ value: '3+',  label: 'Years in business' },
	{ value: '236+',label: 'Projects delivered' },
	{ value: '150+',label: 'Happy clients' },
	{ value: '5+',  label: 'Countries served' }
];

export const mapStats: Stat[] = [
	{ value: '5+',    label: 'Countries' },
	{ value: '4',     label: 'Continents' },
	{ value: 'IST/GST', label: 'Compatible' }
];
