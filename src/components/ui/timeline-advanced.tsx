import React from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface TimelineEvent {
  year: string;
  age: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  type: 'early' | 'calling' | 'struggle' | 'training' | 'ministry' | 'family';
}

interface AdvancedTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

// Individual timeline item with advanced animations
const TimelineItem: React.FC<{
  event: TimelineEvent;
  index: number;
  isLast: boolean;
}> = ({ event, index, isLast }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  // Color mapping for different event types
  const typeColors = {
    early: 'bg-blue-500 shadow-blue-500/30',
    calling: 'bg-green-500 shadow-green-500/30',
    struggle: 'bg-red-500 shadow-red-500/30',
    training: 'bg-purple-500 shadow-purple-500/30',
    family: 'bg-yellow-500 shadow-yellow-500/30',
    ministry: 'bg-orange-500 shadow-orange-500/30'
  };

  const typeGlow = {
    early: 'shadow-lg shadow-blue-500/20',
    calling: 'shadow-lg shadow-green-500/20',
    struggle: 'shadow-lg shadow-red-500/20',
    training: 'shadow-lg shadow-purple-500/20',
    family: 'shadow-lg shadow-yellow-500/20',
    ministry: 'shadow-lg shadow-orange-500/20'
  };

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-8 mb-16 relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Timeline line and marker */}
      <div className="flex flex-col items-center relative z-10">
        {/* Animated connection line */}
        {!isLast && (
          <motion.div
            className="w-0.5 h-24 bg-gradient-to-b from-gray-400 to-gray-600 mt-16"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
            style={{ originY: 0 }}
          />
        )}
        
        {/* Marker with glow effect */}
        <motion.div
          className={`
            relative w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold
            ${typeColors[event.type]} ${typeGlow[event.type]}
          `}
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            delay: index * 0.2 + 0.1
          }}
          whileHover={{ 
            scale: 1.1, 
            boxShadow: `0 0 30px ${typeColors[event.type].includes('blue') ? '#3b82f6' : 
                                    typeColors[event.type].includes('green') ? '#10b981' :
                                    typeColors[event.type].includes('red') ? '#ef4444' :
                                    typeColors[event.type].includes('purple') ? '#8b5cf6' :
                                    typeColors[event.type].includes('yellow') ? '#f59e0b' : '#f97316'}40`
          }}
        >
          {/* Pulsing ring */}
          <motion.div
            className={`absolute inset-0 rounded-full border-2 ${
              typeColors[event.type].replace('bg-', 'border-').split(' ')[0]
            }`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2
            }}
          />
          
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.4 }}
          >
            {event.icon}
          </motion.div>
        </motion.div>
      </div>

      {/* Content card with slide animation */}
      <motion.div
        className={`flex-1 ${isEven ? 'ml-8' : 'mr-8'}`}
        initial={{ 
          x: isEven ? 100 : -100, 
          opacity: 0,
          rotateY: isEven ? 45 : -45
        }}
        animate={isInView ? { 
          x: 0, 
          opacity: 1,
          rotateY: 0
        } : {}}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: index * 0.2 + 0.2
        }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      >
        <Card className={`group hover:${typeGlow[event.type]} transition-all duration-300 bg-gray-900/80 text-white border border-gray-700`}>
          <CardContent className="p-6">
            {/* Header with animated badges */}
            <motion.div 
              className="flex items-center gap-4 mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: index * 0.2 + 0.5 }}
            >
              <motion.span 
                className="text-2xl font-bold text-yellow-400"
                whileHover={{ scale: 1.1 }}
              >
                {event.year}
              </motion.span>
              <motion.span 
                className="text-sm bg-gray-700 text-gray-200 px-3 py-1 rounded-full"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: index * 0.2 + 0.6 
                }}
              >
                {event.age}
              </motion.span>
            </motion.div>

            {/* Title with typewriter effect */}
            <motion.h3 
              className="text-2xl text-white font-semibold mb-3"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.2 + 0.7 }}
            >
              {event.title}
            </motion.h3>

            {/* Description with staggered reveal */}
            <motion.p 
              className="text-gray-200 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 + 0.8 }}
            >
              {event.description}
            </motion.p>

            {/* Hover effect overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

// Main timeline component
export const AdvancedTimeline: React.FC<AdvancedTimelineProps> = ({
  events,
  className = ""
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animated progress line
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Background animated progress line */}
      <motion.div
        className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-30"
        style={{ height: progressHeight }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + i * 8}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      {/* Timeline items */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {events.map((event, index) => (
          <TimelineItem
            key={index}
            event={event}
            index={index}
            isLast={index === events.length - 1}
          />
        ))}
      </div>

      {/* Completion celebration */}
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold"
          whileHover={{ scale: 1.05 }}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(59, 130, 246, 0)",
              "0 0 0 10px rgba(59, 130, 246, 0.1)",
              "0 0 0 0 rgba(59, 130, 246, 0)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          ✨ Journey Continues Today ✨
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdvancedTimeline;