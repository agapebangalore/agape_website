import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Breathing effect for elements
export const BreathingElement: React.FC<{
  children: React.ReactNode;
  intensity?: number;
  duration?: number;
  className?: string;
}> = ({ children, intensity = 0.05, duration = 4, className = "" }) => {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1 + intensity, 1],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

// Pulsing glow effect
export const PulsingGlow: React.FC<{
  children: React.ReactNode;
  color?: string;
  intensity?: number;
  className?: string;
}> = ({ children, color = "primary", intensity = 0.3, className = "" }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        boxShadow: [
          `0 0 0 0 hsl(var(--${color}) / 0)`,
          `0 0 20px 5px hsl(var(--${color}) / ${intensity})`,
          `0 0 0 0 hsl(var(--${color}) / 0)`
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

// Magnetic hover effect
export const MagneticHover: React.FC<{
  children: React.ReactNode;
  strength?: number;
  className?: string;
}> = ({ children, strength = 0.2, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    x.set(deltaX);
    y.set(deltaY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

// Morphing shape
export const MorphingShape: React.FC<{
  shapes: string[];
  duration?: number;
  className?: string;
}> = ({ shapes, duration = 3, className = "" }) => {
  const [currentShape, setCurrentShape] = React.useState(0);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShape((prev) => (prev + 1) % shapes.length);
    }, duration * 1000);
    
    return () => clearInterval(interval);
  }, [shapes.length, duration]);
  
  return (
    <motion.div
      className={className}
      animate={{
        clipPath: shapes[currentShape]
      }}
      transition={{
        duration: duration * 0.8,
        ease: "easeInOut"
      }}
    />
  );
};

// Text reveal animation
export const TextReveal: React.FC<{
  text: string;
  delay?: number;
  className?: string;
}> = ({ text, delay = 0, className = "" }) => {
  const words = text.split(' ');
  
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay
          }
        }
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
              }
            }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Cursor follower
export const CursorFollower: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = React.useState(false);
  
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div
      className={className}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      {isVisible && (
        <motion.div
          className="fixed pointer-events-none z-50 w-6 h-6 bg-primary/20 rounded-full"
          animate={{
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
            scale: isVisible ? 1 : 0
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        />
      )}
    </div>
  );
};

// Particle burst on click
export const ParticleBurst: React.FC<{
  children: React.ReactNode;
  particleCount?: number;
  className?: string;
}> = ({ children, particleCount = 8, className = "" }) => {
  const [particles, setParticles] = React.useState<Array<{
    id: number;
    x: number;
    y: number;
    angle: number;
  }>>([]);
  
  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      angle: (360 / particleCount) * i
    }));
    
    setParticles(newParticles);
    
    // Clean up particles after animation
    setTimeout(() => {
      setParticles([]);
    }, 1000);
  };
  
  return (
    <div className={`relative ${className}`} onClick={handleClick}>
      {children}
      
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-primary rounded-full pointer-events-none"
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 1,
            scale: 0
          }}
          animate={{
            x: particle.x + Math.cos(particle.angle * Math.PI / 180) * 50,
            y: particle.y + Math.sin(particle.angle * Math.PI / 180) * 50,
            opacity: 0,
            scale: 1
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

// Elastic scale on hover
export const ElasticScale: React.FC<{
  children: React.ReactNode;
  scale?: number;
  className?: string;
}> = ({ children, scale = 1.1, className = "" }) => {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 10
      }}
    >
      {children}
    </motion.div>
  );
};

// Liquid button effect
export const LiquidButton: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-primary/20"
        initial={{ scale: 0, borderRadius: "50%" }}
        animate={{
          scale: isHovered ? 2 : 0,
          borderRadius: isHovered ? "0%" : "50%"
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut"
        }}
      />
      
      <span className="relative z-10">
        {children}
      </span>
    </motion.button>
  );
};

// Ripple effect
export const RippleEffect: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const [ripples, setRipples] = React.useState<Array<{
    x: number;
    y: number;
    id: number;
  }>>([]);
  
  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples([...ripples, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };
  
  return (
    <div className={`relative overflow-hidden ${className}`} onClick={handleClick}>
      {children}
      
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          initial={{
            x: ripple.x,
            y: ripple.y,
            width: 0,
            height: 0,
            opacity: 1
          }}
          animate={{
            width: 100,
            height: 100,
            x: ripple.x - 50,
            y: ripple.y - 50,
            opacity: 0
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

export default {
  BreathingElement,
  PulsingGlow,
  MagneticHover,
  MorphingShape,
  TextReveal,
  CursorFollower,
  ParticleBurst,
  ElasticScale,
  LiquidButton,
  RippleEffect
};