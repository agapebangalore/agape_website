import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const as const, // Custom easing
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

// Fade transition
const fadeVariants = {
  initial: { opacity: 0 },
  enter: { 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

// Slide transition
const slideVariants = {
  initial: { x: "100%", opacity: 0 },
  enter: { 
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: { 
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

// Scale transition
const scaleVariants = {
  initial: { scale: 0.9, opacity: 0 },
  enter: { 
    scale: 1,
    opacity: 1,
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      scale: { type: "spring" as const, stiffness: 300, damping: 30 }
    }
  },
  exit: { 
    scale: 1.1,
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

interface PageTransitionProps {
  children: React.ReactNode;
  type?: 'default' | 'fade' | 'slide' | 'scale';
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  type = 'default',
  className = "" 
}) => {
  const location = useLocation();
  
  const getVariants = () => {
    switch (type) {
      case 'fade': return fadeVariants;
      case 'slide': return slideVariants;
      case 'scale': return scaleVariants;
      default: return pageVariants;
    }
  };
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={getVariants()}
        initial="initial"
        animate="enter"
        exit="exit"
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Specialized page transitions
export const FadePageTransition: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <PageTransition type="fade" className={className}>
    {children}
  </PageTransition>
);

export const SlidePageTransition: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <PageTransition type="slide" className={className}>
    {children}
  </PageTransition>
);

export const ScalePageTransition: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <PageTransition type="scale" className={className}>
    {children}
  </PageTransition>
);

// Staggered children animation
export const StaggeredContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredItem: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  return (
    <motion.div
      variants={itemVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Route-based page transition wrapper
export const RouteTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94] as const
        }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;