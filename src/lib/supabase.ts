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

export interface Blog {
	id?: string;
	created_at?: string;
	title: string;
	content: string;
	image_url?: string;
}

export interface Content {
	id?: string;
	created_at?: string;
	key: string;
	value: string;
}

export interface CaseStudyDB {
	id?: string;
	created_at?: string;
	badge: string;
	title: string;
	href: string;
	metrics: { value: string; description: string }[];
	badge_style?: string;
	link_style?: string;
	card_style?: string;
	featured?: boolean;
}
