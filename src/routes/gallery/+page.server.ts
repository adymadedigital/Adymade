import type { PageServerLoad } from './$types';
import { fetchGalleryVideos, fetchGalleryPosts } from '$lib/data/gallery';

export const load: PageServerLoad = async () => {
	const [videos, posts] = await Promise.all([fetchGalleryVideos(), fetchGalleryPosts()]);

	return {
		galleryVideos: videos,
		galleryPosts: posts
	};
};