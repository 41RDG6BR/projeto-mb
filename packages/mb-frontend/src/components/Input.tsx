// Input.tsx
import React from 'react'
import '../styles/Input.css'

interface InputProps {
  type: string
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className='custom-input'
    />
  )
}

export default Input
