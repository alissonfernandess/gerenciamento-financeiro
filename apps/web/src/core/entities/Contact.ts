/**
 * CAMADA: Domínio (core/entities)
 *
 * MUDANÇA: substitui o tipo global `IContato` de `types/global.d.ts`.
 * Importar `Contact` explicitamente deixa claro quem depende da entidade.
 */
export interface Contact {
    name: string
}
