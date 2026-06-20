import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export interface Lead {
	id?: string;
	created_at?: string;
	name: string;
	email: string;
	phone: string;
	company: string;
	message: string;
	source: string;
}
