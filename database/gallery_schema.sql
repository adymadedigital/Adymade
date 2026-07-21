-- Gallery items table (videos + posts)
create table if not exists gallery_items (
  id uuid default gen_random_uuid() primary key,
  type text not null check (type in ('video', 'post')),
  media_type text check (media_type in ('image', 'video')), -- for posts: image or video. for type='video' rows, leave null
  title text not null,
  file_path text not null,       -- path inside the 'gallery' storage bucket, e.g. videos/brotherman.mp4
  poster_url text,               -- optional thumbnail (videos only)
  category text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table gallery_items enable row level security;

-- Allow anyone to read (public gallery page)
create policy "Public can read gallery items"
  on gallery_items for select
  using (true);