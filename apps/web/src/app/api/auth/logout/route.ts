import { NextResponse } from "next/server"
import { SESSION_COOKIE, sessionCookieOptions } from "@/infrastructure/security/session"

/**
 * POST /api/auth/logout
 *
 * MUDANÇA (autenticação): antes "sair" não existia (o cleanup do contexto até
 * chamava localStorage.clear() sem querer). Agora o servidor expira o cookie
 * de sessão (maxAge 0), e o navegador o descarta.
 */
export async function POST() {
    const response = NextResponse.json({ ok: true })
    response.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 })
    return response
}
