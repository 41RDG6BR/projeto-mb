import React, { useEffect, useState } from 'react'
import PlusIcon from '../../assets/icons/PlusIcon'
import CustomButton from '../CustomButton/CustomButton'
import './ResponsiveButton.css'

interface ButtonProps {
  children?: React.ReactNode
  onClick: () => void
  className?: string
  style?: React.CSSProperties & {
    '@media (max-width: 768px)'?: React.CSSProperties
  }
  disabled?: boolean
  marginRightMobile?: string
}

const ResponsiveButton: React.FC<ButtonProps> = ({
  onClick,
  className,
  style,
  disabled,
  children,
  marginRightMobile,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const mobileStyle: React.CSSProperties = {
    marginRight: isMobile
      ? marginRightMobile || '25px'
      : style?.marginRight || '25px',
    marginBottom: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const desktopStyle: React.CSSProperties = {
    marginRight: style?.marginRight || '43px',
  }

  return (
    <CustomButton
      onClick={onClick}
      className={`custom-button ${
        isMobile ? 'custom-button--mobile' : 'custom-button--desktop'
      } ${className || ''}`}
      style={{ ...style, ...(isMobile ? mobileStyle : desktopStyle) }}
      disabled={disabled}
    >
      {isMobile ? (
        <div style={{ width: '32px', height: '32px' }}>
          <PlusIcon />
        </div>
      ) : (
        <>
          <span>{children}</span>
          <div className='icon'>
            <PlusIcon />
          </div>
        </>
      )}
    </CustomButton>
  )
}

export default ResponsiveButton
