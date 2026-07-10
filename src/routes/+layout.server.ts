import { supabase } from '$lib/supabase';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const { data: faqItems } = await supabase
		.from('faqs')
		.select('id, question, answer, sort_order')
		.order('sort_order', { ascending: true })
		.order('created_at', { ascending: false });

	const { data: testimonials } = await supabase
		.from('testimonials')
		.select('id, quote, initials, name, role, avatar_gradient, sort_order')
		.order('sort_order', { ascending: true })
		.order('created_at', { ascending: false });

	return {
		faqItems: faqItems ?? [],
		testimonials: testimonials ?? []
	};
};
