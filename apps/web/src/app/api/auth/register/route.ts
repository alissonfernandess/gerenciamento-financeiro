import { NextResponse } from "next/server"
import { PhoneAlreadyRegisteredError } from "@/core/repositories/UserRepository"
import { normalizePhone, validateRegistration } from "@/core/services/AuthService"
import { accountRepository } from "@/infrastructure/container"
import { hashPassword } from "@/infrastructure/security/password"
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "@/infrastructure/security/session"
import { userRepository } from "@/infrastructure/server-container"
import { asString, jsonError, readJsonBody, toSessionUser } from "../_lib/http"

/**
 * POST /api/auth/register
 *
 * MUDANÇA (autenticação): substitui o antigo "cadastro" que só gravava nome e
 * telefone no localStorage. Fluxo seguro:
 *   1. valida a entrada com as regras do DOMÍNIO (o servidor nunca confia no cliente);
 *   2. gera o hash scrypt da senha;
 *   3. grava o usuário (telefone cifrado) pelo repositório;
 *   4. abre a sessão com um cookie httpOnly.
 *
 * Esta rota é só "cola": a regra está em core/, a segurança em infrastructure/.
 */
export async function POST(request: Request) {
    const body = await readJsonBody(request)
    if (!body) return jsonError("Requisição inválida", 400)

    const input = { nome: asString(body.nome), telefone: asString(body.telefone), senha: asString(body.senha) }

    const errors = validateRegistration(input)
    if (errors) return jsonError("Dados inválidos", 422, { errors })

    try {
        const user = await userRepository.create({
            name: input.nome.trim(),
            phone: normalizePhone(input.telefone),
            passwordHash: await hashPassword(input.senha),
            // Saldo inicial simulado (mesmo comportamento anterior), agora guardado
            // junto do usuário em vez de sorteado a cada carregamento da página.
            balance: accountRepository.getBalance(),
        })

        const response = NextResponse.json({ user: toSessionUser(user) }, { status: 201 })
        response.cookies.set(SESSION_COOKIE, await createSessionToken(user.id), sessionCookieOptions())
        return response
    } catch (error) {
        if (error instanceof PhoneAlreadyRegisteredError) {
            // Compromisso conhecido: avisar que o telefone existe facilita descobrir
            // quem tem conta, mas é necessário para o usuário entender o erro de cadastro.
            return jsonError("Este telefone já está cadastrado", 409, { errors: { telefone: "Telefone já cadastrado" } })
        }
        console.error("[auth/register]", error)
        return jsonError("Erro interno", 500)
    }
}
