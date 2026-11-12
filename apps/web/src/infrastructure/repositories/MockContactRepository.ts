import type { Contact } from "@/core/entities/Contact"
import type { ContactRepository } from "@/core/repositories/ContactRepository"

/**
 * ADAPTER: implementa `ContactRepository` com dados fixos.
 * MUDANÇA: veio de `data/index.ts → getContacts()`.
 */
export class MockContactRepository implements ContactRepository {
    getAll(): Contact[] {
        return [
            { name: "Lucas Moura" },
            { name: "Ana Larissa" },
            { name: "Mirela" },
        ]
    }
}
