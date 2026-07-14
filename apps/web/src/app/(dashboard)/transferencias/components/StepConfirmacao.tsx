import { useState } from "react"
import { AmountInput, formatCurrency, CustomButton } from "@repo/ui"
import { DescriptionSuggestions } from "./DescriptionSuggestions"
import { AttachmentUpload } from "./AttachmentUpload"

interface StepConfirmacaoProps {
    user: any
    selectedContact: IContato | null
    search: string
    selectedType: string
    valor: string
    valorError: string
    setValor: (val: string) => void
    handleConcluir: (attachments: IAttachment[], description: string) => void
}

export function StepConfirmacao({
    user,
    selectedContact,
    search,
    selectedType,
    valor,
    valorError,
    setValor,
    handleConcluir,
}: StepConfirmacaoProps) {
    const [attachments, setAttachments] = useState<IAttachment[]>([])
    const [description, setDescription] = useState(
        `Transferência para ${selectedContact?.name || search}`
    )

    function handleAddAttachments(newFiles: IAttachment[]) {
        setAttachments((prev) => [...prev, ...newFiles])
    }

    function handleRemoveAttachment(index: number) {
        setAttachments((prev) => prev.filter((_, i) => i !== index))
    }

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

                <DescriptionSuggestions
                    selectedType={selectedType}
                    onSelect={(suggestion) => setDescription(suggestion)}  // 👈 agora atualiza
                />

                {/* Campo de descrição editável */}
                <div className="confirmacao-description">
                    <span className="confirmacao-description__label">Descrição</span>
                    <input
                        className="confirmacao-description__input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descrição da transação"
                    />
                </div>

                <AmountInput
                    id="valor-transferencia"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                />

                {valorError && <p className="confirmacao-error">{valorError}</p>}

                <AttachmentUpload
                    attachments={attachments}
                    onAdd={handleAddAttachments}
                    onRemove={handleRemoveAttachment}
                />

                <div className="saldo-row">
                    <span className="saldo-label">Saldo conta</span>
                    <span className="saldo-valor">R$ {formatCurrency(user?.saldo ?? 0)}</span>
                </div>

                <div className="data-section">
                    <span className="data-label">Data da transferência</span>
                    <h3 className="data-valor">Hoje, {new Date().toLocaleDateString("pt-BR")}</h3>
                </div>

                <CustomButton
                    type="button"
                    text="Concluir transação"
                    hasBackgroundColor
                    eventClick={() => handleConcluir(attachments, description)}
                    className="btn-concluir"
                />
            </div>
        </div>
    )
}