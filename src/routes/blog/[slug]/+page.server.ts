import { supabase } from '$lib/supabase';
import { blogPosts as fallbackPosts } from '$lib/data/blog';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { data: post, error: fetchError } = await supabase
		.from('blogs')
		.select('*')
		.eq('slug', params.slug)
		.maybeSingle();

	if (fetchError) {
		console.error('Error fetching blog post:', fetchError);
	}

	if (post) {
		return { post };
	}

	// Fallback to static blog post if not found in database (e.g. database not seeded yet)
	const staticPost = fallbackPosts.find(p => p.slug === params.slug);
	if (staticPost) {
		return { post: staticPost };
	}

	throw error(404, 'Blog post not found');
};
