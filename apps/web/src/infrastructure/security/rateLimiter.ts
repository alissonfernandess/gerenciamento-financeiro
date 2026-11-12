/**
 * CAMADA: Infraestrutura (segurança) — limite de tentativas
 *
 * MUDANÇA (autenticação): sem limite, um atacante poderia testar milhares de
 * senhas por minuto. Aqui cada chave (IP + telefone) tem no máximo `max`
 * tentativas por janela de tempo; passou disso, o servidor responde 429.
 *
 * LIMITAÇÃO CONHECIDA: o contador fica em memória do processo. Serve para esta
 * entrega e para uma instância única; em produção com várias instâncias seria
 * preciso um armazenamento compartilhado.
 */

interface Bucket {
    count: number
    resetAt: number
}

// globalThis garante um único mapa mesmo com recarga de módulos (HMR) em desenvolvimento.
const globalStore = globalThis as unknown as { __rateLimitBuckets?: Map<string, Bucket> }
const buckets = (globalStore.__rateLimitBuckets ??= new Map<string, Bucket>())

export interface RateLimitResult {
    allowed: boolean
    retryAfterSeconds: number
}

/** Registra uma tentativa para `key` e diz se ela ainda é permitida. */
export function consumeAttempt(key: string, max: number, windowMs: number): RateLimitResult {
    const now = Date.now()
    const bucket = buckets.get(key)

    if (!bucket || bucket.resetAt <= now) {
        buckets.set(key, { count: 1, resetAt: now + windowMs })
        return { allowed: true, retryAfterSeconds: 0 }
    }

    bucket.count += 1
    if (bucket.count > max) {
        return { allowed: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) }
    }
    return { allowed: true, retryAfterSeconds: 0 }
}

/** Zera o contador (usado após um login bem-sucedido). */
export function resetAttempts(key: string): void {
    buckets.delete(key)
}
