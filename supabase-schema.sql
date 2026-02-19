-- ============================================================
-- Experience Table
-- Run this in Supabase SQL Editor if not already created
-- ============================================================

create table if not exists experience (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  company text not null,
  location text,
  start_date text,          -- format: 'YYYY-MM'
  end_date text,            -- format: 'YYYY-MM', null if is_current = true
  is_current boolean default false,
  description text,
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table experience enable row level security;

-- Public can read
create policy "Public can read experience"
  on experience for select using (true);

-- Only authenticated users can write
create policy "Authenticated users can insert experience"
  on experience for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update experience"
  on experience for update using (auth.role() = 'authenticated');

create policy "Authenticated users can delete experience"
  on experience for delete using (auth.role() = 'authenticated');
