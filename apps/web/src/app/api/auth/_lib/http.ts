import { NextResponse } from "next/server"
import type { User } from "@/core/entities/User"
import { maskPhone } from "@/core/services/AuthService"

/**
 * Helpers compartilhados pelas rotas /api/auth/*.
 * A pasta começa com `_` para o Next NÃO tratá-la como rota.
 */

/** Tamanho máximo do corpo aceito: evita requisições gigantes. */
const MAX_BODY_BYTES = 4 * 1024

/**
 * Lê o corpo JSON de forma defensiva. Retorna `null` se o Content-Type não for
 * application/json, se o corpo for grande demais ou se não for um objeto.
 *
 * Exigir application/json também ajuda contra CSRF: um <form> de outro site não
 * consegue enviar esse Content-Type sem disparar uma checagem (preflight) do
 * navegador, que o servidor não autoriza.
 */
export async function readJsonBody(request: Request): Promise<Record<string, unknown> | null> {
    if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) return null

    const text = await request.text()
    if (text.length > MAX_BODY_BYTES) return null

    try {
        const body: unknown = JSON.parse(text)
        return body && typeof body === "object" && !Array.isArray(body) ? (body as Record<string, unknown>) : null
    } catch {
        return null
    }
}

/** Converte qualquer valor em string (campos ausentes ou de tipo errado viram ""). */
export function asString(value: unknown): string {
    return typeof value === "string" ? value : ""
}

/**
 * Dados do usuário que PODEM ir para o navegador. O telefone sai mascarado e
 * o hash da senha nunca sai do servidor.
 */
export function toSessionUser(user: User) {
    return { nome: user.name, telefone: maskPhone(user.phone), saldo: user.balance }
}

export function jsonError(message: string, status: number, extra?: Record<string, unknown>) {
    return NextResponse.json({ error: message, ...extra }, { status })
}
