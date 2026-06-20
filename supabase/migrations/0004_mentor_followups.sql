create table if not exists public.mentor_followups (
  id uuid primary key default gen_random_uuid(),
  mentor_reply_id uuid not null references public.mentor_replies (id) on delete cascade,
  reflection_id uuid not null references public.reflections (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  mentor_name text not null,
  question text not null,
  answer text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists mentor_followups_reply_id_idx
  on public.mentor_followups (mentor_reply_id, created_at asc);

create index if not exists mentor_followups_user_id_idx
  on public.mentor_followups (user_id);

alter table public.mentor_followups enable row level security;

drop policy if exists "Users can manage own mentor followups" on public.mentor_followups;
create policy "Users can manage own mentor followups"
on public.mentor_followups
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
