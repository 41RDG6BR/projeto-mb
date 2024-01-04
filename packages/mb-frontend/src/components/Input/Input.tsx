import './Input.css'

interface InputProps {
  type: string
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className: string
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  )
}

export default Input
