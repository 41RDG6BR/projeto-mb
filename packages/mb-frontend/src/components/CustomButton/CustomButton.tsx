// CustomButton.tsx
import React from 'react'

interface CustomButtonProps {
  children: React.ReactNode
  onClick: React.MouseEventHandler<HTMLButtonElement>
  className?: string
  style?: React.CSSProperties & {
    '@media (max-width: 768px)'?: React.CSSProperties
  }
  disabled?: boolean
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  className,
  style,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default CustomButton
