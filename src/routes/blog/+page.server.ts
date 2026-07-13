import { supabase } from '$lib/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { data: blogs, error } = await supabase
		.from('blogs')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error fetching blogs:', error);
		return { blogs: [] };
	}

	return { blogs: blogs || [] };
};
