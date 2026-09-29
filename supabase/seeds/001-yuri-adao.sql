-- Perfil de teste da Spec 001.
-- Execute após 20260928231000_create_profiles.sql.
-- Este script localiza o usuário do Supabase Auth pelo e-mail e cria ou atualiza apenas o perfil correspondente.

insert into public.profiles (id, full_name, birth_date, email, role, status)
select
  id,
  'Yuri Adão',
  date '1991-01-31',
  'yuriadao@email.com',
  'administration'::public.user_role,
  'active'::public.user_status
from auth.users
where email = 'yuriadao@email.com'
on conflict (id) do update
set
  full_name = excluded.full_name,
  birth_date = excluded.birth_date,
  email = excluded.email,
  role = excluded.role,
  status = excluded.status,
  updated_at = now();

-- A consulta deve retornar um perfil para o usuário autenticado após o login.
select id, full_name, email, role, status
from public.profiles
where email = 'yuriadao@email.com';
