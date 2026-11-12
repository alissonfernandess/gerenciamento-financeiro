import { NextRequest, NextResponse } from "next/server"
import { SESSION_COOKIE, sessionCookieOptions, verifySessionToken } from "@/infrastructure/security/session"
import { userRepository } from "@/infrastructure/server-container"
import { jsonError, toSessionUser } from "../_lib/http"

/**
 * GET /api/auth/me
 *
 * MUDANÇA (autenticação): devolve o usuário da sessão atual. É assim que o
 * navegador descobre quem está logado, já que ele não consegue mais ler o
 * cookie (httpOnly) nem existe mais usuário no localStorage.
 */
export async function GET(request: NextRequest) {
    const token = request.cookies.get(SESSION_COOKIE)?.value
    const session = token ? await verifySessionToken(token) : null
    if (!session) return jsonError("Não autenticado", 401)

    const user = await userRepository.findById(session.userId)
    if (!user) {
        // Sessão válida de um usuário que não existe mais: limpa o cookie para não
        // gerar um loop de redirecionamentos entre o proxy e a tela de login.
        const response = jsonError("Não autenticado", 401)
        response.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 })
        return response
    }

    // no-store: resposta é específica do usuário, nunca deve ficar em cache.
    return NextResponse.json({ user: toSessionUser(user) }, { headers: { "Cache-Control": "no-store" } })
}
