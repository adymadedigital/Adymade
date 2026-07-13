-- ==============================================================================
-- Blogs Schema Update & Data Seed
-- Run this in your Supabase SQL Editor to migrate the blogs table.
-- ==============================================================================

-- Drop existing blogs table (Cascade drops dependent policies)
DROP TABLE IF EXISTS public.blogs CASCADE;

-- Create updated blogs table
CREATE TABLE public.blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    image_url TEXT,
    image_path TEXT,
    alt_text TEXT,
    read_time TEXT,
    featured BOOLEAN DEFAULT false,
    author_name TEXT DEFAULT 'Adymade Team',
    content JSONB DEFAULT '[]'::jsonb
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

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

-- ==============================================================================
-- Seed Blogs Data (Block-based JSON)
-- ==============================================================================

INSERT INTO public.blogs (title, slug, category, excerpt, image_url, alt_text, read_time, featured, author_name, content)
VALUES
(
  'How We Cut a Client''s Lead Response Time From 8 Hours to 30 Minutes',
  'lead-response-time-ai-automation',
  'AI Automation',
  'Every sales team knows the pain of a lead going cold overnight. Here''s the exact AI automation stack we built — from WhatsApp intake to CRM routing.',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
  'Dashboard analytics displaying lead response times dropping from 8 hours to 30 minutes',
  '7 min read',
  true,
  'Adymade Team',
  '[
    {"type": "paragraph", "text": "Every sales team knows the pain of a lead going cold overnight. A prospect fills a form at 11pm, and by the time someone from the sales team replies the next morning, they have already spoken to two competitors."},
    {"type": "paragraph", "text": "This is the exact problem one of our clients came to us with. Their average first-response time was sitting at 8 hours — mostly because leads sat in an inbox until someone manually checked it."},
    {"type": "paragraph", "text": "We rebuilt the intake flow end to end: WhatsApp and web form submissions now route directly into an automation layer that qualifies the lead, drafts a personalised reply, and pings the right sales rep — all within minutes."},
    {"type": "paragraph", "text": "The result was a drop from 8 hours to under 30 minutes average response time, and a measurable increase in lead-to-call conversion within the first month."}
  ]'::jsonb
),
(
  'AI Video vs Traditional Production: What Actually Changes at 80% Less Cost',
  'ai-video-vs-traditional-production',
  'AI Video Production',
  'A breakdown of where AI video genuinely saves money — and the two stages where a human editor still matters.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=1200&q=80',
  'Abstract futuristic digital art representing artificial intelligence video rendering',
  '5 min read',
  false,
  'Adymade Team',
  '[
    {"type": "paragraph", "text": "AI video production has moved from novelty to a genuine line item on marketing budgets. But \"80% cheaper\" only tells half the story."},
    {"type": "paragraph", "text": "The real savings come from cutting out the pre-production cycle — no location scouting, no actor scheduling, no reshoots for a single line change."},
    {"type": "paragraph", "text": "Where a human editor still matters is in the final pass: pacing, emotional beats, and making sure the output does not feel uncanny. We keep that stage human on every project."}
  ]'::jsonb
),
(
  '7 Signs Your Website Is Costing You Enterprise Clients',
  'website-costing-you-enterprise-clients',
  'Web Development',
  'Slow load times and generic templates read as risk to a procurement team. Here''s what to fix first.',
  'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80',
  'Modern clean corporate web application design mockup on a workspace desk',
  '6 min read',
  false,
  'Adymade Team',
  '[
    {"type": "paragraph", "text": "Enterprise procurement teams judge a vendor long before the sales call — and your website is usually the first impression."},
    {"type": "paragraph", "text": "Slow load times, a generic template, and missing case studies all read as risk signals to someone deciding whether to trust you with a six-figure contract."},
    {"type": "paragraph", "text": "Here are the seven things we audit first on any client site before a major B2B push, starting with load speed and mobile responsiveness."}
  ]'::jsonb
),
(
  'GEO 101: Getting Your Brand Cited Inside ChatGPT & AI Overviews',
  'geo-101-ai-overviews',
  'SEO & GEO',
  'Ranking in Google isn''t enough anymore. How we structure content to get picked up by AI answer engines.',
  'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=1200&q=80',
  'Abstract lines and glowing blue dots showing semantic web data connection',
  '8 min read',
  false,
  'Adymade Team',
  '[
    {"type": "paragraph", "text": "Ranking on page one of Google used to be the finish line. Now, a growing share of searches end inside an AI overview — ChatGPT, Perplexity, Google AI Overviews — before a person ever clicks a blue link."},
    {"type": "paragraph", "text": "Generative Engine Optimization (GEO) is about structuring your content so these models cite your brand as the source, not a competitor."},
    {"type": "paragraph", "text": "That means clear, extractable answers near the top of a page, structured data, and consistent factual claims across your entire site."}
  ]'::jsonb
),
(
  'Build vs Buy: A Founder''s Framework for Custom Software Decisions',
  'build-vs-buy-custom-software',
  'Software Development',
  'Not every workflow needs a bespoke build. A simple checklist we walk every client through before quoting.',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
  'Software product design and developer sprint planning meeting around whiteboard',
  '4 min read',
  false,
  'Adymade Team',
  '[
    {"type": "paragraph", "text": "Not every operational headache needs a custom-built solution. Sometimes an off-the-shelf SaaS tool solves 90% of the problem for a fraction of the cost."},
    {"type": "paragraph", "text": "Before quoting any custom software project, we walk founders through a simple checklist: how unique is this workflow really, and what does it cost you to NOT have it built exactly your way."},
    {"type": "paragraph", "text": "This framework has saved more than one client from an unnecessary six-month build."}
  ]'::jsonb
),
(
  'Compliance Video Marketing: What Regulated Industries Get Wrong',
  'compliance-video-marketing',
  'Digital Marketing',
  'Pharma, finance and healthcare brands can still make scroll-stopping video — inside the guardrails.',
  'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&q=80',
  'Video marketing social media content engagement chart showing digital analytics',
  '5 min read',
  false,
  'Adymade Team',
  '[
    {"type": "paragraph", "text": "Regulated industries — pharma, finance, healthcare — often default to bland, legal-approved-to-a-fault video content, assuming compliance and creativity cannot coexist."},
    {"type": "paragraph", "text": "That is not true. The brands winning attention in these spaces have simply learned where the real guardrails are, and where there was always more creative room than their internal teams assumed."},
    {"type": "paragraph", "text": "We walk through three campaigns where a regulated client still produced scroll-stopping video without a single compliance flag."}
  ]'::jsonb
),
(
  '5 AI Agents Every Mid-Size Business Should Deploy in 2026',
  'ai-agents-mid-size-business-2026',
  'AI Automation',
  'From inbox triage to invoice reconciliation — the agents delivering ROI inside 30 days, not 6 months.',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80',
  'Collaboration team in office working on deploying automated artificial intelligence bots',
  '6 min read',
  false,
  'Adymade Team',
  '[
    {"type": "paragraph", "text": "Most businesses evaluating \"AI agents\" picture a year-long enterprise rollout. In practice, the highest-ROI agents are narrow, boring, and live in 30 days."},
    {"type": "paragraph", "text": "Inbox triage, invoice reconciliation, meeting note summarisation, lead qualification, and support ticket routing — these five consistently pay for themselves within the first month."},
    {"type": "paragraph", "text": "We break down what each one actually automates and where the human still needs to stay in the loop."}
  ]'::jsonb
)
ON CONFLICT (slug) DO NOTHING;
