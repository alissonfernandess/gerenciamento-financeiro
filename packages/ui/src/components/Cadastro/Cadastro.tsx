"use client";

import { useState } from "react";
import "./Cadastro.scss";

interface CadastroProps {
  name: string;
  phone: string;
  isCadastro: boolean;
  onContinue: (name: string, phone: string) => void;
  onBack: () => void;
}

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11)
  if (digits.length <= 10) {
    return digits
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
  }
  return digits
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
}

export function Cadastro({ name: initialName, phone: initialPhone, isCadastro, onContinue, onBack }: CadastroProps) {
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);

  return (
    <section className="cadastro">
      <div className="overlay">
        <div className="card">
          <h1>Cadastre sua conta</h1>

          <form className="form" onSubmit={(e) => { e.preventDefault(); onContinue(name, phone); }}>
            <input
              type="text"
              placeholder="Nome Completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ color: '#091B32' }}
            />
            <input
              type="text"
              inputMode="numeric"
              placeholder="(11) 99999-9999"
              value={phone}
              onChange={(e) => setPhone(maskPhone(e.target.value))}
            />

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