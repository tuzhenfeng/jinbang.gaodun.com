import React from 'react';

const GXBIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg 
    className={className}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background circle */}
    <circle cx="100" cy="100" r="90" fill="#1890ff" />
    
    {/* GXB text */}
    <text 
      x="100" 
      y="115" 
      textAnchor="middle" 
      fill="white" 
      fontFamily="Arial, sans-serif" 
      fontSize="80" 
      fontWeight="bold"
    >
      高
    </text>
  </svg>
);

export default GXBIcon;
