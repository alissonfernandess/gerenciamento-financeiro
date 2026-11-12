import { NextResponse } from "next/server"
import { normalizePhone, validateLogin } from "@/core/services/AuthService"
import { getDummyHash, verifyPassword } from "@/infrastructure/security/password"
import { consumeAttempt, resetAttempts } from "@/infrastructure/security/rateLimiter"
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "@/infrastructure/security/session"
import { userRepository } from "@/infrastructure/server-container"
import { asString, jsonError, readJsonBody, toSessionUser } from "../_lib/http"

const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000

/**
 * POST /api/auth/login
 *
 * MUDANÇA (autenticação): rota nova. Defesas aplicadas:
 *   - limite de 5 tentativas / 15 min por IP + telefone (força bruta);
 *   - mensagem ÚNICA para "telefone inexistente" e "senha errada" (não revela quais contas existem);
 *   - tempo de resposta igualado nos dois casos (ver getDummyHash).
 */
export async function POST(request: Request) {
    const body = await readJsonBody(request)
    if (!body) return jsonError("Requisição inválida", 400)

    const input = { telefone: asString(body.telefone), senha: asString(body.senha) }

    const errors = validateLogin(input)
    if (errors) return jsonError("Dados inválidos", 422, { errors })

    const phone = normalizePhone(input.telefone)
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local"
    const limiterKey = `login:${ip}:${phone}`

    const limit = consumeAttempt(limiterKey, MAX_ATTEMPTS, WINDOW_MS)
    if (!limit.allowed) {
        return NextResponse.json(
            { error: "Muitas tentativas. Tente novamente mais tarde." },
            { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
        )
    }

    try {
        const user = await userRepository.findByPhone(phone)
        // Se o usuário não existe, verificamos contra um hash falso só para gastar o mesmo tempo.
        const passwordOk = await verifyPassword(input.senha, user?.passwordHash ?? (await getDummyHash()))

        if (!user || !passwordOk) {
            return jsonError("Telefone ou senha inválidos", 401)
        }

        resetAttempts(limiterKey)

        const response = NextResponse.json({ user: toSessionUser(user) })
        response.cookies.set(SESSION_COOKIE, await createSessionToken(user.id), sessionCookieOptions())
        return response
    } catch (error) {
        console.error("[auth/login]", error)
        return jsonError("Erro interno", 500)
    }
}
