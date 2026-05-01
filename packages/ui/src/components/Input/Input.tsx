import { forwardRef, InputHTMLAttributes } from "react"
import './Input.scss'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
    ({ label, error, className, ...props }, ref) => {
        // Ignora espaços vazios como '\u00A0' que são passados para manter o layout
        const hasError = !!error && error !== '\u00A0';

        return (
            <>
                {label && <label>{label}</label>}
                <input 
                    ref={ref} 
                    className={`input ${className || ''}`.trim()}
                    aria-invalid={hasError ? "true" : "false"} 
                    {...props} 
                />
                {error && <p className="error">{error}</p>}
            </>
        )
    }
)