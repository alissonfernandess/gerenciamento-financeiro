"use client";

import "./Cadastro.scss";

interface CadastroProps {
  name: string;
  phone: string;
  isCadastro: boolean;
  onContinue: () => void;
  onBack: () => void;
}

export function Cadastro({ name, phone, isCadastro, onContinue }: CadastroProps) {
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