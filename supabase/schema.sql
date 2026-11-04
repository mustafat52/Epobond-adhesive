-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query).
create table if not exists public.products (
  slug        text primary key,
  model       text not null,
  name        text not null,
  line        text not null,
  summary     text not null default '',
  store_url   text not null default '#',
  draft       boolean not null default false,
  images      jsonb not null default '[]',
  specs       jsonb not null default '[]',
  notes       jsonb not null default '[]',
  sections    jsonb not null default '[]',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Only the website server (service role key) can read or write. The browser can never touch this table directly.
alter table public.products enable row level security;

-- Public bucket for product photos uploaded from the admin panel.
insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true) on conflict (id) do nothing;
