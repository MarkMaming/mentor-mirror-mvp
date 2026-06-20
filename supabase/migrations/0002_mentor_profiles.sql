create table if not exists public.mentor_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  mentor_name text not null,
  distilled_summary text not null,
  perspective_prompt text not null,
  communication_style text not null,
  focus_areas text[] not null default '{}'::text[],
  signature_questions text[] not null default '{}'::text[],
  caution_note text not null,
  status text not null default 'ready' check (status in ('ready')),
  distilled_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, mentor_name)
);

create index if not exists mentor_profiles_user_id_idx
  on public.mentor_profiles (user_id);

create index if not exists mentor_profiles_user_id_distilled_at_idx
  on public.mentor_profiles (user_id, distilled_at desc);

drop trigger if exists mentor_profiles_set_updated_at on public.mentor_profiles;
create trigger mentor_profiles_set_updated_at
before update on public.mentor_profiles
for each row
execute function public.handle_updated_at();

alter table public.mentor_profiles enable row level security;

drop policy if exists "Users can manage own mentor profiles" on public.mentor_profiles;
create policy "Users can manage own mentor profiles"
on public.mentor_profiles
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
