import { AbbreviatedName, Input, CustomButton } from "@repo/ui"
import { TransactionTypeSelector } from "./TransactionTypeSelector"

interface StepDestinatarioProps {
    user: any
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
            <TransactionTypeSelector
                selectedType={selectedType}
                typeError={typeError}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
                setSelectedType={setSelectedType}
                setTypeError={setTypeError}
            />

            <div className="destinatario-card">
                <div className="destinatario-header">
                    <div className="destinatario-info">
                        <h2>Informe quem vai receber a transferência</h2>
                        <p>Insira os dados do destinatário</p>
                    </div>
                </div>

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
                    />
                </div>

                <CustomButton
                    type="button"
                    text="Continuar"
                    hasBackgroundColor
                    eventClick={handleContinue}
                    className="btn-continuar"
                />

                <div className="contacts-section">
                    <h3 className="contacts-title">Contatos</h3>

                    <ul className="contacts-list">
                        {user?.contatos.map((contact: IContato) => (
                            <li
                                key={contact.name}
                                className={`contact-item ${selectedContact?.name === contact.name ? "selected" : ""}`}
                                onClick={() => handleSelectContact(contact)}
                            >
                                <div className="contact-info">
                                    <AbbreviatedName
                                        completedName={contact.name}
                                        circleColor="#354973"
                                        size={40}
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
                                >
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
