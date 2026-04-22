import "./WelcomeCard.scss"


export interface WelcomeCardProps {
    name: string
    onContinue?: () => void
    backgroundImage?: string
}

export function WelcomeCard({
    name,
    onContinue,
    backgroundImage = "/bg-mountain.png",
}: WelcomeCardProps) {
    return (
        <div className="container">
            <div className="wrapper">
                <img
                    src={backgroundImage}
                    alt="background"
                    className="background"
                />

                <div className="overlay" />

                <div className="card">
                    <h1>Bem-vindo {name}</h1>

                    <button className="button" onClick={onContinue}>
                        →
                    </button>

                    <span>Continuar</span>
                </div>
            </div>
        </div>
    )
}