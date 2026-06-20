create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.mentor_selections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  mentor_names text[] not null check (array_length(mentor_names, 1) = 3),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id)
);

create table if not exists public.reflections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  content text not null,
  summary text,
  source_type text default 'mock',
  source_metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.mentor_replies (
  id uuid primary key default gen_random_uuid(),
  reflection_id uuid not null references public.reflections (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  mentor_name text not null,
  content text not null,
  style_note text,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists mentor_selections_user_id_idx
  on public.mentor_selections (user_id);

create index if not exists reflections_user_id_created_at_idx
  on public.reflections (user_id, created_at desc);

create index if not exists mentor_replies_reflection_id_idx
  on public.mentor_replies (reflection_id);

create index if not exists mentor_replies_user_id_idx
  on public.mentor_replies (user_id);

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.handle_updated_at();

drop trigger if exists mentor_selections_set_updated_at on public.mentor_selections;
create trigger mentor_selections_set_updated_at
before update on public.mentor_selections
for each row
execute function public.handle_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.mentor_selections enable row level security;
alter table public.reflections enable row level security;
alter table public.mentor_replies enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "Users can manage own mentor selections" on public.mentor_selections;
create policy "Users can manage own mentor selections"
on public.mentor_selections
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can manage own reflections" on public.reflections;
create policy "Users can manage own reflections"
on public.reflections
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can manage own mentor replies" on public.mentor_replies;
create policy "Users can manage own mentor replies"
on public.mentor_replies
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
