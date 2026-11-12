# Estudo: jose e JWT (sessão por cookie assinado)

> **Área:** Segurança de aplicações web / autenticação · **Tipo de conhecimento:** tecnologia + conceitual · **Nível assumido:** você domina JS/TS, HTTP e React; já viu cookies, mas não sabe como uma sessão "sem banco" funciona · **Tempo estimado:** 2 a 3 horas, em 2 sessões

**Arquivos do projeto que este estudo explica:** `infrastructure/security/session.ts`, `proxy.ts` e as rotas `app/api/auth/{login,register,logout,me}/route.ts`.

---

## 0. Antes de ler (5 minutos)

No tablet, responda sem consultar:

1. Depois do login, como o servidor sabe quem é você nas próximas requisições?
2. Um JWT é criptografado? Quem consegue ler o conteúdo dele?
3. O que impede um usuário de editar o JWT dele e trocar o `sub` por outro id?
4. Onde guardar o token: `localStorage` ou cookie? Qual o risco de cada um?

---

## 1. Como estudar este tema

| Técnica | Como aplicar neste tema | Onde |
|---|---|---|
| Prever antes de executar | Antes de decodificar o JWT da seção 4.3, preveja o que aparece em cada um dos 3 pedaços. | Terminal |
| Quebrar de propósito | Altere um caractere do meio do payload, altere o algoritmo para `none`, expire o token. Anote o que `jwtVerify` responde em cada caso. | Terminal |
| Diagrama à mão | Desenhe o fluxo: login → cookie → requisição → `proxy.ts` → rota protegida. Marque onde o token é criado e onde é verificado. | Tablet |
| Exemplo com lacunas | Exercícios da seção 7 antes do gabarito. | Tablet |
| Revisão seção por seção | Depois de estudar, volte ao documento e responda as perguntas de recuperação da seção 8, uma seção por vez, cobrindo o texto. | Tablet |

---

## 2. Visão geral

**Em uma frase:** um JWT é um pequeno texto assinado que diz "este usuário está autenticado até tal hora", e a biblioteca `jose` cria e verifica esse texto no projeto.

**Em um parágrafo:** em vez de guardar a sessão no servidor (tabela de sessões), o servidor entrega ao navegador um token assinado com um segredo que só ele conhece. A cada requisição o navegador devolve o token em um cookie, e o servidor verifica a assinatura. Se bater, confia no conteúdo. A `jose` é uma biblioteca JavaScript que implementa JWT/JWS usando a Web Crypto API, então funciona em Node, edge e navegador. Aqui usamos só um pedaço dela: assinar com **HS256** e verificar.

---

## 3. Fundamentos necessários

```mermaid
flowchart LR
  A[HTTP é sem estado] --> B[Cookies]
  B --> C[Atributos: HttpOnly, SameSite, Secure]
  D[HMAC] --> E[Assinatura HS256]
  F[Base64url] --> G[Estrutura do JWT]
  E --> G
  G --> H[Sessão com jose]
  C --> H
```

**3.1 HTTP é sem estado.** Cada requisição chega sem memória das anteriores. Para "lembrar" quem é o usuário, algo precisa ir junto em cada requisição. *Por que precisa:* é o problema que a sessão resolve.

**3.2 Cookies.** O servidor manda `Set-Cookie`, e o navegador devolve o cookie automaticamente em toda requisição ao mesmo site. *Por que precisa:* é o meio de transporte do token.

**3.3 HMAC.** Hash com chave secreta (ver `estudo-node-crypto.md`). Quem não tem a chave não consegue produzir uma assinatura válida. *Por que precisa:* é o que torna o token inforjável no HS256.

**3.4 Base64url.** Codificação de bytes em texto seguro para URLs e cookies. Não é criptografia.

**3.5 Assinatura x criptografia.** Assinar garante **integridade e origem** (ninguém alterou, fomos nós que geramos). Não esconde o conteúdo. *Por que precisa:* é a confusão mais comum sobre JWT.

---

## 4. O conceito em profundidade

### 4.1 Anatomia do JWT

Um JWT tem três partes separadas por ponto: `header.payload.assinatura`.

| Parte | Conteúdo | Exemplo (decodificado) |
|---|---|---|
| Header | Algoritmo e tipo | `{"alg":"HS256"}` |
| Payload | Claims (afirmações) | `{"sub":"c5906f52-...","iat":1794340000,"exp":1794368800}` |
| Assinatura | HMAC-SHA256 de `header.payload` com o segredo | 43 caracteres base64url |

Claims usados no projeto:

| Claim | Significado | No projeto |
|---|---|---|
| `sub` | *subject*: de quem é o token | id do usuário |
| `iat` | *issued at*: quando foi emitido | momento do login |
| `exp` | *expiration*: quando deixa de valer | `iat` + 8 h (28800 s) |

O payload tem **só o `sub`**, de propósito: qualquer pessoa lê o payload (basta decodificar base64url), então nenhum dado sensível entra nele.

### 4.2 Como a assinatura funciona

```
assinatura = HMAC-SHA256(segredo, base64url(header) + "." + base64url(payload))
```

Ao verificar, o servidor **recalcula** a assinatura com o segredo e compara. Se alguém alterar o payload, a assinatura recalculada não bate, e o token é rejeitado. O atacante não consegue gerar uma assinatura nova sem o segredo.

### 4.3 Código do projeto (`session.ts`, simplificado)

```ts
import { SignJWT, jwtVerify } from "jose"

const secret = new TextEncoder().encode(process.env.SESSION_SECRET) // 1. jose quer bytes, não string

export async function createSessionToken(userId: string) {
    return new SignJWT({})                       // 2. payload vazio (só claims registrados)
        .setProtectedHeader({ alg: "HS256" })    // 3. algoritmo no header
        .setSubject(userId)                      // 4. sub
        .setIssuedAt()                           // 5. iat = agora
        .setExpirationTime("28800s")             // 6. exp = agora + 8h
        .sign(secret)                            // 7. gera "header.payload.assinatura"
}

export async function verifySessionToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] }) // 8. confere assinatura E exp
        return payload.sub ? { userId: payload.sub } : null
    } catch {
        return null                              // 9. qualquer falha vira "sem sessão"
    }
}
```

> Simplificação para estudo; o arquivo real também valida o tamanho do `SESSION_SECRET` (≥ 32 caracteres).

**Pontos para entender:**
- `jwtVerify` já valida a **expiração**. Não precisa conferir `exp` na mão.
- `algorithms: ["HS256"]` é uma **lista de permissão**: o servidor decide qual algoritmo aceita, e não o token (ver 4.6).
- Todo erro (assinatura errada, expirado, malformado) vira `null`. A rota responde 401 sem dizer o motivo.

### 4.4 O cookie

O token vai num cookie com estes atributos (`sessionCookieOptions()`):

| Atributo | Valor | Ataque que ajuda a impedir |
|---|---|---|
| `HttpOnly` | sim | **XSS**: JavaScript da página não consegue ler o cookie, então um script injetado não rouba o token |
| `Secure` | só em produção | **Interceptação**: o cookie só trafega por HTTPS |
| `SameSite=Lax` | lax | **CSRF**: o navegador não envia o cookie em requisições cross-site disparadas por POST |
| `Path=/` | / | Cookie vale para o site inteiro |
| `Max-Age` | 8 h | Cookie some do navegador junto com a expiração do token |

Por isso **não usamos `localStorage`**: qualquer script da página consegue ler, então uma única falha de XSS entrega a sessão.

### 4.5 Fluxo completo (o que acontece em cada etapa)

1. `POST /api/auth/login` com telefone e senha.
2. A rota valida, aplica limite de tentativas, verifica a senha (scrypt).
3. Se correto: `createSessionToken(user.id)` → resposta com `Set-Cookie: session=<jwt>; HttpOnly; ...`.
4. O navegador guarda o cookie e o devolve em toda requisição.
5. `GET /dashboard`: o `proxy.ts` lê o cookie, chama `verifySessionToken`. Sem sessão válida → redireciona 307 para `/login`.
6. `GET /api/auth/me`: lê o cookie, verifica, busca o usuário pelo `sub` e devolve os dados (telefone mascarado).
7. `POST /api/auth/logout`: responde com o mesmo cookie com `Max-Age=0`, que apaga o cookie no navegador.

### 4.6 Exemplo trabalhado: quebrando o token

Use o token de estudo (segredo `segredo-de-estudo-apenas-para-aprender-1234567890`):

```
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjNTkwNmY1Mi1hMTYyLTQwNzctODA3MC01YWE1MTczYWNhNzgiLCJpYXQiOjE3OTQzNDAwMDAsImV4cCI6MTc5NDM2ODgwMH0.yI8QUXG7GLRPVwCJZ0QL4jkcVSgxIFtjeCjr1KDdciQ
```

**Passo 1 — decodificar sem segredo.** O header (`eyJhbGciOiJIUzI1NiJ9`) vira `{"alg":"HS256"}`. O payload vira `{"sub":"c5906f52-a162-4077-8070-5aa5173aca78","iat":1794340000,"exp":1794368800}`. **Qualquer um lê isso.** Confirme: `exp - iat = 28800` segundos = 8 horas.

**Passo 2 — adulterar o payload.** Troque um caractere do **meio** do payload e envie. `jwtVerify` rejeita, porque a assinatura recalculada deixa de coincidir.

> Cuidado ao testar: alterar o **último** caractere de um trecho base64url pode mudar só bits de preenchimento sem efeito, e o token seguiria válido. Por isso altere um caractere do meio.

**Passo 3 — `alg: none`.** Um atacante monta um token com `{"alg":"none"}` e sem assinatura. Como o código passa `algorithms: ["HS256"]`, o `jose` recusa. Isso protege contra o ataque clássico em que a biblioteca confiava no algoritmo declarado pelo próprio token.

**Passo 4 — token expirado.** Depois de `exp`, `jwtVerify` lança erro de expiração, mesmo com assinatura perfeita.

**Resultado nos testes do projeto:** token original aceito; token com payload/assinatura alterados, `alg=none` e lixo foram todos rejeitados (307 nas páginas, 401 na API).

### 4.7 Limites e contraexemplos

- **Não dá para revogar um JWT antes do `exp`.** O logout só apaga o cookie **no navegador**. Se o token tiver vazado, ele continua válido por até 8 h. Mitigações: expiração curta, lista de revogação ou sessões no servidor.
- **O segredo é o ponto único de falha.** Quem o obtém forja sessão de qualquer usuário. Guardar só em variável de ambiente, nunca no Git; trocar o segredo invalida todas as sessões.
- **HS256 usa a mesma chave para assinar e verificar.** Se vários serviços precisam *verificar* tokens, todos teriam o segredo de *assinar*. Nesse caso, usa-se RS256/ES256 (par de chaves).
- **Payload não é secreto.** Nada de telefone, senha ou saldo nele.
- **Cookie `SameSite=Lax` não é uma defesa completa contra CSRF.** O projeto reforça exigindo `Content-Type: application/json` nas rotas POST, que um formulário cross-site não consegue enviar.

### 4.8 Erros comuns

- Achar que JWT é criptografado.
- Guardar dados sensíveis no payload.
- Guardar o token em `localStorage`.
- Não definir `algorithms` ao verificar.
- Segredo curto ou previsível.
- Esquecer a expiração, ou deixá-la longa demais.
- Confiar em decodificar (`decodeJwt`) sem **verificar** a assinatura.
- Achar que o logout invalida o token.
- Tratar a verificação no `proxy.ts` como única barreira (ver `estudo-nextjs-seguranca.md`).

---

## 5. Conexões e confusões

| Termo | Diferença |
|---|---|
| **JWT** x **JWS** x **JWE** | JWT é o formato de claims. JWS é o JWT **assinado** (é o que usamos). JWE é o JWT **criptografado** (não usamos). |
| **Assinar** x **criptografar** | Assinar prova integridade, mas o conteúdo continua legível. |
| **Sessão no servidor** x **JWT** | Sessão no servidor guarda o estado num banco e pode ser revogada. O JWT guarda o estado no token e escala sem banco, mas é difícil revogar. |
| **HS256** x **RS256** | HS256: um segredo compartilhado. RS256: chave privada assina, chave pública verifica. |
| **Autenticação** x **autorização** | Autenticação: quem é você. Autorização: o que você pode fazer. O JWT aqui só cobre a primeira. |
| **`HttpOnly`** x **`Secure`** x **`SameSite`** | Protegem, respectivamente, de leitura por JS, de tráfego sem HTTPS e de envio cross-site. |

---

## 6. Glossário

- **Claim:** afirmação dentro do payload (`sub`, `exp`).
- **CSRF:** ataque em que outro site faz o navegador enviar uma requisição autenticada.
- **HS256:** assinatura HMAC com SHA-256.
- **JWS:** JWT assinado.
- **JWT:** *JSON Web Token*.
- **Payload:** conteúdo do token (legível por qualquer um).
- **Revogação:** invalidar um token antes de expirar.
- **Sessão:** período em que o servidor reconhece o usuário como autenticado.
- **XSS:** injeção de script malicioso na página.

---

## 7. Autoteste

1. Explique por que o payload do JWT não pode conter o telefone do usuário.
2. O que o servidor faz em `jwtVerify` que impede um usuário de trocar o `sub`?
3. Para que serve `algorithms: ["HS256"]`?
4. Por que o token fica em cookie `HttpOnly` e não em `localStorage`?
5. O usuário clicou em "Sair", mas alguém já tinha copiado o token. Ele ainda funciona? Por quê?
6. Se `SESSION_SECRET` vazar, o que um atacante consegue fazer?
7. Qual ataque o `SameSite=Lax` ajuda a evitar, e o que o projeto adiciona para reforçar?
8. Por que `exp - iat` dá 28800?

**Lacunas A.** Complete a criação do token:

```ts
return new SignJWT({})
    .setProtectedHeader({ alg: /* ??? 1 */ })
    .setSubject(/* ??? 2 */)
    .setIssuedAt()
    .setExpirationTime(/* ??? 3 */)
    .sign(/* ??? 4 */)
```

**Lacunas B.** Complete a verificação:

```ts
const { payload } = await jwtVerify(token, secret, { /* ??? 1 */: ["HS256"] })
return payload.sub ? { userId: /* ??? 2 */ } : null
```

### Gabarito

1. O payload é só base64url, qualquer pessoa decodifica sem segredo. Ele só tem o `sub`.
2. Recalcula a assinatura com o segredo e compara. Mudar o `sub` muda o `header.payload`, e o atacante não consegue gerar a nova assinatura sem o segredo.
3. Define a lista de algoritmos que **o servidor** aceita, e não o token. Impede `alg: none` e troca de algoritmo.
4. `HttpOnly` impede que JavaScript da página leia o cookie, então um XSS não rouba o token. `localStorage` é legível por qualquer script.
5. Sim. O logout só apaga o cookie do navegador; o JWT continua válido até o `exp`, porque o servidor não guarda lista de sessões.
6. Forjar tokens válidos para qualquer usuário. É preciso trocar o segredo, o que invalida todas as sessões.
7. CSRF. O projeto exige `Content-Type: application/json` nas rotas POST, que formulários cross-site não conseguem enviar.
8. 8 horas × 3600 s = 28800 s.

**Lacunas A:** 1) `"HS256"` 2) `userId` 3) `"28800s"` (ou `"8h"`) 4) `secret`.
**Lacunas B:** 1) `algorithms` 2) `payload.sub`.

---

## 8. Revisão seção por seção

A revisão é feita no próprio documento, seção por seção.

Método em cada revisão, **uma seção por vez**:

1. Leia só o título da seção e **cubra o texto** (com a mão ou com uma folha).
2. Responda a pergunta de recuperação da tabela abaixo **por escrito, no tablet**, sem olhar.
3. Descubra o texto e compare. Marque ✔ (acertei) ou ✗ (errei ou esqueci) na margem.
4. Reescreva **só a parte errada** com suas palavras. Seções ✗ voltam primeiro na próxima revisão.

| Seção | Pergunta de recuperação (responda cobrindo o texto) |
|---|---|
| 2 e 3 | O que é um JWT e como ele resolve o fato de o HTTP não ter estado? |
| 4.1 | Quais são as 3 partes do JWT e o que significam `sub`, `iat` e `exp`? Por que o payload não leva dados sensíveis? |
| 4.2 e 4.3 | Como a assinatura é calculada e o que `jwtVerify` confere? Para que serve `algorithms`? |
| 4.4 | Para cada atributo do cookie (HttpOnly, Secure, SameSite), diga qual ataque ele ajuda a impedir. |
| 4.5 | Descreva o fluxo login → cookie → proxy → `/me` → logout. |
| 4.6 | Que 4 testes de quebra fizemos no token e qual o resultado de cada um? |
| 4.7 | Liste os limites: revogação, segredo único, HS256 x RS256, CSRF. |

> Dica: se quiser anotar com a caneta direto no documento, exporte para PDF e use um app de anotação no tablet.

---

## 9. Plano de revisão

Todas as revisões seguem o método da seção 8. O foco muda a cada data:

| Quando | Seções a revisar | O que fazer além do método |
|---|---|---|
| Dia 1 | Todas, na ordem | Decodifique o token de estudo e refaça o diagrama do fluxo. |
| Dia 3 | Só as marcadas ✗ + 4.4 e 4.5 | Redesenhe o fluxo de memória. Refaça as lacunas da seção 7. |
| 1 semana | Todas | Autoteste inteiro. Explique em voz alta por que o JWT não é criptografado. |
| 2 semanas | 4.2 a 4.5 | Abra `session.ts` sem o estudo e explique cada linha e cada atributo do cookie. |
| 1 mês | Marcadas ✗ + 4.7 | Reescreva `createSessionToken` e `verifySessionToken` do zero com a documentação do `jose`. |

Se uma seção sair ✗ duas vezes seguidas, releia-a inteira antes de seguir. Releitura passiva do documento todo não conta como revisão.

---

## 10. Para aprofundar

- Documentação da biblioteca `jose` (github.com/panva/jose): `SignJWT` e `jwtVerify`.
- RFC 7519 (JWT), RFC 7515 (JWS).
- OWASP, *JSON Web Token Cheat Sheet* e *Session Management Cheat Sheet*.
- MDN, *Set-Cookie* (atributos `HttpOnly`, `Secure`, `SameSite`).
