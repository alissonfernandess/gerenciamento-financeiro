import React from 'react';
import './AmountInput.scss';
import { formatCurrency } from '../../../utils/functions';

export interface AmountInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    id?: string;
    backgroundImage?: string;
}

export const AmountInput: React.FC<AmountInputProps> = ({ 
    value, 
    onChange, 
    placeholder = "0,00", 
    id,
    backgroundImage = '/background_input.png'
}) => {
    const formatValue = (val: string) => {
        const cleanValue = val.replace(/\D/g, "");
        if (!cleanValue) return "";
        
        const numberValue = parseInt(cleanValue, 10) / 100;
        return formatCurrency(numberValue);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatValue(e.target.value);
        e.target.value = formatted;
        onChange(e);
    };

    return (
        <div 
            className="AmountInput" 
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="valor-input-wrapper">
                <span className="currency-label">R$</span>
                <input
                    id={id}
                    type="text"
                    className="valor-input"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};
