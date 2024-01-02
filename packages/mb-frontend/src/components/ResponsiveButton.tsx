// ResponsiveButton.tsx
import React, { MouseEventHandler, useEffect, useState } from 'react';
import PlusIcon from '../assets/icons/PlusIcon';
import CustomButton from './CustomButton';
import '../styles/ResponsiveButton.css';

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const MobileButton: React.FC<ButtonProps> = ({ onClick }) => (
  <CustomButton
    onClick={onClick}
    className='custom-button mobile-button'
  >
    <div style={{ width: '32px', height: '32px' }}>
      <PlusIcon />
    </div>
  </CustomButton>
);

const DesktopButton: React.FC<ButtonProps> = ({ onClick }) => (
  <CustomButton
    onClick={onClick}
    className='custom-button desktop-button'
  >
    Lançar nota <PlusIcon />
  </CustomButton>
);

const ResponsiveButton: React.FC<ButtonProps> = ({ onClick }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isMobile) {
    return <MobileButton onClick={onClick} />;
  }

  return <DesktopButton onClick={onClick} />;
};

export default ResponsiveButton;
