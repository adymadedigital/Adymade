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
