# 🧱 Gerenciamento Financeiro Monorepo

Este projeto utiliza **Turborepo + Yarn Workspaces + TypeScript** para organizar aplicações e um Design System reutilizável em um único repositório.

---

## 📂 Estrutura do Projeto

gerenciamento-financeiro/
├── apps/
│ ├── web/ # Aplicação Next.js (produto final)
│ └── docs/ # Storybook (documentação do design system)
├── packages/
│ ├── ui/ # Biblioteca de componentes reutilizáveis
│ ├── tsconfig/ # Configurações compartilhadas de TypeScript
│ └── eslint/ # Configurações compartilhadas de lint
├── package.json
├── turbo.json
└── yarn.lock


---

## 🎯 Objetivo

- Centralizar o **Design System** em `packages/ui`
- Reutilizar componentes entre múltiplas aplicações
- Documentar componentes com **Storybook**
- Utilizar os componentes em uma aplicação real com **Next.js**

---

## 🔗 Como funciona

- `packages/ui`  
  Contém os componentes reutilizáveis (ex: Button, Input)

- `apps/docs`  
  Ambiente de documentação com Storybook  
  Usado para visualizar e testar componentes isoladamente

- `apps/web`  
  Aplicação Next.js que consome os componentes do design system

- `packages/tsconfig`  
  Configurações compartilhadas de TypeScript

---

## ⚙️ Tecnologias

- Turborepo
- Yarn Workspaces (v1)
- TypeScript
- Storybook
- Next.js

---

## 🚀 Como rodar o projeto

### Instalar dependências
yarn install


### Rodar todos os apps
yarn dev


### Rodar apenas o Storybook
yarn workspace docs storybook


### Build do projeto
yarn build


---

## 🧠 Conceito

- `ui` é a fonte da verdade dos componentes
- `docs` mostra como usar os componentes
- `web` utiliza os componentes em produção

---

## ✅ Benefícios

- Reutilização de código
- Padronização de UI/UX
- Desenvolvimento isolado de componentes
- Escalabilidade para múltiplas aplicações
- Melhor performance com cache do Turborepo

---

## 📌 Observações

- O projeto utiliza **Yarn v1 (classic)**
- Dependências internas são resolvidas via `workspaces`
- Os pacotes são compartilhados usando `"*"` como versão

---