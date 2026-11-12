// MUDANÇA (Server Component): removido o `"use client"`. Este layout só importa um
// SCSS e renderiza HTML estático, sem hooks nem eventos, então pode rodar apenas no
// servidor. Resultado: menos JavaScript enviado ao navegador nas telas de cadastro e login.
import "./layout.scss"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="auth-layout">
      <div className="overlay">
        <div className="card">
          {children}
        </div>
      </div>
    </section>
  )
}