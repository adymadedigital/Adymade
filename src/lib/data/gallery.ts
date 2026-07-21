import { supabase } from '$lib/supabase';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';

export interface GalleryVideo {
	id: string;
	title: string;
	videoSrc: string;
	poster?: string;
	category?: string;
}

export interface GalleryPost {
	id: string;
	title: string;
	type: 'image' | 'video';
	image?: string;
	videoSrc?: string;
	link?: string;
	category?: string;
}

// Builds a public URL for a file stored in the 'gallery' Supabase bucket
function getPublicUrl(filePath: string): string {
	return `${PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${filePath}`;
}

// Fetches all gallery videos (type = 'video') from Supabase, ordered by sort_order
export async function fetchGalleryVideos(): Promise<GalleryVideo[]> {
	const { data, error } = await supabase
		.from('gallery_items')
		.select('*')
		.eq('type', 'video')
		.order('sort_order', { ascending: true });

	if (error) {
		console.error('Error fetching gallery videos:', error.message);
		return [];
	}

	return (data ?? []).map((row) => ({
		id: row.id,
		title: row.title,
		videoSrc: getPublicUrl(row.file_path),
		poster: row.poster_url ?? undefined,
		category: row.category ?? undefined
	}));
}

// Fetches all gallery posts (type = 'post') from Supabase, ordered by sort_order
export async function fetchGalleryPosts(): Promise<GalleryPost[]> {
	const { data, error } = await supabase
		.from('gallery_items')
		.select('*')
		.eq('type', 'post')
		.order('sort_order', { ascending: true });

	if (error) {
		console.error('Error fetching gallery posts:', error.message);
		return [];
	}

	return (data ?? []).map((row) => ({
		id: row.id,
		title: row.title,
		type: row.media_type as 'image' | 'video',
		image: row.media_type === 'image' ? getPublicUrl(row.file_path) : undefined,
		videoSrc: row.media_type === 'video' ? getPublicUrl(row.file_path) : undefined,
		category: row.category ?? undefined
	}));
}