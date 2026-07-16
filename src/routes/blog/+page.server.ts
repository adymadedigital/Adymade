import { supabase } from '$lib/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const { data: blogs, error } = await supabase
		.from('blogs')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error fetching blogs:', error);
		return { blogs: [], selectedCategory: null };
	}

	const selectedCategory = url.searchParams.get('category');

	return { 
		blogs: blogs || [], 
		selectedCategory 
	};
};
