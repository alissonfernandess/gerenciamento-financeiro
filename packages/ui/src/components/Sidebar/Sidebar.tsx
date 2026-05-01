"use client";

import { FC, useState } from 'react';
import './Sidebar.scss';

export type SidebarItem = {
    label: string;
    icon: any; // Lucide icon or similar
    href: string;
};

export type SidebarProps = {
    items: SidebarItem[];
    userName?: string;
};

export const Sidebar: FC<SidebarProps> = ({ items, userName = "Felipe Saito" }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);

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
                        const Icon = item.icon;
                        return (
                            <a key={index} href={item.href} className="sidebar-link" onClick={closeSidebar}>
                                {Icon && typeof Icon !== 'string' ? (
                                    <Icon size={20} className="link-icon" />
                                ) : null}
                                <span className="link-label">{item.label}</span>
                            </a>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
};
