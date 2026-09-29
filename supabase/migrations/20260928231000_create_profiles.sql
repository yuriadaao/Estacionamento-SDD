-- Spec 001: autenticação e perfis de acesso
-- Execute esta migração no projeto Supabase antes de testar o login.

create type public.user_role as enum ('attendance', 'operation', 'administration');
create type public.user_status as enum ('active', 'inactive');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  birth_date date not null,
  email text not null unique,
  role public.user_role not null,
  status public.user_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_email_matches_auth_format check (email = lower(email))
);

alter table public.profiles enable row level security;

create policy "Authenticated users can read their own profile"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- Cadastro de usuários está fora de escopo. Para cada usuário criado no painel
-- de Authentication do Supabase, inclua manualmente o perfil correspondente:
-- insert into public.profiles (id, full_name, birth_date, email, role, status)
-- values ('<auth.users.id>', 'Nome Completo', '2000-01-01', 'email@dominio.com', 'administration', 'active');
