import React from 'react';
import { motion, useScroll } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-[60] origin-left"
      style={{ scaleX: scrollYProgress }}
      initial={{ scaleX: 0 }}
      transition={{ duration: 0.1 }}
    />
  );
};

export default ScrollProgress;