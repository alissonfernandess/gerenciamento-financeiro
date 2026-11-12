import { NextResponse, type NextRequest } from "next/server"
import { SESSION_COOKIE, verifySessionToken } from "@/infrastructure/security/session"

/**
 * PROXY (no Next 16, o antigo `middleware.ts`) — porteiro das rotas.
 *
 * MUDANÇA (autenticação): antes a proteção era feita NO NAVEGADOR (o layout do
 * dashboard olhava o localStorage), o que é só aparência: a página já tinha
 * sido enviada. Agora a checagem acontece NO SERVIDOR, antes de qualquer página
 * protegida ser renderizada:
 *   - sem sessão válida em rota protegida → redireciona para /login;
 *   - com sessão válida em /login, / ou /cadastro → redireciona para /dashboard.
 */

const PROTECTED_ROUTES = ["/dashboard", "/extrato", "/transferencias", "/bem-vindo"]
const AUTH_ROUTES = ["/", "/login", "/cadastro"]

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    const token = request.cookies.get(SESSION_COOKIE)?.value
    // verifySessionToken confere assinatura E expiração: um cookie forjado ou vencido vale como "sem sessão".
    const session = token ? await verifySessionToken(token) : null

    const isProtected = PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))

    if (isProtected && !session) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    if (AUTH_ROUTES.includes(pathname) && session) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
}

// O matcher limita o proxy às páginas que importam: não roda em /api, arquivos estáticos nem _next.
export const config = {
    matcher: ["/", "/login", "/cadastro", "/dashboard/:path*", "/extrato/:path*", "/transferencias/:path*", "/bem-vindo/:path*"],
}
