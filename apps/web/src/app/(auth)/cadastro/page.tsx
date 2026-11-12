"use client"

import Link from "next/link"
import "./page.scss"
import { Input } from "@repo/ui"
import { useCadastro } from "./hooks/useCadastro"

export default function CadastroPage() {
    const { register, handleSubmit, errors, isSubmitting, handleNext } = useCadastro()

    return (
        <>
            <h1>Cadastre sua conta</h1>

            <form className="cadastro-form" onSubmit={handleSubmit(handleNext)} noValidate>
                <Input
                    type="text"
                    placeholder="Nome"
                    autoComplete="name"
                    error={errors.nome?.message || ' '}
                    {...register("nome")}
                    required
                />

                <Input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    autoComplete="tel"
                    error={errors.telefone?.message || ' '}
                    {...register("telefone")}
                    required
                    />

                {/* MUDANÇA (autenticação): novo campo de senha. type="password" esconde o
                    texto e autoComplete="new-password" permite o gerenciador de senhas do
                    navegador sugerir uma senha forte. As regras de validação agora vêm do
                    domínio (AuthService), não mais do `required` solto aqui. */}
                <Input
                    type="password"
                    placeholder="Senha (mín. 8, letras e números)"
                    autoComplete="new-password"
                    error={errors.senha?.message || ' '}
                    {...register("senha")}
                    required
                />

                {errors.root?.message && <p className="form-error" role="alert">{errors.root.message}</p>}

                <button type="submit" className="btn-next" disabled={isSubmitting} aria-label="Continuar">
                    <span>›</span>
                </button>

                <span>Continuar</span>
            </form>

            <p className="auth-switch">
                Já tem conta? <Link href="/login">Entrar</Link>
            </p>
        </>
    )
}
