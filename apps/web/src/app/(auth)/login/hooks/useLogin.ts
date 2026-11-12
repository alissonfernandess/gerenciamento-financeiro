import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useUser } from "@/contexts/UserContext"
import { validateLogin, type FieldErrors } from "@/core/services/AuthService"

interface IFormData {
    telefone: string;
    senha: string;
}

/**
 * MUDANÇA (autenticação): hook novo da tela de login. Mesmo padrão do cadastro:
 * o hook cuida do estado e da chamada à API; as regras de validação vêm do domínio.
 */
export function useLogin() {
    const router = useRouter()
    const { refreshUser } = useUser()

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<IFormData>({ mode: 'onSubmit' })

    // MUDANÇA (pré-carregamento): o dashboard é baixado enquanto o usuário digita as credenciais.
    useEffect(() => {
        router.prefetch("/dashboard")
    }, [router])

    const applyFieldErrors = (fieldErrors: FieldErrors) => {
        for (const [field, message] of Object.entries(fieldErrors)) {
            setError(field as keyof IFormData, { message })
        }
    }

    const handleLogin = async (data: IFormData) => {
        const clientErrors = validateLogin(data)
        if (clientErrors) {
            applyFieldErrors(clientErrors)
            return
        }

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
            const body = await response.json().catch(() => ({}))

            if (!response.ok) {
                if (body.errors) applyFieldErrors(body.errors)
                // 401: "Telefone ou senha inválidos"; 429: limite de tentativas. A mensagem vem do servidor.
                else setError("root", { message: body.error ?? "Não foi possível entrar" })
                return
            }

            await refreshUser()
            router.push("/dashboard")
        } catch {
            setError("root", { message: "Falha de conexão. Tente novamente." })
        }
    }

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        handleLogin
    }
}
