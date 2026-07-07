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
                <label className="label-form">
                    <span>Nome</span>
                    <Input
                        type="text"
                        placeholder="Nome"
                        error={errors.nome?.message || '\u00A0'}
                        {...register("nome", {
                            required: "Nome é obrigatório",
                        })}
                        required
                    />

                </label>

                <label className="label-form">
                    <span>Telefone</span>
                    <Input
                        type="tel"
                        placeholder="(11) 99999-9999"
                        error={errors.telefone?.message || '\u00A0'}
                        {...register("telefone", {
                            required: "Telefone é obrigatório",
                        })}
                        required
                    />
                
                </label>        

                <button type="submit" className="btn-next" style={{
                    width: "auto"
                }}>
                    
                    <span>Continuar</span>
                </button>

          
            </form>
        </>
    )
}