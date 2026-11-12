/**
 * CAMADA: Domínio (core/services) — Domain Service
 *
 * MUDANÇA (autenticação): regras de negócio de cadastro/login como funções
 * PURAS (sem React, sem fetch, sem crypto). Por isso rodam nos dois lados:
 * - no navegador, para dar feedback imediato no formulário;
 * - no servidor (rotas /api/auth/*), que é quem REALMENTE protege o sistema.
 * Nunca se confia só na validação do cliente: o servidor sempre revalida.
 */

export type AuthField = "nome" | "telefone" | "senha"
export type FieldErrors = Partial<Record<AuthField, string>>

export interface RegistrationInput {
    nome: string
    telefone: string
    senha: string
}

export interface LoginInput {
    telefone: string
    senha: string
}

/** Regra: senha com no mínimo 8 caracteres, ao menos 1 letra e 1 número. */
export const PASSWORD_MIN_LENGTH = 8
/** Limite máximo evita enviar senhas gigantes só para gastar CPU no hash (DoS). */
export const PASSWORD_MAX_LENGTH = 128

/** Mantém só os dígitos: "(11) 99999-9999" → "11999999999". */
export function normalizePhone(raw: string): string {
    return raw.replace(/\D/g, "")
}

/** Telefone brasileiro com DDD: 10 dígitos (fixo) ou 11 (celular). */
export function isPhoneValid(raw: string): boolean {
    const digits = normalizePhone(raw)
    return digits.length === 10 || digits.length === 11
}

function validatePassword(senha: string): string | undefined {
    if (senha.length < PASSWORD_MIN_LENGTH) {
        return `A senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres`
    }
    if (senha.length > PASSWORD_MAX_LENGTH) {
        return `A senha deve ter no máximo ${PASSWORD_MAX_LENGTH} caracteres`
    }
    if (!/[A-Za-z]/.test(senha) || !/\d/.test(senha)) {
        return "A senha deve conter letras e números"
    }
    return undefined
}

/** Valida o cadastro. Retorna `null` se estiver tudo certo, ou os erros por campo. */
export function validateRegistration(input: RegistrationInput): FieldErrors | null {
    const errors: FieldErrors = {}
    const nome = input.nome.trim()

    if (!nome) errors.nome = "Nome é obrigatório"
    else if (nome.length < 3) errors.nome = "O nome deve ter pelo menos 3 caracteres"
    else if (nome.length > 80) errors.nome = "O nome deve ter no máximo 80 caracteres"

    if (!input.telefone.trim()) errors.telefone = "Telefone é obrigatório"
    else if (!isPhoneValid(input.telefone)) errors.telefone = "Informe um telefone válido com DDD"

    const passwordError = input.senha ? validatePassword(input.senha) : "Senha é obrigatória"
    if (passwordError) errors.senha = passwordError

    return Object.keys(errors).length ? errors : null
}

/**
 * Valida o formato do login. NÃO aplica a regra de força da senha aqui:
 * no login só importa se as credenciais batem, e dizer "senha fraca" revelaria
 * detalhes da política desnecessariamente.
 */
export function validateLogin(input: LoginInput): FieldErrors | null {
    const errors: FieldErrors = {}

    if (!input.telefone.trim()) errors.telefone = "Telefone é obrigatório"
    else if (!isPhoneValid(input.telefone)) errors.telefone = "Informe um telefone válido com DDD"

    if (!input.senha) errors.senha = "Senha é obrigatória"
    else if (input.senha.length > PASSWORD_MAX_LENGTH) errors.senha = "Senha inválida"

    return Object.keys(errors).length ? errors : null
}

/**
 * Mascara o telefone para exibição: "11999999999" → "(11) *****-9999".
 * O telefone completo não precisa trafegar para a tela: mostrar só o final
 * reduz a exposição de dado pessoal (princípio do menor privilégio).
 */
export function maskPhone(phone: string): string {
    const digits = normalizePhone(phone)
    if (digits.length < 6) return "****"
    const ddd = digits.slice(0, 2)
    const last4 = digits.slice(-4)
    const hidden = "*".repeat(digits.length - 6)
    return `(${ddd}) ${hidden}-${last4}`
}
