import { supabase } from '$lib/supabase';

export async function load() {
	const [caseStudiesRes, servicesRes] = await Promise.all([
		supabase
			.from('case_studies')
			.select('id, slug, title, badge, filter_category, metrics, featured')
			.eq('published', true)
			.order('sort_order', { ascending: true })
			.order('created_at', { ascending: false })
			.limit(3),
		supabase
			.from('services')
			.select('*')
			.eq('is_active', true)
			.order('display_order', { ascending: true })
	]);

	return {
		featuredStudies: caseStudiesRes.data ?? [],
		services: servicesRes.data ?? []
	};
}

