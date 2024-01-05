import React, { useEffect, useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import PlusIcon from '../../assets/icons/PlusIcon';
import './ResponsiveButton.css';

interface ButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties & {
    '@media (max-width: 768px)'?: React.CSSProperties | undefined;
  };
  disabled?: boolean;
  marginRightMobile?: string;
  mobileButtonText?: string;
  isModal?: boolean;
  isMobile: boolean;
  mobileButtonWidth?: string;
  marginBottonMobile?: string;
}

const ResponsiveButton: React.FC<ButtonProps> = ({
  onClick,
  className,
  style,
  disabled,
  children,
  marginRightMobile,
  mobileButtonText,
  isModal,
  mobileButtonWidth,
  marginBottonMobile
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const mobileStyle: React.CSSProperties = {
    marginRight: isMobile ? (marginRightMobile || '0') : (style?.marginRight || '25px'),
    width: isMobile ? (mobileButtonWidth || '50px') : (style?.width || '0px'), // Use 'width' instead of 'mobileButtonWidth'
    marginBottom: marginBottonMobile,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  

  const desktopStyle: React.CSSProperties = {
    marginRight: style?.marginRight || '43px',
  };

  return (
    <CustomButton
      onClick={onClick}
      className={`custom-button ${
        isMobile ? 'custom-button--mobile' : 'custom-button--desktop'
      } ${className || ''}`}
      style={{ ...style, ...(isMobile ? mobileStyle : desktopStyle) }}
      disabled={disabled}
    >
      {isModal && isMobile ? (
        mobileButtonText || 'Confirmar'
      ) : (
        <>
          <span style={{ textAlign: 'center' }}>{children}</span>
          {!isModal && isMobile ? null : (
            <>
              {isModal ? null : <PlusIcon />}
            </>
          )}
        </>
      )}
    </CustomButton>
  );
  
  
};

export default ResponsiveButton;
