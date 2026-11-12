/**
 * MUDANÇA (lazy loading): o Next mostra este componente automaticamente enquanto
 * o código de uma página do dashboard ainda está sendo baixado/carregado. O Next
 * divide o código por rota (cada página vira um arquivo JS separado, baixado só
 * quando visitado), e este fallback evita a tela em branco nesse intervalo.
 * É um Server Component (sem "use client"): não adiciona JavaScript ao navegador.
 */
export default function Loading() {
    return (
        <p role="status" aria-live="polite" style={{ color: "#fff", padding: 24 }}>
            Carregando…
        </p>
    )
}
