import React, { useEffect, useRef } from 'react';

interface ClickableIconProps {
  align: string;
  icon: React.ReactNode; // Accepts any ReactNode as the icon
  onClick: () => void;
}

const ClickableIcon: React.FC<ClickableIconProps> = ({ align, icon, onClick }) => {
  const iconRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
      console.log("asdasd")
        onClick();
    }
  return (
    <div
      ref={iconRef}
      style={{
        marginLeft: '10px',
        marginTop: '5px',
        cursor: 'pointer'
      }}
      onClick={handleClick}>
      {icon}
    </div>
  );
};

export default ClickableIcon;