import { faqItems } from '$lib/data/faq';

export const seo = {
	title: 'Adymade | AI Automation, AI Videos, Web Development & Digital Marketing — India',
	description:
		'Adymade is a global AI and digital agency based in Indore, India. We build AI automations, create AI videos, develop websites, and run digital marketing for businesses across India, GCC, UK, and Australia. 150+ clients.',
	keywords:
		'AI automation agency India, AI video production India, web development company India, digital marketing agency India, AI agency Indore, GEO services India, compliance videos India',
	og: {
		title: 'Adymade | AI Automation, AI Videos & Web Development — India',
		description:
			'Global AI and digital agency trusted by 150+ clients across India, Saudi Arabia, UAE, UK, Australia.',
		type: 'website',
		url: 'https://www.adymade.com'
	}
};

export const localBusinessSchema = {
	'@context': 'https://schema.org',
	'@type': 'LocalBusiness',
	name: 'Adymade',
	description:
		'AI automation, AI videos, compliance videos, web development, software development, digital marketing, SEO, and GEO services.',
	url: 'https://www.adymade.com',
	email: 'contact@adymade.com',
	address: {
		'@type': 'PostalAddress',
		addressLocality: 'Indore',
		addressRegion: 'Madhya Pradesh',
		postalCode: '452001',
		addressCountry: 'IN'
	},
	areaServed: ['India', 'Saudi Arabia', 'United Arab Emirates', 'United Kingdom', 'Australia']
};

// Generated dynamically from faqItems — never duplicated
export function buildFaqSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqItems.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer
			}
		}))
	};
}
