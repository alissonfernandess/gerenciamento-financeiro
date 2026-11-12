import { jwtVerify, SignJWT } from "jose"

/**
 * CAMADA: Infraestrutura (segurança) — sessão por JWT em cookie httpOnly
 *
 * MUDANÇA (autenticação): antes, "estar logado" era existir um item no
 * localStorage, que qualquer script (ou o próprio usuário) pode criar/editar.
 * Agora a sessão é um JWT ASSINADO pelo servidor (HS256) entregue em um cookie:
 *
 * - httpOnly: JavaScript do navegador NÃO consegue ler o cookie, então um
 *   ataque XSS não rouba a sessão (no localStorage roubaria).
 * - SameSite=Lax: o navegador não envia o cookie em requisições originadas de
 *   outros sites (proteção base contra CSRF).
 * - Secure (em produção): o cookie só trafega por HTTPS.
 * - Expira em 8h.
 *
 * O token carrega apenas o id do usuário (`sub`). JWT é assinado, NÃO cifrado:
 * qualquer um que o veja consegue ler o conteúdo, por isso nenhum dado pessoal
 * vai dentro dele.
 *
 * Este arquivo só usa `jose` (sem node:crypto), então funciona no proxy.ts e
 * nas rotas de API.
 */

export const SESSION_COOKIE = "session"
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8

function secret(): Uint8Array {
    const value = process.env.SESSION_SECRET
    if (!value || value.length < 32) {
        throw new Error("SESSION_SECRET ausente ou curto (mínimo 32 caracteres). Veja apps/web/.env.example.")
    }
    return new TextEncoder().encode(value)
}

export async function createSessionToken(userId: string): Promise<string> {
    return new SignJWT({})
        .setProtectedHeader({ alg: "HS256" })
        .setSubject(userId)
        .setIssuedAt()
        .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
        .sign(secret())
}

/** Valida assinatura e expiração. Retorna o id do usuário ou `null` (token inválido/expirado/adulterado). */
export async function verifySessionToken(token: string): Promise<{ userId: string } | null> {
    try {
        // `algorithms` fixa HS256: impede o ataque clássico de trocar o algoritmo do token.
        const { payload } = await jwtVerify(token, secret(), { algorithms: ["HS256"] })
        return payload.sub ? { userId: payload.sub } : null
    } catch {
        return null
    }
}

export function sessionCookieOptions() {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
        maxAge: SESSION_MAX_AGE_SECONDS,
    }
}
