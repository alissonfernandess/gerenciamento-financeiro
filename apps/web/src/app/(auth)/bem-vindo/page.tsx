"use client"

import "./page.scss"
import { useBemVindo } from "./hooks/useBemVindo"

export default function BemVindoPage() {
    const { user, handleContinue } = useBemVindo()

    return (
        <>
            <h1>Bem-vindo, {user?.nome}!</h1>

            <button type="button" className="btn-next" onClick={handleContinue}>
                <span>›</span>
            </button>

            <span className="text-continuar">Continuar</span>
        </>
    )
}