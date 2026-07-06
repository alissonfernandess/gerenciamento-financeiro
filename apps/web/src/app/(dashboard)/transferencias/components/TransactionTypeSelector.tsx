import { useEffect, useRef } from "react"
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
    const containerRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const optionRefs = useRef<(HTMLButtonElement | null)[]>([])

    // Ao abrir, foca a opção selecionada (ou a primeira)
    useEffect(() => {
        if (dropdownOpen) {
            const selectedIndex = transactionTypes.indexOf(selectedType)
            const indexToFocus = selectedIndex >= 0 ? selectedIndex : 0
            optionRefs.current[indexToFocus]?.focus()
        }
    }, [dropdownOpen, selectedType])

    // Fecha ao clicar fora
    useEffect(() => {
        if (!dropdownOpen) return

        function handleClickOutside(event: MouseEvent) {
            if (!containerRef.current?.contains(event.target as Node)) {
                setDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [dropdownOpen, setDropdownOpen])

    function closeAndRefocus() {
        setDropdownOpen(false)
        triggerRef.current?.focus()
    }

    function handleSelect(type: string) {
        setSelectedType(type)
        setTypeError(false)
        closeAndRefocus()
    }

    function handleMenuKeyDown(e: React.KeyboardEvent, index: number) {
        const lastIndex = transactionTypes.length - 1

        switch (e.key) {
            case "Escape":
                e.preventDefault()
                closeAndRefocus()
                break
            case "ArrowDown":
                e.preventDefault()
                optionRefs.current[index === lastIndex ? 0 : index + 1]?.focus()
                break
            case "ArrowUp":
                e.preventDefault()
                optionRefs.current[index === 0 ? lastIndex : index - 1]?.focus()
                break
            case "Home":
                e.preventDefault()
                optionRefs.current[0]?.focus()
                break
            case "End":
                e.preventDefault()
                optionRefs.current[lastIndex]?.focus()
                break
            case "Tab":
                // Tab fecha o menu e segue o fluxo natural da página
                setDropdownOpen(false)
                break
        }
    }

    return (
        <div className="transaction-type-selector" ref={containerRef}>
            <button
                ref={triggerRef}
                id="transaction-type-btn"
                type="button"
                className={`type-dropdown-trigger ${typeError ? "error" : ""}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onKeyDown={(e) => {
                    if (e.key === "ArrowDown" && !dropdownOpen) {
                        e.preventDefault()
                        setDropdownOpen(true)
                    }
                }}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                aria-invalid={typeError}
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
                    aria-hidden="true"
                    focusable="false"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {dropdownOpen && (
                <ul className="type-dropdown-menu" aria-label="Tipo de transação">
                    {transactionTypes.map((type, index) => (
                        <li key={type}>
                            <button
                                ref={(el) => {
                                    optionRefs.current[index] = el
                                }}
                                type="button"
                                className={`type-option ${selectedType === type ? "active" : ""}`}
                                onClick={() => handleSelect(type)}
                                onKeyDown={(e) => handleMenuKeyDown(e, index)}
                                aria-pressed={selectedType === type}
                            >
                                {type}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}