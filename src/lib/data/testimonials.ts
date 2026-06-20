export interface Testimonial {
	quote: string;
	initials: string;
	name: string;
	role: string;
	avatarGradient?: string;
}

export const testimonials: Testimonial[] = [
	{
		quote:
			'Adymade completely transformed how our clinic runs. Scheduling errors dropped to zero and our team now has 25% more time for actual patient care. Best investment we have made.',
		initials: 'RS',
		name: 'Dr. Rakesh Sharma',
		role: 'Indore Dental Clinic · Indore, M.P.'
	},
	{
		quote:
			'Our abandoned cart automation alone recovered ₹3 lakh in sales in the first month. The Adymade team understood our business deeply and delivered beyond every expectation.',
		initials: 'PM',
		name: 'Priya Mehta',
		role: 'D2C E-commerce Brand · Mumbai'
	},
	{
		quote:
			'Working with Adymade was seamless even across time zones. A professional team that delivered an enterprise-grade bilingual website for our scaffolding operations in Saudi Arabia.',
		initials: 'RG',
		name: 'Operations Lead',
		role: 'RGS · Tamimi Group · 🇸🇦 Saudi Arabia',
		avatarGradient: 'linear-gradient(135deg,#320082,#06b6d4)'
	},
	{
		quote:
			'Adymade completely transformed how our clinic runs. Scheduling errors dropped to zero and our team now has 25% more time for actual patient care. Best investment we have made.',
		initials: 'RS',
		name: 'Dr. Rakesh Sharma',
		role: 'Indore Dental Clinic · Indore, M.P.'
	}
];
