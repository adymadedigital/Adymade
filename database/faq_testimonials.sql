-- ==============================================================================
-- 1. Create FAQs Table and Policies
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
-- 2. Create Testimonials Table and Policies
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

-- ==============================================================================
-- 3. Seed initial data
-- ==============================================================================

INSERT INTO public.faqs (question, answer, sort_order)
VALUES
(
  'What services does Adymade offer?',
  'Adymade offers AI automation and AI agent development, AI video production, compliance and safety training videos, website and web app development, custom software development, digital marketing (SEO, Google Ads, Meta Ads, social media), and GEO — Generative Engine Optimisation to rank in ChatGPT, Perplexity, and Google AI.',
  10
),
(
  'Where is Adymade based and which countries do you serve?',
  'Adymade is based in Indore, Madhya Pradesh, India. We serve clients across India, Saudi Arabia, UAE, United Kingdom, Australia, and globally. Our most recent international project was a bilingual website for RGS — a scaffolding company under Tamimi Group in Saudi Arabia. IST aligns within 1.5 hours of Gulf Standard Time, so real-time collaboration with GCC clients is seamless.',
  20
),
(
  'How much do your services cost?',
  'AI automation starts from ₹15,000. Websites from ₹8,000. AI videos from ₹2,500. Digital marketing from ₹15,000/month. Compliance videos from ₹25,000. For international clients, we quote in USD, GBP, AED, or SAR. Visit our Pricing page for full details, or book a free 15-minute call and we will send a custom fixed-price quote within 24 hours.',
  30
),
(
  'What is GEO and why does my business need it?',
  'GEO (Generative Engine Optimisation) is the practice of optimising your online presence so AI search tools like ChatGPT, Perplexity, Google AI Overviews, and Bing Copilot cite your business when answering relevant queries. As millions of people switch from traditional search to AI assistants, GEO is becoming as important as traditional SEO — and Adymade is one of the first Indian agencies offering it as a dedicated service.',
  40
),
(
  'How long does a typical project take?',
  'AI automation: 7–21 days. Websites: 7–21 days. AI videos: 3–7 days. Compliance videos: 7–14 days. Custom software: 4–8 weeks. We confirm the exact timeline after our discovery call and stick to it — deadlines are not optional for us.',
  50
);

INSERT INTO public.testimonials (quote, initials, name, role, avatar_gradient, sort_order)
VALUES
(
  'Adymade completely transformed how our clinic runs. Scheduling errors dropped to zero and our team now has 25% more time for actual patient care. Best investment we have made.',
  'RS',
  'Dr. Rakesh Sharma',
  'Indore Dental Clinic · Indore, M.P.',
  NULL,
  10
),
(
  'Our abandoned cart automation alone recovered ₹3 lakh in sales in the first month. The Adymade team understood our business deeply and delivered beyond every expectation.',
  'PM',
  'Priya Mehta',
  'D2C E-commerce Brand · Mumbai',
  NULL,
  20
),
(
  'Working with Adymade was seamless even across time zones. A professional team that delivered an enterprise-grade bilingual website for our scaffolding operations in Saudi Arabia.',
  'RG',
  'Operations Lead',
  'RGS · Tamimi Group · 🇸🇦 Saudi Arabia',
  'linear-gradient(135deg,#320082,#06b6d4)',
  30
);
