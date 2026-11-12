import type { UserRepository } from "@/core/repositories/UserRepository"
import { FileUserRepository } from "./repositories/FileUserRepository"

/**
 * CAMADA: Infraestrutura — Composition Root do LADO DO SERVIDOR
 *
 * MUDANÇA (autenticação): existe um container separado de `container.ts` de
 * propósito. O `container.ts` é importado pelo código do navegador; este aqui
 * usa `node:fs` e `node:crypto` e só pode ser importado por rotas de API e
 * proxy. Manter os dois separados impede que código de servidor (e suas chaves)
 * vá parar no bundle do cliente.
 */

// globalThis: uma única instância (e uma única fila de escrita) mesmo que o Next
// carregue este módulo mais de uma vez (bundles de rotas diferentes, HMR).
const globalStore = globalThis as unknown as { __userRepository?: UserRepository }

export const userRepository: UserRepository = (globalStore.__userRepository ??= new FileUserRepository())
