import React from 'react';
import { motion } from 'framer-motion';

// Skeleton loading animation
const skeletonVariants = {
  loading: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

// Basic skeleton component
export const Skeleton: React.FC<{ className?: string }> = ({ className = "" }) => (
  <motion.div
    variants={skeletonVariants}
    animate="loading"
    className={`bg-gray-200 rounded ${className}`}
  />
);

// Card skeleton
export const SkeletonCard: React.FC = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
    <Skeleton className="h-48 w-full rounded-lg" />
    <div className="space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-8 w-20 rounded-full" />
      <Skeleton className="h-8 w-24 rounded-full" />
    </div>
  </div>
);

// Sermon card skeleton
export const SkeletonSermonCard: React.FC = () => (
  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
    <Skeleton className="h-56 w-full" />
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
      </div>
      <Skeleton className="h-4 w-32" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  </div>
);

// Loading spinner with enhanced animation
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center py-8">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-primary border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

// Enhanced loading state with text
export const LoadingState: React.FC<{ text?: string; showSpinner?: boolean }> = ({ 
  text = "Loading...", 
  showSpinner = true 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="text-center py-12"
  >
    {showSpinner && (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"
      />
    )}
    <motion.p
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="text-gray-600 font-medium"
    >
      {text}
    </motion.p>
  </motion.div>
);

// Grid skeleton for multiple items
export const SkeletonGrid: React.FC<{ count?: number; type?: 'card' | 'sermon' }> = ({ 
  count = 3, 
  type = 'card' 
}) => (
  <div className="grid md:grid-cols-3 gap-8">
    {Array.from({ length: count }).map((_, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        {type === 'sermon' ? <SkeletonSermonCard /> : <SkeletonCard />}
      </motion.div>
    ))}
  </div>
);

export default {
  Skeleton,
  SkeletonCard,
  SkeletonSermonCard,
  LoadingSpinner,
  LoadingState,
  SkeletonGrid
};