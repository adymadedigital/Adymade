-- ==============================================================================
-- 1. Create Tables (Drop existing ones first to avoid conflict)
-- ==============================================================================

DROP TABLE IF EXISTS public.services CASCADE;
DROP TABLE IF EXISTS public.service_categories CASCADE;

-- Create service_categories table
CREATE TABLE public.service_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    display_order INTEGER DEFAULT 0
);

-- Create services table
CREATE TABLE public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    category_id UUID REFERENCES public.service_categories(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT,
    description TEXT,
    image_url TEXT,
    image_path TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

-- ==============================================================================
-- 2. Enable Row Level Security (RLS)
-- ==============================================================================

ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 3. Table Policies (Public Read, Authenticated Write)
-- ==============================================================================

-- Service Categories Policies
CREATE POLICY "Public can read service_categories" 
ON public.service_categories FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert service_categories" 
ON public.service_categories FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update service_categories" 
ON public.service_categories FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete service_categories" 
ON public.service_categories FOR DELETE 
USING (auth.role() = 'authenticated');

-- Services Policies
CREATE POLICY "Public can read services" 
ON public.services FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert services" 
ON public.services FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update services" 
ON public.services FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete services" 
ON public.services FOR DELETE 
USING (auth.role() = 'authenticated');

-- ==============================================================================
-- 4. Create Storage Bucket
-- ==============================================================================

INSERT INTO storage.buckets (id, name, public) 
VALUES ('service-images', 'service-images', true)
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 5. Storage Policies
-- ==============================================================================

CREATE POLICY "Public Access to service-images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'service-images' );

CREATE POLICY "Authenticated users can upload to service-images"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'service-images' AND auth.role() = 'authenticated' );

CREATE POLICY "Authenticated users can update service-images"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'service-images' AND auth.role() = 'authenticated' );

CREATE POLICY "Authenticated users can delete service-images"
ON storage.objects FOR DELETE
USING ( bucket_id = 'service-images' AND auth.role() = 'authenticated' );

-- ==============================================================================
-- 6. Seed Initial Data
-- ==============================================================================

-- Seed Categories
INSERT INTO public.service_categories (name, slug, display_order)
VALUES 
('AI & Automation', 'ai-automation', 10),
('Development', 'development', 20),
('Marketing', 'marketing', 30);

-- Seed Services
INSERT INTO public.services (category_id, title, slug, short_description, description, display_order, is_active)
VALUES 
(
  (SELECT id FROM public.service_categories WHERE slug = 'ai-automation'),
  'AI Automation & Agents',
  'ai-automation-agents',
  'Custom AI workflows, lead qualification bots, CRM automation, and intelligent agents.',
  'Custom AI workflows, lead qualification bots, CRM automation, and intelligent agents that work 24/7 so your team doesn\'t have to.',
  10,
  true
),
(
  (SELECT id FROM public.service_categories WHERE slug = 'ai-automation'),
  'AI Videos & Creatives',
  'ai-videos',
  'Studio-quality AI videos, social content, and product creatives at 80% lower cost.',
  'Studio-quality AI videos, social content, and product creatives at 80% lower cost and 10× faster than traditional production.',
  20,
  true
),
(
  (SELECT id FROM public.service_categories WHERE slug = 'ai-automation'),
  'Compliance Videos',
  'compliance-videos',
  'Safety training, onboarding, and regulatory compliance videos.',
  'Safety training, onboarding, and regulatory compliance videos that meet ISO, NEBOSH, and GCC labor law requirements.',
  30,
  true
),
(
  (SELECT id FROM public.service_categories WHERE slug = 'ai-automation'),
  'GEO — AI Search Ranking',
  'geo',
  'Generative Engine Optimisation to make your brand the answer that AI tools recommend.',
  'Generative Engine Optimisation to make your brand the answer that AI tools like ChatGPT, Gemini, and Perplexity recommend.',
  40,
  true
),
(
  (SELECT id FROM public.service_categories WHERE slug = 'development'),
  'Web & App Development',
  'web-app-development',
  'Performance-first websites and web apps built with modern frameworks.',
  'Performance-first websites and web apps built with modern frameworks — fast, accessible, SEO-ready, and conversion-focused.',
  50,
  true
),
(
  (SELECT id FROM public.service_categories WHERE slug = 'development'),
  'Custom Software',
  'custom-software',
  'Bespoke internal tools, dashboards, ERPs, and automation platforms.',
  'Bespoke internal tools, dashboards, ERPs, and automation platforms tailored exactly to your business processes.',
  60,
  true
),
(
  (SELECT id FROM public.service_categories WHERE slug = 'marketing'),
  'Digital Marketing',
  'digital-marketing',
  'Full-funnel campaigns across Meta, Google, LinkedIn, and more.',
  'Full-funnel campaigns across Meta, Google, LinkedIn, and more — driven by data, creative strategy, and relentless optimisation.',
  70,
  true
),
(
  (SELECT id FROM public.service_categories WHERE slug = 'marketing'),
  'SEO Services',
  'seo',
  'Technical SEO, content strategy, and link building to dominate organic rankings.',
  'Technical SEO, content strategy, and link building to dominate organic rankings in India, GCC, UK, and beyond.',
  80,
  true
);
