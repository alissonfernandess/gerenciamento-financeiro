"use client";

import "./Cadastro.scss";

export function Cadastro() {
  return (
    <section className="cadastro">
      <div className="overlay">
        <div className="card">
          <h1>Cadastre sua conta</h1>

          <form className="form">
            <input type="text" placeholder="Nome Completo" />
            <input type="tel" placeholder="Telefone" />

            <button type="submit" className="btn-next">
              <span>›</span>
            </button>

            <span>Continuar</span>
          </form>
        </div>
      </div>
    </section>
  );
}