'use client'

import './CustomInput.scss'

type CustomInputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  required?: boolean;
}

export const CustomInput = ({
  required = true, 
  type = "text", 
  ...props
}: CustomInputProps) => {
  
  return (
    <input
      style={props.style}
      type={type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      className="CustomInput"
      required={required}
    />
  )
}