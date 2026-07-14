import { useRef, useState } from "react"
import { FiPaperclip, FiX, FiFile } from "react-icons/fi"

interface AttachmentUploadProps {
    attachments: IAttachment[]
    onAdd: (attachments: IAttachment[]) => void
    onRemove: (index: number) => void
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "application/pdf"]
const MAX_SIZE_MB = 5

export function AttachmentUpload({ attachments, onAdd, onRemove }: AttachmentUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [announcement, setAnnouncement] = useState("")

    function handleFiles(files: FileList | null) {
        if (!files) return

        const allFiles = Array.from(files)
        const validFiles = allFiles.filter((file) => {
            if (!ACCEPTED_TYPES.includes(file.type)) return false
            if (file.size > MAX_SIZE_MB * 1024 * 1024) return false
            return true
        })

        const rejected = allFiles.length - validFiles.length

        const readers = validFiles.map(
            (file) =>
                new Promise<IAttachment>((resolve) => {
                    const reader = new FileReader()
                    reader.onload = () =>
                        resolve({
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            dataUrl: reader.result as string,
                        })
                    reader.readAsDataURL(file)
                })
        )

        Promise.all(readers).then((added) => {
            onAdd(added)
            if (rejected > 0) {
                setAnnouncement(
                    `${added.length} arquivo(s) adicionado(s). ${rejected} arquivo(s) rejeitado(s) por tipo ou tamanho inválido.`
                )
            } else {
                setAnnouncement(
                    `${added.length} arquivo(s) adicionado(s) com sucesso.`
                )
            }
        })
    }

    function handleRemove(index: number, name: string) {
        onRemove(index)
        setAnnouncement(`Anexo ${name} removido.`)
    }

    function formatSize(bytes: number) {
        if (bytes < 1024) return `${bytes} B`
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    }

    return (
        <div className="attachment-upload">

            {/* Anúncio para leitores de tela */}
            <span
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
            >
                {announcement}
            </span>

            <span
                className="attachment-upload__label"
                id="attachment-label"
            >
                Anexos
            </span>

            <button
                type="button"
                className="attachment-upload__trigger"
                onClick={() => inputRef.current?.click()}
                aria-label="Adicionar anexo — aceita PNG, JPG ou PDF até 5 MB"
                aria-describedby="attachment-hint"
            >
                <FiPaperclip size={16} aria-hidden="true" />
                Adicionar recibo ou documento
            </button>

            <input
                ref={inputRef}
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                multiple
                className="attachment-upload__input"
                onChange={(e) => handleFiles(e.target.files)}
                aria-label="Selecionar arquivos para anexar à transação"
                tabIndex={-1}
            />

            {attachments.length > 0 && (
                <ul
                    className="attachment-upload__list"
                    aria-label={`${attachments.length} arquivo(s) anexado(s)`}
                    aria-labelledby="attachment-label"
                >
                    {attachments.map((file, index) => (
                        <li
                            key={index}
                            className="attachment-upload__item"
                            aria-label={`Anexo: ${file.name}, ${formatSize(file.size)}`}
                        >
                            <FiFile
                                size={16}
                                className="attachment-upload__item-icon"
                                aria-hidden="true"
                            />
                            <div className="attachment-upload__item-info">
                                <span className="attachment-upload__item-name">
                                    {file.name}
                                </span>
                                <span className="attachment-upload__item-size">
                                    {formatSize(file.size)}
                                </span>
                            </div>
                            <button
                                type="button"
                                className="attachment-upload__item-remove"
                                onClick={() => handleRemove(index, file.name)}
                                aria-label={`Remover anexo ${file.name}`}
                            >
                                <FiX size={14} aria-hidden="true" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <p
                className="attachment-upload__hint"
                id="attachment-hint"
            >
                PNG, JPG ou PDF — máx. 5 MB por arquivo
            </p>
        </div>
    )
}