import { error } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { data, error: fetchError } = await supabase
		.from('case_studies')
		.select('*')
		.eq('slug', params.slug)
		.maybeSingle();

	if (fetchError) {
		error(500, fetchError.message);
	}

	if (!data) {
		error(404, 'Case study not found.');
	}

	return { study: data };
};
