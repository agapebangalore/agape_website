import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonProps {
  animationType?: 'bounce' | 'scale' | 'lift' | 'magnetic' | 'ripple';
  intensity?: 'subtle' | 'medium' | 'strong';
  children: React.ReactNode;
}

// Animation variants for different types
const animationVariants = {
  bounce: {
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.95, y: 0 },
    transition: { type: "spring" as const, stiffness: 400, damping: 17 }
  },
  scale: {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    transition: { type: "spring" as const, stiffness: 400, damping: 17 }
  },
  lift: {
    hover: { y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" },
    tap: { y: -2 },
    transition: { type: "spring" as const, stiffness: 400, damping: 17 }
  },
  magnetic: {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 400, damping: 17 }
  },
  ripple: {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    transition: { type: "spring" as const, stiffness: 400, damping: 17 }
  }
};

// Intensity modifiers
const intensityModifiers = {
  subtle: { scale: 0.5, shadow: 0.5 },
  medium: { scale: 1, shadow: 1 },
  strong: { scale: 1.5, shadow: 1.5 }
};

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  animationType = 'bounce',
  intensity = 'medium',
  children,
  className,
  ...props
}) => {
  const variants = animationVariants[animationType];
  const modifier = intensityModifiers[intensity];
  
  // Apply intensity modifiers
  const modifiedVariants = {
    ...variants,
    hover: {
      ...variants.hover,
      scale: (variants.hover as any).scale ? (variants.hover as any).scale * modifier.scale : 1,
      y: (variants.hover as any).y ? (variants.hover as any).y * modifier.scale : 0,
      boxShadow: (variants.hover as any).boxShadow ? 
        (variants.hover as any).boxShadow.replace(/rgba\(0,0,0,0\.15\)/, `rgba(0,0,0,${0.15 * modifier.shadow})`) : 
        (variants.hover as any).boxShadow
    }
  };

  return (
    <motion.div
      whileHover={modifiedVariants.hover}
      whileTap={modifiedVariants.tap}
      transition={modifiedVariants.transition}
      style={{ display: 'inline-block' }}
    >
      <Button
        className={cn(
          "relative overflow-hidden transition-all duration-200",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};

// Specialized button variants
export const PrimaryAnimatedButton: React.FC<Omit<AnimatedButtonProps, 'variant'>> = (props) => (
  <AnimatedButton 
    variant="default" 
    animationType="lift" 
    intensity="medium"
    className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl"
    {...props} 
  />
);

export const SecondaryAnimatedButton: React.FC<Omit<AnimatedButtonProps, 'variant'>> = (props) => (
  <AnimatedButton 
    variant="outline" 
    animationType="bounce" 
    intensity="subtle"
    className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
    {...props} 
  />
);

export const FloatingActionButton: React.FC<AnimatedButtonProps> = ({
  children,
  className,
  ...props
}) => (
  <motion.div
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.9, rotate: -5 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    className="fixed bottom-6 right-6 z-50"
  >
    <Button
      className={cn(
        "rounded-full p-4 shadow-lg hover:shadow-xl bg-primary hover:bg-primary/90 text-white",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  </motion.div>
);

// Magnetic button with cursor tracking
export const MagneticButton: React.FC<AnimatedButtonProps> = ({
  children,
  className,
  intensity = 'medium',
  ...props
}) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const strength = intensity === 'subtle' ? 0.1 : intensity === 'medium' ? 0.2 : 0.3;
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      setPosition({ x, y });
    }
  };
  
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };
  
  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ display: 'inline-block' }}
    >
      <Button
        className={cn(
          "relative overflow-hidden transition-all duration-200",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};

// Button with ripple effect
export const RippleButton: React.FC<AnimatedButtonProps> = ({
  children,
  className,
  ...props
}) => {
  const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([]);
  
  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    
    setRipples([...ripples, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      style={{ display: 'inline-block' }}
    >
      <Button
        className={cn(
          "relative overflow-hidden transition-all duration-200",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 0,
              height: 0,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 100, height: 100, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        ))}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;