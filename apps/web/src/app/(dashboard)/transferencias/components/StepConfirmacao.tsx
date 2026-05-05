import { AmountInput, formatCurrency, CustomButton } from "@repo/ui"

interface StepConfirmacaoProps {
    user: any
    selectedContact: IContato | null
    search: string
    selectedType: string
    valor: string
    setValor: (val: string) => void
    handleConcluir: () => void
}

export function StepConfirmacao({
    user,
    selectedContact,
    search,
    selectedType,
    valor,
    setValor,
    handleConcluir
}: StepConfirmacaoProps) {
    return (
        <div className="transferencias-page">
            <div className="confirmacao-card">
                <div className="confirmacao-destinatario">
                    <span className="label-para">para</span>
                    <span className="nome-destinatario">{selectedContact?.name || search}</span>
                </div>

                <p className="forma-pagamento">
                    Forma de pagamento: <strong>{selectedType}</strong>
                </p>

                <AmountInput
                    id="valor-transferencia"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                />

                <div className="saldo-row">
                    <span className="saldo-label">Saldo conta</span>
                    <span className="saldo-valor">R$ {formatCurrency(user?.saldo ?? 0)}</span>
                </div>

                <div className="data-section">
                    <span className="data-label">Data da transferência</span>
                    <h3 className="data-valor">Hoje, {new Date().toLocaleDateString('pt-BR')}</h3>
                </div>

                <CustomButton
                    type="button"
                    text="Concluir transação"
                    hasBackgroundColor
                    eventClick={handleConcluir}
                    className="btn-concluir"
                />
            </div>
        </div>
    )
}
