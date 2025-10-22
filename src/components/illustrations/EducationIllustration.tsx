import React from 'react';
import AnimatedIllustration from './AnimatedIllustration';

// This is a placeholder for the actual Lottie animation JSON
// In a real app, you would import a Lottie JSON file here
const educationAnimation = {
  // This is a simplified representation of a Lottie animation
  // In a real app, this would be imported from a JSON file
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 180,
  w: 512,
  h: 512,
  nm: "Education",
  ddd: 0,
  assets: [],
  layers: [
    // Layers would be defined here in a real Lottie file
  ]
};

const EducationIllustration: React.FC<{
  className?: string;
  style?: React.CSSProperties;
}> = ({ className = '', style = {} }) => {
  return (
    <div className={`relative ${className}`} style={style}>
      <AnimatedIllustration 
        animationData={educationAnimation} 
        className="w-full h-full"
      />
      {/* Fallback static SVG in case the animation doesn't load */}
      <svg 
        className="absolute inset-0 w-full h-full text-primary-400" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17L12 21L19 17V13.18L12 17L5 13.18Z" 
              fill="currentColor" />
      </svg>
    </div>
  );
};

export default EducationIllustration;
