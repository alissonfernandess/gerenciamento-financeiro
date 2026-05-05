import { transactionTypes } from "@/data"

interface TransactionTypeSelectorProps {
    selectedType: string
    typeError: boolean
    dropdownOpen: boolean
    setDropdownOpen: (open: boolean) => void
    setSelectedType: (type: string) => void
    setTypeError: (error: boolean) => void
}

export function TransactionTypeSelector({
    selectedType,
    typeError,
    dropdownOpen,
    setDropdownOpen,
    setSelectedType,
    setTypeError
}: TransactionTypeSelectorProps) {
    return (
        <div className="transaction-type-selector">
            <button
                id="transaction-type-btn"
                className={`type-dropdown-trigger ${typeError ? "error" : ""}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                <span>{selectedType || "Tipo de Transação"}</span>
                <svg
                    className={`chevron ${dropdownOpen ? "open" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {dropdownOpen && (
                <ul className="type-dropdown-menu">
                    {transactionTypes.map((type) => (
                        <li
                            key={type}
                            className={`type-option ${selectedType === type ? "active" : ""}`}
                            onClick={() => {
                                setSelectedType(type)
                                setTypeError(false)
                                setDropdownOpen(false)
                            }}
                        >
                            {type}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
