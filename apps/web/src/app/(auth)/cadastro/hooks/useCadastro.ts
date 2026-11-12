import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useUser } from "@/contexts/UserContext"
import { validateRegistration, type FieldErrors } from "@/core/services/AuthService"

interface IFormData {
    nome: string;
    telefone: string;
    senha: string;
}

export function useCadastro() {
    const router = useRouter()
    const { refreshUser } = useUser()

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<IFormData>({ mode: 'onSubmit' })

    // MUDANÇA (pré-carregamento): a próxima tela já é baixada enquanto o usuário preenche o formulário.
    useEffect(() => {
        router.prefetch("/bem-vindo")
    }, [router])

    const applyFieldErrors = (fieldErrors: FieldErrors) => {
        for (const [field, message] of Object.entries(fieldErrors)) {
            setError(field as keyof IFormData, { message })
        }
    }

    /**
     * MUDANÇA (autenticação): antes gravava { nome, telefone } no localStorage.
     * Agora envia os dados (com senha) para o servidor, que valida, gera o hash da
     * senha, cifra o telefone e abre a sessão por cookie httpOnly.
     */
    const handleNext = async (data: IFormData) => {
        // Validação com as MESMAS regras do domínio, só para dar feedback imediato.
        // O servidor revalida tudo: validação no cliente nunca é segurança.
        const clientErrors = validateRegistration(data)
        if (clientErrors) {
            applyFieldErrors(clientErrors)
            return
        }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
            const body = await response.json().catch(() => ({}))

            if (!response.ok) {
                if (body.errors) applyFieldErrors(body.errors)
                else setError("root", { message: body.error ?? "Não foi possível concluir o cadastro" })
                return
            }

            await refreshUser()
            router.push("/bem-vindo")
        } catch {
            setError("root", { message: "Falha de conexão. Tente novamente." })
        }
    }

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        handleNext
    }
}
