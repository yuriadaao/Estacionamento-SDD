# Sistema de Estacionamento

Aplicativo Android para gestão de estacionamento, desenvolvido com React Native e Expo. O projeto segue SDD (*Specification-Driven Development*): cada funcionalidade nasce como uma especificação antes de receber código e testes.

## Estrutura

- `specs/`: especificações versionadas por funcionalidade.
- `docs/`: decisões e documentação de arquitetura e integrações.
- `app/`: rotas e composição das telas pelo Expo Router.
- `src/`: regras de negócio, funcionalidades, componentes e serviços reutilizáveis.
- `supabase/`: migrações e configurações versionadas do banco de dados.
- `tests/`: testes unitários, de integração e de fluxo mobile.
- `config/` e `scripts/`: configurações e automações do projeto.

Cada nova funcionalidade deve começar em `specs/`, seguir para o plano técnico e então para `src/`, `app/`, `supabase/` e `tests/`, conforme necessário.
