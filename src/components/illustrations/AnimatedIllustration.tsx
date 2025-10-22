import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

interface AnimatedIllustrationProps {
  animationData: any; // Lottie animation JSON data
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  style?: React.CSSProperties;
}

const AnimatedIllustration: React.FC<AnimatedIllustrationProps> = ({
  animationData,
  className = '',
  loop = true,
  autoplay = true,
  speed = 1,
  style = {},
}) => {
  return (
    <div className={`relative ${className}`} style={style}>
      <Player
        autoplay={autoplay}
        loop={loop}
        speed={speed}
        src={animationData}
        className="w-full h-full"
      />
    </div>
  );
};

export default AnimatedIllustration;
