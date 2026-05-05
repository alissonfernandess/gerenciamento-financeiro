import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { keys } from "@repo/ui"

interface IFormData {
    nome: string;
    telefone: string;
}

export function useCadastro() {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<IFormData>({ mode: 'onSubmit' })

    const setUserLocalStorage = (nome: string, telefone: string) => {
        localStorage.setItem(keys.user_localstorage, JSON.stringify({ nome, telefone }))
        router.push(`/bem-vindo`)
    }

    const handleNext = (data: IFormData) => {
        setUserLocalStorage(data.nome, data.telefone)
    }

    return {
        register,
        handleSubmit,
        errors,
        handleNext
    }
}
