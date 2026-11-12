/**
 * CAMADA: Domínio (core/entities)
 *
 * MUDANÇA (autenticação): até agora o "usuário" era só `{ nome, telefone }`
 * guardado no localStorage do navegador, sem senha e sem identidade real.
 * Agora o usuário é uma entidade do domínio, com id, e persistido no servidor.
 *
 * `phone` aqui é o telefone em texto puro (só dígitos). A criptografia dele é
 * um detalhe de PERSISTÊNCIA e acontece dentro do repositório (infrastructure),
 * então o domínio nunca precisa saber como o dado é guardado.
 */
export interface User {
    id: string
    name: string
    phone: string
    balance: number
}

/** Usuário + hash da senha. Só existe para quem precisa verificar credenciais (login). */
export interface UserWithCredentials extends User {
    passwordHash: string
}

/** Dados necessários para criar um usuário (o id é gerado pelo repositório). */
export interface NewUser {
    name: string
    phone: string
    passwordHash: string
    balance: number
}
