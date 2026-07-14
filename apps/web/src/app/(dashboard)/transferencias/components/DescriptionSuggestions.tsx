import { descriptionSuggestions } from "@/data"

interface DescriptionSuggestionsProps {
  selectedType: string
  onSelect: (suggestion: string) => void
}

export function DescriptionSuggestions({ selectedType, onSelect }: DescriptionSuggestionsProps) {
  const suggestions = descriptionSuggestions[selectedType] || []

  if (!selectedType || suggestions.length === 0) return null

  return (
    <div className="description-suggestions">
      <span className="description-suggestions__label">Sugestões para {selectedType}:</span>
      <div className="description-suggestions__list">
        {suggestions.map((s) => (
          <button
            key={s}
            className="description-suggestions__chip"
            onClick={() => onSelect(s)}
            type="button"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}