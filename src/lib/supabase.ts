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
	updated_at?: string;
	title: string;
	slug: string;
	category: string;
	excerpt: string;
	image_url?: string;
	image_path?: string;
	alt_text?: string;
	seo_title?: string;
	seo_description?: string;
	seo_keywords?: string;
	read_time?: string;
	featured?: boolean;
	author_name?: string;
	content: any[];
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

export interface TestimonialDB {
	id?: string;
	created_at?: string;
	quote: string;
	initials: string;
	name: string;
	role: string;
	avatar_gradient?: string;
	sort_order?: number;
}

export interface FaqDB {
	id?: string;
	created_at?: string;
	question: string;
	answer: string;
	sort_order?: number;
}
