create extension if not exists pgcrypto;

create table if not exists public.kingdom_professionals (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) <= 120),
  description text not null check (char_length(description) <= 180),
  whatsapp text not null check (char_length(whatsapp) <= 30),
  whatsapp_url text not null,
  owner text not null check (char_length(owner) <= 120),
  created_at timestamptz not null default now()
);

alter table public.kingdom_professionals enable row level security;

drop policy if exists "Anyone can read kingdom professionals"
on public.kingdom_professionals;

create policy "Anyone can read kingdom professionals"
on public.kingdom_professionals
for select
to anon, authenticated
using (true);

drop policy if exists "Anyone can create kingdom professionals"
on public.kingdom_professionals;

create policy "Anyone can create kingdom professionals"
on public.kingdom_professionals
for insert
to anon, authenticated
with check (true);
