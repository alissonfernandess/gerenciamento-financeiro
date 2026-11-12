function formatDate(date: string | Date | null | undefined) {
    if (!date) return ""

    // Se já for Date
    if (date instanceof Date) {
        if (isNaN(date.getTime())) return ""

        return new Intl.DateTimeFormat("pt-BR", {
            timeZone: "UTC"
        }).format(date)
    }

    // Se for string no formato YYYY-MM-DD (mais comum no backend)
    if (typeof date === "string") {
        const isoMatch = /^\d{4}-\d{2}-\d{2}$/

        if (isoMatch.test(date)) {
            const [year, month, day] = date.split("-")
            return `${day}/${month}/${year}`
        }

        // fallback seguro
        const parsed = new Date(date)

        if (isNaN(parsed.getTime())) return ""

        return new Intl.DateTimeFormat("pt-BR", {
            timeZone: "UTC"
        }).format(parsed)
    }

    return ""
}

export default formatDate