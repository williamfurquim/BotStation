🚨 Este projeto possui arquitetura com múltiplas camadas e variáveis sensíveis, o que inviabiliza sua publicação em ambiente público gratuito.
--

Aplicação fullstack desenvolvida com React + TypeScript no front-end e Node.js na API, utilizando Supabase para autenticação e persistência de usuários. O sistema permite cadastro, login e gerenciamento completo (CRUD) de cards contendo informações pessoais e avatar dinâmico.

👉 VISÃO GERAL

A aplicação possui autenticação integrada ao Supabase e, após login, o usuário pode criar, visualizar, editar e excluir cards com as seguintes informações:
- Nome
- Email
- Idade
- Imagem aleatória de robô gerada dinamicamente

Cada card recebe automaticamente uma imagem única de robô, consumida de um serviço externo de geração de avatares.

👉 ARQUITETURA DO SISTEMA

⏺️ FRONT-END (React + TypeScript)

- Componentização modular
- Tipagem estática para maior segurança
- Controle de estado para gerenciamento dos cards
- Integração com API via requisições HTTP
- Proteção de rotas baseada em autenticação
- Interface responsiva

⏺️ BACK-END (Node.js)

- API REST estruturada
- Rotas para CRUD de cards
- Middleware de autenticação
- Validação de dados
- Comunicação com banco de dados

⏺️ SUPABASE

- Cadastro e autenticação de usuários
- Gerenciamento de sessão
- Persistência de dados
- Controle de acesso

👉 FUNCIONALIDADES IMPLEMENTADAS

⏺️ AUTENTICAÇÃO

- Cadastro de usuário
- Login com email e senha
- Controle de sessão
- Proteção de endpoints

⏺️ CRUD DE CARDS

- Criação de card com nome, email e idade
- Edição de informações
- Exclusão de registros
- Listagem dinâmica dos cards

⏺️ AVATAR DINÂMICO

- Geração automática de imagem aleatória de robô
- Integração com API externa de avatares
- Associação visual única para cada registro

👉 CONCEITOS TÉCNICOS APLICADOS

- Desenvolvimento fullstack
- Arquitetura cliente-servidor
- Integração com serviços externos
- Autenticação baseada em token
- Manipulação de estados no React
- Tipagem avançada com TypeScript
- Estruturação de API REST
- Separação de responsabilidades entre camadas

👉 DIFERENCIAL DO PROJETO

Este projeto demonstra capacidade de:
- Construir aplicação fullstack completa
- Integrar autenticação como serviço (BaaS)
- Estruturar API escalável em Node.js
- Trabalhar com tipagem forte em TypeScript
- Implementar fluxo real de autenticação e autorização
- Integrar recursos externos à experiência do usuário
