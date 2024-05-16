import React, { useEffect, useRef } from 'react';

interface ClickableIconProps {
  position: { x: number; y: number };
  icon: React.ReactNode; // Accepts any ReactNode as the icon
  onClick: () => void;
}

const ClickableIcon: React.FC<ClickableIconProps> = ({ position, icon, onClick }) => {
  const iconRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
      console.log("asdasd")
        onClick();
    }
  return (
    <div
      ref={iconRef}
      style={{
        
        left: position.x,
        top: position.y,
        cursor: 'pointer'
      }}
      onClick={handleClick}>
      {icon}
    </div>
  );
};

export default ClickableIcon;