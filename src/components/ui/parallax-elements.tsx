import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

// Basic parallax element
export const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = ""
}) => {
  const { scrollY } = useScroll();
  
  const getTransform = () => {
    switch (direction) {
      case 'up':
        return useTransform(scrollY, [0, 1000], [0, -speed * 1000]);
      case 'down':
        return useTransform(scrollY, [0, 1000], [0, speed * 1000]);
      case 'left':
        return useTransform(scrollY, [0, 1000], [0, -speed * 1000]);
      case 'right':
        return useTransform(scrollY, [0, 1000], [0, speed * 1000]);
      default:
        return useTransform(scrollY, [0, 1000], [0, -speed * 1000]);
    }
  };

  const transform = getTransform();
  const springTransform = useSpring(transform, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className={className}
      style={{
        [direction === 'left' || direction === 'right' ? 'x' : 'y']: springTransform
      }}
    >
      {children}
    </motion.div>
  );
};

// Floating background elements for hero section
export const FloatingElement: React.FC<{
  delay?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}> = ({ delay = 0, duration = 4, className = "", children }) => (
  <motion.div
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.05, 1]
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className={`absolute ${className}`}
  >
    {children}
  </motion.div>
);

// Background particles
export const BackgroundParticles: React.FC = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute bg-primary/10 rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Parallax background with multiple layers
export const ParallaxBackground: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const { scrollY } = useScroll();
  
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -300]);
  const midgroundY = useTransform(scrollY, [0, 1000], [0, -150]);
  
  return (
    <div className={`relative ${className}`}>
      {/* Far background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-20"
      >
        <BackgroundParticles />
      </motion.div>
      
      {/* Mid background */}
      <motion.div
        style={{ y: midgroundY }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-secondary/5 rounded-full blur-xl" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-accent/5 rounded-full blur-xl" />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Scroll-triggered reveal with parallax
export const ParallaxReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [100, -100]);
  const opacity = useTransform(scrollY, [0, 300, 700], [0, 1, 1]);
  
  return (
    <motion.div
      style={{ y, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Interactive magnetic field effect
export const MagneticField: React.FC<{
  children: React.ReactNode;
  strength?: number;
  className?: string;
}> = ({ children, strength = 0.3, className = "" }) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) * strength;
    const y = (e.clientY - centerY) * strength;
    
    setMousePosition({ x, y });
  };
  
  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: isHovered ? 1.05 : 1
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      {children}
    </motion.div>
  );
};

// Staggered container for multiple elements
export const StaggeredParallaxContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredParallaxItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { 
          y: 50, 
          opacity: 0,
          rotateX: 45
        },
        visible: {
          y: 0,
          opacity: 1,
          rotateX: 0,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 12
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export default {
  ParallaxElement,
  FloatingElement,
  BackgroundParticles,
  ParallaxBackground,
  ParallaxReveal,
  MagneticField,
  StaggeredParallaxContainer,
  StaggeredParallaxItem
};