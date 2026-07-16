-- ==============================================================================
-- 1. Create Tables
-- ==============================================================================

CREATE TABLE public.blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT
);

CREATE TABLE public.content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    key TEXT NOT NULL UNIQUE,
    value TEXT NOT NULL
);

-- ==============================================================================
-- 2. Enable Row Level Security (RLS)
-- ==============================================================================

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 3. Table Policies (Public Read, Authenticated Write)
-- ==============================================================================

-- Blogs Policies
CREATE POLICY "Public can read blogs" 
ON public.blogs FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert blogs" 
ON public.blogs FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update blogs" 
ON public.blogs FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete blogs" 
ON public.blogs FOR DELETE 
USING (auth.role() = 'authenticated');

-- Content Policies
CREATE POLICY "Public can read content" 
ON public.content FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert content" 
ON public.content FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update content" 
ON public.content FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete content" 
ON public.content FOR DELETE 
USING (auth.role() = 'authenticated');

-- ==============================================================================
-- 4. Create Storage Bucket
-- ==============================================================================

INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 5. Storage Policies
-- ==============================================================================

CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'images' );

CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'images' AND auth.role() = 'authenticated' );

CREATE POLICY "Authenticated users can update images"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'images' AND auth.role() = 'authenticated' );

CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
USING ( bucket_id = 'images' AND auth.role() = 'authenticated' );

-- ==============================================================================
-- 6. Case Studies Table
-- ==============================================================================

CREATE TABLE public.case_studies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    badge TEXT,
    industry TEXT,
    filter_category TEXT NOT NULL,
    duration TEXT,
    services TEXT[] DEFAULT '{}'::text[],
    short_description TEXT,
    metrics JSONB DEFAULT '[]'::jsonb,
    hero_image TEXT,
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    content JSONB DEFAULT '[]'::jsonb
);

ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read case_studies" 
ON public.case_studies FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert case_studies" 
ON public.case_studies FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update case_studies" 
ON public.case_studies FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete case_studies" 
ON public.case_studies FOR DELETE 
USING (auth.role() = 'authenticated');

-- ==============================================================================
-- 7. FAQs Table
-- ==============================================================================

CREATE TABLE public.faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read faqs" ON public.faqs
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert faqs" ON public.faqs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update faqs" ON public.faqs
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete faqs" ON public.faqs
    FOR DELETE USING (auth.role() = 'authenticated');

-- ==============================================================================
-- 8. Testimonials Table
-- ==============================================================================

CREATE TABLE public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    quote TEXT NOT NULL,
    initials TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    avatar_gradient TEXT,
    sort_order INTEGER DEFAULT 0
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read testimonials" ON public.testimonials
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert testimonials" ON public.testimonials
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update testimonials" ON public.testimonials
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete testimonials" ON public.testimonials
    FOR DELETE USING (auth.role() = 'authenticated');