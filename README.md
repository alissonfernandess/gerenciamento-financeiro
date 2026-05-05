# Projeto inicial Turborepo (Turborepo starter)

Este projeto inicial do Turborepo é mantido pela equipe principal do Turborepo.

## Usando este exemplo

Execute o seguinte comando:

```sh
npx create-turbo@latest
```

## O que tem dentro?

Este Turborepo inclui os seguintes pacotes/aplicativos (packages/apps):

### Aplicativos e Pacotes

- `docs`: um aplicativo [Next.js](https://nextjs.org/)
- `web`: outro aplicativo [Next.js](https://nextjs.org/)
- `@repo/ui`: uma biblioteca de componentes React compartilhada pelos aplicativos `web` e `docs`
- `@repo/eslint-config`: configurações do `eslint` (inclui `eslint-config-next` e `eslint-config-prettier`)
- `@repo/typescript-config`: arquivos `tsconfig.json` usados em todo o monorepo

Cada pacote/aplicativo é 100% [TypeScript](https://www.typescriptlang.org/).

### Utilitários

Este Turborepo já tem algumas ferramentas adicionais configuradas para você:

- [TypeScript](https://www.typescriptlang.org/) para verificação estática de tipos
- [ESLint](https://eslint.org/) para linting de código
- [Prettier](https://prettier.io) para formatação de código

### Compilar (Build)

Para compilar (build) todos os aplicativos e pacotes, execute o seguinte comando:

Com o [`turbo` global](https://turborepo.dev/docs/getting-started/installation#global-installation) instalado (recomendado):

```sh
cd my-turborepo
turbo build
```

Sem o `turbo` global, use o seu gerenciador de pacotes:

```sh
cd my-turborepo
npx turbo build
yarn dlx turbo build
yarn exec turbo build
```

Você pode compilar um pacote específico usando um [filtro](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

Com o [`turbo` global](https://turborepo.dev/docs/getting-started/installation#global-installation) instalado:

```sh
turbo build --filter=docs
```

Sem o `turbo` global:

```sh
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
yarn exec turbo build --filter=docs
```

### Desenvolver (Develop)

Para desenvolver todos os aplicativos e pacotes, execute o seguinte comando:

Com o [`turbo` global](https://turborepo.dev/docs/getting-started/installation#global-installation) instalado (recomendado):

```sh
cd my-turborepo
turbo dev
```

Sem o `turbo` global, use o seu gerenciador de pacotes:

```sh
cd my-turborepo
npx turbo dev
yarn exec turbo dev
yarn exec turbo dev
```

Você pode desenvolver num pacote específico usando um [filtro](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

Com o [`turbo` global](https://turborepo.dev/docs/getting-started/installation#global-installation) instalado:

```sh
turbo dev --filter=web
```

Sem o `turbo` global:

```sh
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
yarn exec turbo dev --filter=web
```

### Cache Remoto (Remote Caching)

> [!TIP]
> O Vercel Remote Cache é gratuito para todos os planos. Comece hoje mesmo em [vercel.com](https://vercel.com/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

O Turborepo pode usar uma técnica conhecida como [Remote Caching (Cache Remoto)](https://turborepo.dev/docs/core-concepts/remote-caching) para compartilhar artefatos de cache entre máquinas, permitindo que você compartilhe caches de build com a sua equipe e pipelines de CI/CD.

Por padrão, o Turborepo armazenará o cache localmente. Para habilitar o Cache Remoto, você precisará de uma conta com a Vercel. Se você não tiver uma conta, você pode [criar uma](https://vercel.com/signup?utm_source=turborepo-examples), e então inserir os seguintes comandos:

Com o [`turbo` global](https://turborepo.dev/docs/getting-started/installation#global-installation) instalado (recomendado):

```sh
cd my-turborepo
turbo login
```

Sem o `turbo` global, use o seu gerenciador de pacotes:

```sh
cd my-turborepo
npx turbo login
yarn exec turbo login
yarn exec turbo login
```

Isso autenticará a CLI do Turborepo com a sua [conta Vercel](https://vercel.com/docs/concepts/personal-accounts/overview).

A seguir, você pode vincular o seu Turborepo ao seu Cache Remoto executando o seguinte comando a partir da raiz do seu Turborepo:

Com o [`turbo` global](https://turborepo.dev/docs/getting-started/installation#global-installation) instalado:

```sh
turbo link
```

Sem o `turbo` global:

```sh
npx turbo link
yarn exec turbo link
yarn exec turbo link
```

## Links Úteis

Aprenda mais sobre o poder do Turborepo:

- [Tarefas (Tasks)](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Armazenamento em Cache (Caching)](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Cache Remoto (Remote Caching)](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtros (Filtering)](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Opções de Configuração](https://turborepo.dev/docs/reference/configuration)
- [Uso da CLI](https://turborepo.dev/docs/reference/command-line-reference)

## 📚 Documentação

Acesse a documentação do Design System:
👉 https://zeroheight.com/76f12e925/p/3031ff-bem-vindo


## Figma 

Acesse o protótipo no Figma:
👉https://www.figma.com/design/4H56DbkbBQkWvqAcbzuPPI/Projeto-Challenge?node-id=0-1&t=Brv0APKQU1obfKnb-1

