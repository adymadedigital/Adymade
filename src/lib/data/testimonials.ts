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
			'They are always so in time, they are so creative and proactive in responding. Thank you so much again. All the best and highly recommended adymade.',
		initials: 'GK',
		name: 'GK',
		role: 'USCAN (Infienergy Systems) · Singapore'
	},
	{
		quote:
			'It was my pleasure to contract adymade for two recent automations. UK and his talented team are very creative and worked closely with us. Always understanding our needs and working hard to achieve our goals.',
		initials: 'SG',
		name: 'Steve Glaser',
		role: 'President, Funky Unckie'
	},
	{
		quote:
			'I really, really recommend them if you need professional work. They are really good. If you are looking for nice relation, I can recommend adymade again.',
		initials: 'SB',
		name: 'Sebastian',
		role: 'Poland'
	},
	{
		quote:
			'These guys are just in their fields and we were really, really impressed with the work. I can recommend these guys highly enough. They\'re really, really good.',
		initials: 'M',
		name: 'Mark',
		role: 'Shamrock Bait Tours · Dublin, Ireland'
	},
	{
		quote:
			'We highly recommend this service to everyone. I should also say that the team was very professional, very respectful, and I was very happy with the communication.',
		initials: 'N',
		name: 'Nina',
		role: 'Ukraine'
	}
];