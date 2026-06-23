-- ============================================================
--  LAHTI 2026 — Edit Mode backend setup
--  Paste this whole file into Supabase → SQL Editor → New query → Run.
--  Safe to run more than once.
-- ============================================================

-- 1. Content table: one row per page, content is a JSON map of { edit-key -> html }
create table if not exists page_content (
  page       text primary key,
  content    jsonb       not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- 2. Sticky notes (admin-only — never shown to the public)
create table if not exists notes (
  id         bigint generated always as identity primary key,
  page       text not null,
  x          int  not null,
  y          int  not null,
  text       text default '',
  created_at timestamptz default now()
);

-- 3. Lock the tables down with Row Level Security
alter table page_content enable row level security;
alter table notes        enable row level security;

-- Anyone may READ page content (so visitors see the live site)
drop policy if exists "public read content" on page_content;
create policy "public read content" on page_content
  for select using (true);

-- Only a logged-in editor may CHANGE content
drop policy if exists "auth write content" on page_content;
create policy "auth write content" on page_content
  for all to authenticated using (true) with check (true);

-- Notes are fully private: only a logged-in editor can read OR write them
drop policy if exists "auth all notes" on notes;
create policy "auth all notes" on notes
  for all to authenticated using (true) with check (true);

-- 4. Image storage bucket (public read so photos load on the site)
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

drop policy if exists "public read images" on storage.objects;
create policy "public read images" on storage.objects
  for select using (bucket_id = 'site-images');

drop policy if exists "auth upload images" on storage.objects;
create policy "auth upload images" on storage.objects
  for insert to authenticated with check (bucket_id = 'site-images');

drop policy if exists "auth update images" on storage.objects;
create policy "auth update images" on storage.objects
  for update to authenticated using (bucket_id = 'site-images');

-- Done.
