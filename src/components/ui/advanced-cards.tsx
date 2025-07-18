import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdvancedCardProps {
  children: React.ReactNode;
  className?: string;
  tiltIntensity?: number;
  glowEffect?: boolean;
  hoverScale?: number;
}

// 3D Tilt Card
export const TiltCard: React.FC<AdvancedCardProps> = ({
  children,
  className = "",
  tiltIntensity = 10,
  glowEffect = false,
  hoverScale = 1.05
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [tiltIntensity, -tiltIntensity]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-tiltIntensity, tiltIntensity]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: hoverScale }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className={`relative ${className}`}
    >
      <Card className={`relative transition-all duration-300 ${glowEffect ? 'hover:shadow-2xl hover:shadow-primary/20' : ''}`}>
        <div style={{ transform: "translateZ(50px)" }}>
          {children}
        </div>
      </Card>
    </motion.div>
  );
};

// Morphing Card
export const MorphingCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <motion.div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
    >
      <motion.div
        animate={{
          borderRadius: isHovered ? "20px" : "12px",
          boxShadow: isHovered 
            ? "0 25px 50px rgba(0,0,0,0.15)" 
            : "0 4px 6px rgba(0,0,0,0.1)"
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        className="overflow-hidden bg-white"
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.02 : 1
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Flip Card
export const FlipCard: React.FC<{
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}> = ({ front, back, className = "" }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);
  
  return (
    <div className={`relative w-full h-64 ${className}`}>
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden cursor-pointer"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Card className="w-full h-full">
            {front}
          </Card>
        </div>
        
        {/* Back */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden cursor-pointer"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <Card className="w-full h-full">
            {back}
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

// Expanding Card
export const ExpandingCard: React.FC<{
  title: string;
  preview: React.ReactNode;
  expanded: React.ReactNode;
  className?: string;
}> = ({ title, preview, expanded, className = "" }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  return (
    <motion.div
      className={className}
      layout
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <Card className="cursor-pointer overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {title}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▼
            </motion.div>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <motion.div layout="position">
            {preview}
          </motion.div>
          
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {expanded}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Slide-in Card
export const SlideInCard: React.FC<{
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  className?: string;
}> = ({ children, direction = 'up', delay = 0, className = "" }) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: -100, y: 0 };
      case 'right': return { x: 100, y: 0 };
      case 'up': return { x: 0, y: 50 };
      case 'down': return { x: 0, y: -50 };
      default: return { x: 0, y: 50 };
    }
  };
  
  return (
    <motion.div
      className={className}
      initial={{ ...getInitialPosition(), opacity: 0 }}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 12
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
};

// Reveal Card (with staggered content)
export const RevealCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      onViewportEnter={() => setIsVisible(true)}
    >
      <Card className="overflow-hidden">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </Card>
    </motion.div>
  );
};

// Floating Card with shadow
export const FloatingCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  floatHeight?: number;
}> = ({ children, className = "", floatHeight = 10 }) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -floatHeight, 0],
        boxShadow: [
          "0 4px 6px rgba(0,0,0,0.1)",
          `0 ${floatHeight + 10}px ${floatHeight + 20}px rgba(0,0,0,0.15)`,
          "0 4px 6px rgba(0,0,0,0.1)"
        ]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Card className="relative">
        {children}
      </Card>
    </motion.div>
  );
};

export default {
  TiltCard,
  MorphingCard,
  FlipCard,
  ExpandingCard,
  SlideInCard,
  RevealCard,
  FloatingCard
};