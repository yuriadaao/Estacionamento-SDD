# Plano Técnico — Tela de Acesso

## Aplicativo

- React Native com Expo, direcionado inicialmente a Android;
- Expo Router para rotas de acesso e rotas protegidas;
- armazenamento seguro da sessão no dispositivo;
- Supabase Auth para autenticação e sessão;
- cliente Supabase concentrado em `src/services/supabase`.

## Entregas técnicas esperadas

1. Configuração de variáveis de ambiente para URL e chave pública do Supabase.
2. Migração para `public.profiles`, tipos de perfil e status, gatilho ou processo de vinculação ao Auth e políticas RLS.
3. Fluxo de autenticação, restauração de sessão e logout.
4. Tela de login e Painel de Controle com os três módulos submetidos às permissões do perfil.
5. Testes unitários de autorização, testes de integração de autenticação e teste do fluxo mobile de login e logout.

## Dados necessários para integração

Para iniciar a implementação, serão necessários a URL do projeto Supabase e a chave pública (`anon` ou `publishable`). Esses valores serão adicionados apenas a um arquivo `.env` não versionado. A chave `service_role` não deve ser compartilhada ou inserida no aplicativo.
