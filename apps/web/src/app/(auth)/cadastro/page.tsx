"use client"

import "./page.scss"
import { Input } from "@repo/ui"
import { useCadastro } from "./hooks/useCadastro"

export default function CadastroPage() {
    const { register, handleSubmit, errors, handleNext } = useCadastro()

    return (
        <>
            <h1>Cadastre sua conta</h1>

            <form className="cadastro-form" onSubmit={handleSubmit(handleNext)} noValidate>
                <Input
                    type="text"
                    error={errors.nome?.message || '\u00A0'}
                    {...register("nome", {
                        required: "Nome é obrigatório",
                    })}
                    required
                />

                <Input
                    type="number"
                    error={errors.telefone?.message || '\u00A0'}
                    {...register("telefone", {
                        required: "Telefone é obrigatório",
                    })}
                    required
                />

                <button type="submit" className="btn-next">
                    <span>›</span>
                </button>

                <span>Continuar</span>
            </form>
        </>
    )
}