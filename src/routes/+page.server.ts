import { supabase } from '$lib/supabase';

export async function load() {
	const { data } = await supabase
		.from('case_studies')
		.select('id, slug, title, badge, filter_category, metrics, featured')
		.eq('published', true)
		.order('sort_order', { ascending: true })
		.order('created_at', { ascending: false })
		.limit(3);

	return {
		featuredStudies: data ?? []
	};
}
