import { useRef } from "react"
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

    function handleFiles(files: FileList | null) {
        if (!files) return

        const validFiles = Array.from(files).filter((file) => {
            if (!ACCEPTED_TYPES.includes(file.type)) return false
            if (file.size > MAX_SIZE_MB * 1024 * 1024) return false
            return true
        })

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

        Promise.all(readers).then(onAdd)
    }

    function formatSize(bytes: number) {
        if (bytes < 1024) return `${bytes} B`
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    }

    return (
        <div className="attachment-upload">
            <span className="attachment-upload__label">Anexos</span>

            <button
                type="button"
                className="attachment-upload__trigger"
                onClick={() => inputRef.current?.click()}
            >
                <FiPaperclip size={16} />
                Adicionar recibo ou documento
            </button>

            <input
                ref={inputRef}
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                multiple
                className="attachment-upload__input"
                onChange={(e) => handleFiles(e.target.files)}
            />

            {attachments.length > 0 && (
                <ul className="attachment-upload__list">
                    {attachments.map((file, index) => (
                        <li key={index} className="attachment-upload__item">
                            <FiFile size={16} className="attachment-upload__item-icon" />
                            <div className="attachment-upload__item-info">
                                <span className="attachment-upload__item-name">{file.name}</span>
                                <span className="attachment-upload__item-size">{formatSize(file.size)}</span>
                            </div>
                            <button
                                type="button"
                                className="attachment-upload__item-remove"
                                onClick={() => onRemove(index)}
                                aria-label="Remover anexo"
                            >
                                <FiX size={14} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <p className="attachment-upload__hint">PNG, JPG ou PDF — máx. 5 MB por arquivo</p>
        </div>
    )
}