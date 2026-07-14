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

	const { data: blogs, error: blogsError } = await supabase
		.from('blogs')
		.select('title, slug, category, created_at, image_url, image, read_time, readTime')
		.order('created_at', { ascending: false });

	if (fetchError) {
		console.error('Error fetching blog post:', fetchError);
	}
	if (blogsError) {
		console.error('Error fetching all blogs:', blogsError);
	}

	const activePost = post || fallbackPosts.find(p => p.slug === params.slug);

	if (!activePost) {
		throw error(404, 'Blog post not found');
	}

	return {
		post: activePost,
		blogs: blogs || []
	};
};
