import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Scroll-triggered section revealer
export const ScrollRevealSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}> = ({ children, className = "", direction = 'up', distance = 50 }) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance, x: 0 };
      case 'down': return { y: -distance, x: 0 };
      case 'left': return { x: distance, y: 0 };
      case 'right': return { x: -distance, y: 0 };
      default: return { y: distance, x: 0 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={{ ...getInitialPosition(), opacity: 0 }}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      viewport={{ once: true, margin: "-10%" }}
    >
      {children}
    </motion.div>
  );
};

// Staggered children container
export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}> = ({ children, className = "", staggerDelay = 0.1 }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.2
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { 
          y: 30, 
          opacity: 0,
          scale: 0.95
        },
        visible: {
          y: 0,
          opacity: 1,
          scale: 1,
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

// Scroll-triggered number counter
export const ScrollCounter: React.FC<{
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}> = ({ value, duration = 2, suffix = "", prefix = "", className = "" }) => {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTime: number;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            
            // Easing function for smooth counting
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * value));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(value);
            }
          };
          requestAnimationFrame(animate);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

// Scroll-triggered progress bar
export const ScrollProgressBar: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = "", color = "primary" }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className={`h-1 bg-${color} origin-left ${className}`}
      style={{ scaleX }}
    />
  );
};

// Parallax text effect
export const ParallaxText: React.FC<{
  children: React.ReactNode;
  speed?: number;
  className?: string;
}> = ({ children, speed = 0.5, className = "" }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Morphing background based on scroll
export const ScrollMorphBackground: React.FC<{
  children: React.ReactNode;
  colors: string[];
  className?: string;
}> = ({ children, colors, className = "" }) => {
  const { scrollYProgress } = useScroll();
  
  const backgroundIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, colors.length - 1]
  );

  return (
    <motion.div
      className={className}
      style={{
        background: useTransform(backgroundIndex, (latest) => {
          const index = Math.floor(latest);
          const progress = latest - index;
          const currentColor = colors[index] || colors[0];
          const nextColor = colors[index + 1] || colors[colors.length - 1];
          
          // Simple color interpolation
          return `linear-gradient(135deg, ${currentColor}, ${nextColor})`;
        })
      }}
    >
      {children}
    </motion.div>
  );
};

// Cascade animation for grid items
export const CascadeGrid: React.FC<{
  children: React.ReactNode;
  columns?: number;
  className?: string;
}> = ({ children, columns = 3, className = "" }) => {
  return (
    <motion.div
      className={`grid grid-cols-${columns} gap-6 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
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
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { 
              opacity: 0, 
              y: 50,
              rotateX: 45,
              scale: 0.8
            },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: (index % columns) * 0.1
              }
            }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Scroll-triggered icon animation
export const ScrollIcon: React.FC<{
  icon: React.ReactNode;
  animationType?: 'bounce' | 'spin' | 'pulse' | 'shake';
  className?: string;
}> = ({ icon, animationType = 'bounce', className = "" }) => {
  const getAnimation = () => {
    switch (animationType) {
      case 'bounce':
        return {
          y: [0, -10, 0],
          transition: { duration: 1, repeat: Infinity }
        };
      case 'spin':
        return {
          rotate: [0, 360],
          transition: { duration: 2, repeat: Infinity, ease: "linear" as const }
        };
      case 'pulse':
        return {
          scale: [1, 1.1, 1],
          transition: { duration: 1.5, repeat: Infinity }
        };
      case 'shake':
        return {
          x: [0, -2, 2, -2, 2, 0],
          transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 }
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      animate={getAnimation()}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {icon}
    </motion.div>
  );
};

// Section divider with animation
export const AnimatedDivider: React.FC<{
  type?: 'line' | 'wave' | 'dots';
  className?: string;
}> = ({ type = 'line', className = "" }) => {
  if (type === 'line') {
    return (
      <motion.div
        className={`h-px bg-gradient-to-r from-transparent via-primary to-transparent ${className}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
    );
  }

  if (type === 'dots') {
    return (
      <motion.div
        className={`flex justify-center gap-2 ${className}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary rounded-full"
            variants={{
              hidden: { scale: 0 },
              visible: { 
                scale: 1,
                transition: { type: "spring", stiffness: 300, damping: 25 }
              }
            }}
          />
        ))}
      </motion.div>
    );
  }

  return null;
};

export default {
  ScrollRevealSection,
  StaggerContainer,
  StaggerItem,
  ScrollCounter,
  ScrollProgressBar,
  ParallaxText,
  ScrollMorphBackground,
  CascadeGrid,
  ScrollIcon,
  AnimatedDivider
};