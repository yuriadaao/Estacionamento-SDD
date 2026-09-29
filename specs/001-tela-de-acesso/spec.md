# Spec 001 — Tela de Acesso

## Objetivo

Orientar o desenvolvimento da camada de acesso de um sistema de gestão de estacionamento com 50 vagas. O aplicativo deve autenticar o usuário, identificar seu perfil, preservar sua sessão com segurança e apresentar um Painel de Controle com os cards permitidos.

Os únicos módulos considerados pelo sistema são **Rotativo**, **Planos Mensais** e **Administração**.

## Escopo desta fase

- Tela de acesso com e-mail e senha;
- Autenticação e encerramento de sessão com Supabase Auth;
- Identificação do perfil e do status do usuário;
- Proteção das telas que exigem autenticação;
- Painel de Controle com cards dos módulos permitidos;
- Persistência dos perfis de usuário no Supabase;
- Preparação de permissões para módulos futuros.

Os cards de Planos Mensais e Administração podem ser apresentados ao usuário autorizado nesta fase. As funcionalidades internas e os fluxos desses módulos não fazem parte desta Spec.

## Requisitos funcionais

- **RF01** — O aplicativo deve disponibilizar campos de e-mail e senha.
- **RF02** — O aplicativo deve permitir o envio das credenciais para autenticação.
- **RF03** — O aplicativo deve validar as credenciais informadas por meio do Supabase Auth.
- **RF04** — O aplicativo deve identificar o perfil associado ao usuário autenticado.
- **RF05** — O aplicativo deve impedir o acesso a telas e cards não permitidos para o perfil autenticado.
- **RF06** — O aplicativo não deve permitir acesso com credenciais inválidas ou com usuário inativo.
- **RF07** — Após a autenticação, o aplicativo deve direcionar o usuário ao Painel de Controle, exibindo os cards correspondentes às áreas permitidas.
- **RF08** — O sistema deve persistir os dados necessários à autenticação e ao perfil do usuário no Supabase.
- **RF09** — O aplicativo deve permitir que o usuário encerre sua sessão.
- **RF10** — O aplicativo deve restaurar uma sessão válida de forma segura quando aberto novamente e solicitar novo acesso quando a sessão for inválida ou expirar.

## Perfis e regras de acesso

| Perfil | Rotativo | Planos Mensais | Administração |
| --- | --- | --- | --- |
| Atendimento | Acesso | Acesso limitado, a ser detalhado em Spec futura | Sem acesso |
| Operação | Acesso | Acesso completo, a ser detalhado em Spec futura | Sem acesso |
| Administração | Acesso completo | Acesso completo | Acesso completo |

- **RG01** — Operação é um perfil de acesso, não um módulo do sistema.
- **RG02** — Apenas Rotativo, Planos Mensais e Administração são módulos do sistema.
- **RG03** — O perfil Administração possui acesso aos três módulos.
- **RG04** — O status inativo bloqueia a entrada no aplicativo, ainda que as credenciais sejam válidas.
- **RG05** — O aplicativo deve aplicar as permissões tanto na apresentação dos cards quanto no acesso às rotas protegidas.
- **RG06** — O acesso limitado de Atendimento ao módulo Planos Mensais será definido em uma Spec própria desse módulo.

## Persistência

O Supabase Auth será responsável pelas credenciais, senha e sessão. Os dados de negócio do usuário serão mantidos em uma tabela complementar de perfis, vinculada ao identificador de `auth.users`.

Os campos mínimos do perfil são: identificador, nome completo, data de nascimento, e-mail, perfil de acesso e status. Senhas não devem ser gravadas nessa tabela nem armazenadas em texto simples.

## Critérios de aceite

- **CA01** — Ao abrir o aplicativo sem sessão válida, a tela de acesso deve ser apresentada.
- **CA02** — O usuário deve conseguir informar e-mail e senha.
- **CA03** — Com credenciais válidas e perfil ativo, o sistema deve autenticar o usuário e apresentar o Painel de Controle.
- **CA04** — Com credenciais inválidas, o sistema deve impedir o acesso e informar a falha sem expor dados sensíveis.
- **CA05** — Um usuário inativo deve ter seu acesso bloqueado.
- **CA06** — A tela de acesso não deve executar funcionalidades internas de Rotativo, Planos Mensais ou Administração.
- **CA07** — O Painel de Controle deve apresentar somente cards autorizados para o perfil autenticado.
- **CA08** — O usuário deve conseguir encerrar sua sessão e retornar à tela de acesso.
- **CA09** — A estrutura de perfis necessária à autenticação deve estar criada e funcional no Supabase.
- **CA10** — O sistema deve recuperar os dados do perfil necessários para autenticar o usuário e aplicar seu acesso.
- **CA11** — Uma sessão válida deve ser restaurada de forma segura; uma sessão expirada ou inválida deve redirecionar o usuário para a tela de acesso.

## Fora de escopo

- Cadastro, recuperação e alteração de senha;
- Gerenciamento de usuários e permissões;
- Desenvolvimento das funcionalidades internas de Rotativo;
- Desenvolvimento de Planos Mensais;
- Desenvolvimento das funcionalidades internas de Administração;
- Funcionalidades financeiras e relatórios;
- Regras operacionais referentes à ocupação das 50 vagas.
