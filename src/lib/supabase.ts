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
	slug: string;
	title: string;
	badge?: string;
	industry?: string;
	filter_category: 'AI & Automation' | 'Development' | 'Marketing';
	duration?: string;
	services: string[];
	short_description?: string;
	metrics: { value: string; description: string }[];
	hero_image?: string;
	featured?: boolean;
	published?: boolean;
	sort_order?: number;
	content: any[]; // Ordered content blocks
}
