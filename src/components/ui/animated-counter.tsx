import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
  separator?: string;
  decimals?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2,
  className = "",
  suffix = "",
  prefix = "",
  separator = ",",
  decimals = 0
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(countRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const animation = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setCount(latest);
      }
    });

    return animation.stop;
  }, [isInView, value, duration]);

  const formatNumber = (num: number) => {
    const fixed = num.toFixed(decimals);
    if (separator && Math.abs(num) >= 1000) {
      return fixed.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    }
    return fixed;
  };

  return (
    <motion.span
      ref={countRef}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {prefix}{formatNumber(count)}{suffix}
    </motion.span>
  );
};

// Specialized counter for large numbers
export const LargeNumberCounter: React.FC<{
  value: number;
  className?: string;
  suffix?: string;
}> = ({ value, className = "", suffix = "" }) => {
  const formatValue = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  return (
    <AnimatedCounter
      value={value}
      className={className}
      suffix={suffix}
      duration={2.5}
    />
  );
};

// Percentage counter
export const PercentageCounter: React.FC<{
  value: number;
  className?: string;
  decimals?: number;
}> = ({ value, className = "", decimals = 0 }) => (
  <AnimatedCounter
    value={value}
    className={className}
    suffix="%"
    decimals={decimals}
    duration={2}
  />
);

// Statistics card with animated counter
export const StatCard: React.FC<{
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  className?: string;
  icon?: React.ReactNode;
}> = ({ value, label, suffix = "", prefix = "", className = "", icon }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      className={`text-center space-y-4 p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        transition: { duration: 0.3 }
      }}
    >
      {icon && (
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          {icon}
        </motion.div>
      )}
      <div className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-primary">
        <AnimatedCounter
          value={value}
          suffix={suffix}
          prefix={prefix}
          duration={2}
        />
      </div>
      <p className="text-gray-200 font-medium">{label}</p>
    </motion.div>
  );
};

export default AnimatedCounter;