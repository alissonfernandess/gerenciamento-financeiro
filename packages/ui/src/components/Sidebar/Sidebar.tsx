"use client";

import { ElementType, FC, useState } from 'react';
import './Sidebar.scss';

export type SidebarItem = {
    label: string;
    icon: any; // Lucide icon or similar
    href: string;
};

export type SidebarProps = {
    items: SidebarItem[];
    userName: string;
    activePath?: string;
    /**
     * MUDANÇA (pré-carregamento): componente usado para renderizar os links.
     * O padrão continua sendo <a>, mas o app pode passar o <Link> do Next para ter
     * navegação sem recarregar a página e prefetch automático. Receber o componente
     * por prop mantém o pacote `ui` independente do Next (design system reutilizável).
     */
    linkComponent?: ElementType;
    /** MUDANÇA (autenticação): se informado, exibe o botão "Sair" no menu. */
    onLogout?: () => void;
};

export const Sidebar: FC<SidebarProps> = ({ items, userName, activePath, linkComponent, onLogout }) => {
    const LinkComponent: ElementType = linkComponent ?? 'a';
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);

    // link-label ativo adicionar bold
    

    return (
        <>
            {/* Hamburger Button for Mobile */}
            <button className="hamburger-btn" onClick={toggleSidebar}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>

            {/* Overlay for mobile */}
            {isOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-profile">
                    <div className="profile-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                    <span className="profile-name">{userName}</span>
                </div>
                
                <nav className="sidebar-nav">
                    {items.map((item, index) => {
                        const isActive = item.href === (activePath || (typeof window !== 'undefined' ? window.location.pathname : ''));

                        const Icon = item.icon;
                        return (
                            <LinkComponent key={index} href={item.href} className={`sidebar-link ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
                                {Icon && typeof Icon !== 'string' ? (
                                    <Icon size={20} className="link-icon" />
                                ) : null}
                                <span className={`link-label ${isActive ? 'active' : ''}`}>{item.label}</span>
                            </LinkComponent>
                        );
                    })}

                    {onLogout && (
                        <button
                            type="button"
                            className="sidebar-link sidebar-logout"
                            onClick={() => { closeSidebar(); onLogout(); }}
                        >
                            <span className="link-label">Sair</span>
                        </button>
                    )}
                </nav>
            </aside>
        </>
    );
};
