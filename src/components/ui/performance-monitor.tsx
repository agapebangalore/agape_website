import { useEffect } from 'react';

interface PerformanceMonitorProps {
  onMetrics?: (metrics: any) => void;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ onMetrics }) => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navigationEntry = entry as PerformanceNavigationTiming;
          const metrics = {
            // Time to First Byte
            ttfb: navigationEntry.responseStart - navigationEntry.fetchStart,
            // DOM Content Loaded
            domContentLoaded: navigationEntry.domContentLoadedEventEnd - navigationEntry.fetchStart,
            // Load Complete
            loadComplete: navigationEntry.loadEventEnd - navigationEntry.fetchStart,
            // First Contentful Paint (if available)
            fcp: 0,
            // Largest Contentful Paint (if available)
            lcp: 0,
          };
          
          if (onMetrics) {
            onMetrics(metrics);
          }
          
          // Log performance metrics in development
          if (process.env.NODE_ENV === 'development') {
            console.log('Performance Metrics:', metrics);
          }
        }
      }
    });

    observer.observe({ entryTypes: ['navigation'] });

    // Monitor LCP
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (process.env.NODE_ENV === 'development') {
        console.log('LCP:', lastEntry.startTime);
      }
    });

    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Monitor FCP
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const firstEntry = entries[0];
      
      if (process.env.NODE_ENV === 'development') {
        console.log('FCP:', firstEntry.startTime);
      }
    });

    fcpObserver.observe({ entryTypes: ['paint'] });

    return () => {
      observer.disconnect();
      lcpObserver.disconnect();
      fcpObserver.disconnect();
    };
  }, [onMetrics]);

  return null;
};

// Image optimization component
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      style={{
        aspectRatio: width && height ? `${width}/${height}` : undefined,
      }}
    />
  );
}; 