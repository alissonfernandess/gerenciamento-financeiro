"use client"

import "./layout.scss"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="cadastro">
      <div className="overlay">
        <div className="card">
          {children}
        </div>
      </div>
    </section>
  )
}