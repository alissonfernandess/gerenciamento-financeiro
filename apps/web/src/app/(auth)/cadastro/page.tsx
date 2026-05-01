"use client"

import { useRouter } from "next/navigation"


import "./page.scss"
import { useForm } from "react-hook-form"
import { keys, Input } from "@repo/ui"

interface IFormData {
    nome: string;
    telefone: string;
}

export default function CadastroPage() {

    const router = useRouter()


    const { register, handleSubmit, formState: { errors } } = useForm<IFormData>({ mode: 'onSubmit' })


    const handleNext = (data: IFormData) => {

        setUserLocalStorage(data.nome, data.telefone)

        router.push(`/bem-vindo`)
    }

    const setUserLocalStorage = (nome: string, telefone: string) => {
        localStorage.setItem(keys.user_localstorage, JSON.stringify({ nome, telefone }))
    }


    return <>
        <h1>Cadastre sua conta</h1>

        <form className="cadastro-form" onSubmit={handleSubmit(handleNext)} noValidate>
            <Input type="text" error={errors.nome?.message || '\u00A0'} {...register("nome", {
                required: "Nome é obrigatório",
            })} required />

            <Input type="number" error={errors.telefone?.message || '\u00A0'} {...register("telefone", {
                required: "Telefone é obrigatório",
            })} required />

            <button type="submit" className="btn-next"  >
                <span>›</span>
            </button>

            <span>Continuar</span>
        </form>
    </>
}