"use client"

import Link from "next/link"
// Reaproveita os estilos do formulário de cadastro (mesmo visual de cartão e botão).
import "../cadastro/page.scss"
import { Input } from "@repo/ui"
import { useLogin } from "./hooks/useLogin"

/** MUDANÇA (autenticação): tela de login nova (rota /login). */
export default function LoginPage() {
    const { register, handleSubmit, errors, isSubmitting, handleLogin } = useLogin()

    return (
        <>
            <h1>Entre na sua conta</h1>

            <form className="cadastro-form" onSubmit={handleSubmit(handleLogin)} noValidate>
                <Input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    autoComplete="tel"
                    error={errors.telefone?.message || ' '}
                    {...register("telefone")}
                    required
                />

                <Input
                    type="password"
                    placeholder="Senha"
                    autoComplete="current-password"
                    error={errors.senha?.message || ' '}
                    {...register("senha")}
                    required
                />

                {errors.root?.message && <p className="form-error" role="alert">{errors.root.message}</p>}

                <button type="submit" className="btn-next" disabled={isSubmitting} aria-label="Entrar">
                    <span>›</span>
                </button>

                <span>Entrar</span>
            </form>

            <p className="auth-switch">
                Não tem conta? <Link href="/">Cadastre-se</Link>
            </p>
        </>
    )
}
