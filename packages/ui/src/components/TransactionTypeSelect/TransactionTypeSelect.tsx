'use client'

import React, { useState, useRef, useEffect } from 'react';
import styles from './TransactionTypeSelect.module.scss';

export interface SelectOption {
  value: string;
  label: string;
}

interface TransactionTypeSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  options?: SelectOption[];
  label?: string;
}

const DEFAULT_OPTIONS: SelectOption[] = [
  { value: 'pix',           label: 'Pix' },
  { value: 'boleto',        label: 'Boleto' },
  { value: 'transferencia', label: 'Transferencia' },
];

export const TransactionTypeSelect: React.FC<TransactionTypeSelectProps> = ({
  value = '',
  onChange,
  required = true,
  options = DEFAULT_OPTIONS,
  label = 'Tipo de Transação',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(p => !p)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.label}>
          {selected ? selected.label : label}
          {required && <span className={styles.asterisk}> *</span>}
        </span>
        <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.75"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <ul className={styles.dropdown} role="listbox">
          {options.map(opt => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={`${styles.option} ${opt.value === value ? styles.selected : ''}`}
              onClick={() => { onChange?.(opt.value); setIsOpen(false); }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};