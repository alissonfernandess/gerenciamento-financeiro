# Gerenciamento Financeiro

Aplicação web de gerenciamento financeiro (dashboard, extrato e transferências) com cadastro e login seguros. Monorepo [Turborepo](https://turborepo.dev/) com um app [Next.js](https://nextjs.org/) 16 (App Router, React 19, TypeScript), organizado em **Clean Architecture**.

## Sumário

- [Como rodar a aplicação](#-como-rodar-a-aplicação)
- [Estrutura do monorepo](#-estrutura-do-monorepo)
- [Clean Architecture](#-clean-architecture)
- [Autenticação e segurança](#-autenticação-e-segurança)
- [Funcionalidades](#-funcionalidades)
- [Documentação e Figma](#-documentação-e-figma)

---

## 🚀 Como rodar a aplicação

### Pré-requisitos

- **Node.js 18 ou superior**
- **Yarn 1.22** (o projeto declara `yarn@1.22.22` em `packageManager`)
- **OpenSSL** (ou outro meio de gerar valores aleatórios) para criar as chaves do passo 2. No Windows ele vem junto com o Git Bash.

### Passo a passo

**1. Instalar as dependências** (na raiz do repositório):

```sh
yarn install
```

**2. Configurar as variáveis de ambiente.** Copie o modelo e preencha os dois valores:

```sh
cp apps/web/.env.example apps/web/.env.local
```

| Variável              | Para que serve                                         | Como gerar                    |
| --------------------- | ------------------------------------------------------ | ----------------------------- |
| `DATA_ENCRYPTION_KEY` | Chave AES-256 que cifra dados pessoais (telefone)      | `openssl rand -base64 32`     |
| `SESSION_SECRET`      | Segredo que assina o token de sessão (mín. 32 caracteres) | `openssl rand -base64 48`  |

Cole o resultado de cada comando no `apps/web/.env.local`:

```env
DATA_ENCRYPTION_KEY=<saida do primeiro comando>
SESSION_SECRET=<saida do segundo comando>
```

> [!IMPORTANT]
> Sem essas variáveis o servidor **recusa de propósito** cadastrar e logar (falha segura). O `.env.local` não vai para o Git. Nunca versione as chaves.
>
> Se você trocar a `DATA_ENCRYPTION_KEY` depois de já ter usuários cadastrados, os telefones gravados deixam de ser decifráveis. Nesse caso, apague a pasta `apps/web/.data/`.

**3. Iniciar em modo de desenvolvimento:**

```sh
yarn dev
```

A aplicação sobe em **http://localhost:3000**. Crie uma conta em `/cadastro` e entre pelo `/login`.

### Outros comandos

Todos executados na raiz do repositório:

| Comando             | O que faz                                              |
| ------------------- | ------------------------------------------------------ |
| `yarn dev`          | Servidor de desenvolvimento (Turborepo, todos os apps) |
| `yarn build`        | Build de produção                                      |
| `yarn lint`         | ESLint (com `--max-warnings 0`)                        |
| `yarn check-types`  | Verificação de tipos com TypeScript                    |
| `yarn format`       | Formata `ts`, `tsx` e `md` com Prettier                |

Para rodar só o app web: `yarn turbo dev --filter=web`.

Para testar o build de produção: `yarn build` e depois `yarn workspace web start`.

> [!NOTE]
> Os usuários ficam em `apps/web/.data/users.json` (criado automaticamente, ignorado pelo Git). Para zerar os dados locais, basta apagar essa pasta.

---

## 🧱 Estrutura do monorepo

```
.
├── apps/
│   └── web/                     # App Next.js (front + rotas de API)
│       └── src/
│           ├── app/             # Páginas, layouts e rotas /api (camada de apresentação)
│           ├── contexts/        # UserContext (usuário logado no cliente)
│           ├── core/            # Domínio: entidades, contratos e regras de negócio
│           ├── infrastructure/  # Implementações concretas: repositórios, segurança
│           └── proxy.ts         # Porteiro de rotas (antigo middleware)
└── packages/
    ├── ui/                      # @repo/ui: biblioteca de componentes compartilhada
    ├── eslint-config/           # @repo/eslint-config
    └── typescript-config/       # @repo/typescript-config
```

---

## 🏛️ Clean Architecture

O objetivo é que **as regras de negócio não dependam de framework, banco de dados nem de como os dados são guardados**. O código é dividido em camadas, e a regra de ouro é: **dependências só apontam para dentro**. O domínio não conhece ninguém; a infraestrutura conhece o domínio.

```
┌───────────────────────────────────────────────────────────┐
│  Apresentação  (src/app, src/contexts)                    │
│  Páginas, hooks, rotas /api, proxy. Usa o domínio.        │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Infraestrutura  (src/infrastructure)               │  │
│  │  Repositórios concretos, scrypt, JWT, AES-GCM.      │  │
│  │  Implementa os contratos do domínio.                │  │
│  │  ┌───────────────────────────────────────────────┐  │  │
│  │  │  Domínio  (src/core)                          │  │  │
│  │  │  entities · repositories (ports) · services   │  │  │
│  │  │  TypeScript puro, sem React/Next/node.        │  │  │
│  │  └───────────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘
        dependências apontam sempre de fora para dentro
```

### As camadas neste projeto

| Camada | Pasta | Responsabilidade | Exemplos |
| ------ | ----- | ---------------- | -------- |
| **Domínio: entidades** | `core/entities` | Os conceitos do negócio | `User`, `Transaction`, `Contact` |
| **Domínio: ports** | `core/repositories` | Interfaces (contratos) de acesso a dados | `UserRepository`, `TransactionRepository` |
| **Domínio: services** | `core/services` | Regras de negócio como funções puras | `AuthService`, `TransferService`, `StatementService` |
| **Infraestrutura: adapters** | `infrastructure/repositories` | Implementações concretas dos contratos | `FileUserRepository`, `MockTransactionRepository` |
| **Infraestrutura: segurança** | `infrastructure/security` | Detalhes técnicos de segurança | `password.ts`, `session.ts`, `crypto.ts`, `rateLimiter.ts` |
| **Composition Root** | `infrastructure/container.ts`, `server-container.ts` | Único lugar que escolhe qual implementação usar | ver abaixo |
| **Apresentação** | `app/`, `contexts/` | Telas, hooks, rotas de API | `useLogin`, `useExtrato`, `api/auth/*` |

### Como isso aparece no código

**1. O domínio define o contrato** (`core/repositories/UserRepository.ts`):

```ts
export interface UserRepository {
    findByPhone(phone: string): Promise<UserWithCredentials | null>
    findById(id: string): Promise<User | null>
    create(data: NewUser): Promise<User>
}
```

**2. A infraestrutura implementa** (`infrastructure/repositories/FileUserRepository.ts`): grava em `.data/users.json`, cifrando o telefone.

**3. O Composition Root escolhe a implementação** (`infrastructure/server-container.ts`):

```ts
export const userRepository: UserRepository = new FileUserRepository()
```

**4. As rotas usam só a interface.** `api/auth/login/route.ts` importa `userRepository` e o trata como `UserRepository`, sem saber que por trás há um arquivo JSON.

### Por que fazer assim

- **Trocar a persistência sem tocar nas regras.** Migrar de arquivo JSON para Postgres é criar uma nova classe que implementa `UserRepository` e mudar **uma linha** em `server-container.ts`. O mesmo vale para trocar os repositórios *mock* de transações por uma API real em `container.ts`.
- **Regras testáveis e reutilizáveis.** O `AuthService` é TypeScript puro (sem React, `fetch` ou `crypto`), então a **mesma validação** roda no navegador (feedback imediato no formulário) e no servidor (que é quem realmente protege).
- **Segredos fora do bundle do cliente.** Existem **dois containers de propósito**: `container.ts` (importado pelo navegador) e `server-container.ts` (usa `node:fs` e `node:crypto`, só para rotas de API e proxy). Separá-los impede que código e chaves de servidor vão parar no JavaScript enviado ao usuário.
- **Componentes de tela enxutos.** Cada página delega a lógica a um hook dedicado (`useLogin`, `useCadastro`, `useExtrato`, `useTransferencias`, `useDashboard`), e a tela só renderiza.

---

## 🔐 Autenticação e segurança

O login usa **telefone + senha**. A sessão é um **JWT assinado em cookie `httpOnly`**, validado **no servidor** a cada acesso a rota protegida.

### Fluxo

```
Cadastro / Login                          Acesso a uma página protegida
────────────────                          ─────────────────────────────
Formulário (valida no cliente)            Requisição  →  proxy.ts
      │                                                     │
      ▼                                         lê o cookie "session"
POST /api/auth/register | login                  e verifica assinatura + expiração
      │                                                     │
 revalida no servidor (AuthService)              ┌──────────┴──────────┐
 hash scrypt da senha / confere hash             válido            inválido/ausente
 telefone cifrado em disco                        │                     │
      │                                       renderiza a          redireciona
      ▼                                         página             para /login
 Set-Cookie: session=<JWT>
 (httpOnly, SameSite=Lax, 8h)
```

### Endpoints

| Rota | Método | O que faz |
| ---- | ------ | --------- |
| `/api/auth/register` | `POST` | Valida, gera o hash da senha, grava o usuário (telefone cifrado) e já abre a sessão. Retorna `201`, ou `409` se o telefone já existe. |
| `/api/auth/login` | `POST` | Valida credenciais, aplica limite de tentativas e abre a sessão. Retorna `401` (credenciais inválidas) ou `429` (muitas tentativas). |
| `/api/auth/me` | `GET` | Devolve o usuário da sessão atual. É como o navegador descobre quem está logado, já que não consegue ler o cookie. |
| `/api/auth/logout` | `POST` | Expira o cookie de sessão. |

### Proteção de rotas (`proxy.ts`)

No Next 16 o antigo `middleware` chama-se **proxy**. Ele roda **no servidor, antes da página ser renderizada**:

- Rotas protegidas (`/dashboard`, `/extrato`, `/transferencias`, `/bem-vindo`) sem sessão válida → redireciona para `/login`.
- `/`, `/login` e `/cadastro` com sessão válida → redireciona para `/dashboard`.

Antes, a proteção era feita no navegador lendo o `localStorage`, o que é só aparência (a página já tinha sido enviada, e qualquer um pode criar esse item). Agora o servidor decide.

### Medidas de segurança

| Ameaça | Defesa | Onde |
| ------ | ------ | ---- |
| Vazamento de senhas | A senha **nunca é guardada**: só um hash **scrypt** (N=2¹⁷, salt aleatório por senha, comparação em tempo constante) | `security/password.ts` |
| Roubo de sessão via XSS | JWT em cookie **`httpOnly`**: JavaScript não consegue ler | `security/session.ts` |
| CSRF | Cookie **`SameSite=Lax`**; **`Secure`** em produção (só HTTPS) | `security/session.ts` |
| Token forjado ou adulterado | Assinatura **HS256** verificada com o algoritmo fixado, mais expiração de **8h** | `security/session.ts` |
| Força bruta | Máximo de **5 tentativas / 15 min** por IP + telefone (`429`) | `security/rateLimiter.ts`, `api/auth/login` |
| Descobrir quais contas existem | Mensagem **única** para "telefone inexistente" e "senha errada", com **tempo de resposta igualado** (hash falso) | `api/auth/login` |
| Dados pessoais expostos em disco | Telefone **cifrado com AES-256-GCM** (que também detecta adulteração); busca por *blind index* (HMAC) | `security/crypto.ts`, `FileUserRepository.ts` |
| Dados pessoais na tela | Telefone **mascarado** (`(11) *****-9999`) | `AuthService.maskPhone` |
| Entrada maliciosa ou abusiva | Validação **revalidada no servidor** (nunca só no cliente) e senha limitada a 128 caracteres (evita gastar CPU no hash) | `AuthService.ts` |
| Chaves no código | Chaves só em variáveis de ambiente; sem elas, o servidor **falha de forma segura** | `.env.local` |

**Regras de senha:** mínimo 8 caracteres, com ao menos 1 letra e 1 número.

### Limitações conhecidas

Estas escolhas atendem ao desenvolvimento local e a uma única instância, e estão documentadas no código:

- **Persistência em arquivo JSON** (`.data/users.json`): não serve para hospedagem com disco efêmero ou somente leitura (como a Vercel). Para produção, implemente `UserRepository` com um banco real.
- **Limite de tentativas em memória**: não é compartilhado entre várias instâncias. Em produção, use um armazenamento compartilhado (ex.: Redis).
- **Transações, contatos e saldo** ainda vêm de repositórios *mock* (`Mock*Repository`).

---

## ✨ Funcionalidades

### 🔑 Cadastro e login (`/cadastro`, `/login`)

- Cadastro com nome, telefone (com DDD) e senha, com validação inline por campo
- Login com limite de tentativas e mensagens de erro seguras
- Sessão persistente por 8 horas e logout

### 📊 Dashboard (`/dashboard`)

- Visão geral com saldo total e métricas de despesas
- Gráfico financeiro interativo
- Metas financeiras editáveis: adicionar, editar e remover metas com formulário inline

### 📋 Extrato (`/extrato`)

- Listagem completa de transações com ícone por tipo
- **Busca em tempo real** por descrição ou tipo de transação
- **Filtros por tipo** via chips interativos (Pix, Boleto, Saque, Depósito, TED, DOC)
- **Paginação com "Carregar mais"**: carrega 5 transações por vez com contador de itens restantes
- Estado vazio com mensagem quando nenhuma transação é encontrada

### 💸 Transferências (`/transferencias`)

**Passo 1: Destinatário**

- Seleção de tipo de transação via dropdown animado (Pix, TED, DOC, Boleto)
- Campo de busca por nome, CPF/CNPJ ou chave Pix
- Seleção rápida por lista de contatos

**Passo 2: Confirmação**

- **Sugestões automáticas de descrição** baseadas no tipo de transação selecionado
- Campo de descrição editável, preenchido automaticamente ao clicar em uma sugestão
- **Validação avançada** com mensagens de erro inline:
  - Tipo de transação obrigatório
  - Destinatário: nome mínimo de 3 caracteres, CPF com 11 dígitos ou CNPJ com 14
  - Valor: mínimo de R$ 0,01, máximo de R$ 50.000,00 e verificação de saldo disponível
- **Upload de anexos**: recibos e documentos em PNG, JPG ou PDF (máx. 5 MB por arquivo), com lista de arquivos anexados e opção de remover individualmente
- Exibição de saldo disponível e data da transferência

---

## 📚 Documentação e Figma

- Design System: https://zeroheight.com/76f12e925/p/3031ff-bem-vindo
- Protótipo no Figma: https://www.figma.com/design/4H56DbkbBQkWvqAcbzuPPI/Projeto-Challenge?node-id=0-1&t=Brv0APKQU1obfKnb-1
