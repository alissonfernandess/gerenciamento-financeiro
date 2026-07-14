import { AbbreviatedName, Input, CustomButton } from "@repo/ui"
import { TransactionTypeSelector } from "./TransactionTypeSelector"

interface StepDestinatarioProps {
    user: any // se existir IUsuario em types/index.ts, troca aqui
    search: string
    setSearch: (val: string) => void
    error: string
    setError: (val: string) => void
    selectedContact: IContato | null
    handleSelectContact: (contact: IContato) => void
    handleContinue: () => void
    selectedType: string
    typeError: boolean
    dropdownOpen: boolean
    setDropdownOpen: (open: boolean) => void
    setSelectedType: (type: string) => void
    setTypeError: (error: boolean) => void
}

export function StepDestinatario({
    user,
    search,
    setSearch,
    error,
    setError,
    selectedContact,
    handleSelectContact,
    handleContinue,
    selectedType,
    typeError,
    dropdownOpen,
    setDropdownOpen,
    setSelectedType,
    setTypeError
}: StepDestinatarioProps) {
    return (
        <div className="transferencias-page">

            {/* Tipo de transação */}
            <TransactionTypeSelector
                selectedType={selectedType}
                typeError={typeError}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
                setSelectedType={setSelectedType}
                setTypeError={setTypeError}
            />

            {/* Erro visível E anunciado (container permanente para a live region) */}
            <span role="alert" className="error">
                {typeError ? "Selecione o tipo de transação antes de continuar" : ""}
            </span>

            <div className="destinatario-card">
                <div className="destinatario-header">
                    <div className="destinatario-info">
                        <h2 id="destinatario-heading">
                            Informe quem vai receber a transferência
                        </h2>
                        <p>Insira os dados do destinatário</p>
                    </div>
                </div>

                {/* Campo de busca */}
                <div className="search-field">
                    <Input
                        placeholder="Nome, CPF/CNPJ ou chave Pix"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setError("")
                        }}
                        className="search-input"
                        error={error}
                        aria-label="Nome, CPF/CNPJ ou chave Pix do destinatário"
                        aria-describedby={error ? "search-error" : undefined}
                        aria-invalid={!!error}
                    />
                    <span id="search-error" role="alert" className="error">
                        {error}
                    </span>
                </div>

                <CustomButton
                    type="button"
                    text="Continuar"
                    hasBackgroundColor
                    eventClick={handleContinue}
                    className="btn-continuar"
                    aria-label="Continuar para confirmação da transferência"
                />

                {/* Lista de contatos */}
                <div className="contacts-section">
                    <h3 className="contacts-title" id="contacts-heading">
                        Contatos
                    </h3>

                    <ul className="contacts-list" aria-labelledby="contacts-heading">
                        {user?.contatos.map((contact: IContato) => {
                            const isSelected = selectedContact?.name === contact.name
                            return (
                                <li key={contact.name}>
                                    <button
                                        type="button"
                                        className={`contact-item ${isSelected ? "selected" : ""}`}
                                        onClick={() => handleSelectContact(contact)}
                                        aria-pressed={isSelected}
                                    >
                                        <div className="contact-info">
                                            <AbbreviatedName
                                                completedName={contact.name}
                                                circleColor="#354973"
                                                size={40}
                                                aria-hidden="true"
                                            />
                                            <span className="contact-name">{contact.name}</span>
                                        </div>
                                        <svg
                                            className="contact-arrow"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden="true"
                                            focusable="false"
                                        >
                                            <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>

                    {/* Anúncio de seleção (container permanente) */}
                    <span role="status" className="sr-only">
                        {selectedContact ? `Contato ${selectedContact.name} selecionado` : ""}
                    </span>
                </div>
            </div>
        </div>
    )
}