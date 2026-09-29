# Modelo de Dados — Tela de Acesso

## Fonte de autenticação

As credenciais e a sessão serão gerenciadas pelo Supabase Auth, usando e-mail e senha. A senha é gerenciada exclusivamente pelo serviço de autenticação.

## Perfil do usuário

Tabela proposta: `public.profiles`.

| Campo | Tipo sugerido | Regra |
| --- | --- | --- |
| `id` | UUID | Chave primária e referência para `auth.users.id`. |
| `full_name` | texto | Nome completo do usuário. |
| `birth_date` | data | Data de nascimento. |
| `email` | texto | E-mail de identificação, consistente com o Auth. |
| `role` | enum | `attendance`, `operation` ou `administration`. |
| `status` | enum | `active` ou `inactive`. |
| `created_at` | timestamp | Registro de criação. |
| `updated_at` | timestamp | Última atualização. |

As políticas de segurança do banco deverão permitir que o usuário autenticado leia somente o próprio perfil. A criação da migração e das políticas RLS ocorrerá no plano de implementação.
