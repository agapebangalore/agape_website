import React from 'react';
import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  [key: string]: any;
}

const Marquee = ({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  ...props
}: MarqueeProps) => {
  const animationName = vertical ? 'marquee-vertical' : 'marquee';
  const animationDirection = reverse ? 'reverse' : 'normal';

  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      <div
        className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
          "group-hover:[animation-play-state:paused]": pauseOnHover,
          "animate-marquee flex-row": !vertical,
          "animate-marquee-vertical flex-col": vertical,
        })}
        style={{
          animationName,
          animationDirection,
        }}
      >
        {children}
      </div>
      <div
        className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
          "group-hover:[animation-play-state:paused]": pauseOnHover,
          "animate-marquee flex-row": !vertical,
          "animate-marquee-vertical flex-col": vertical,
        })}
        style={{
          animationName,
          animationDirection,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Marquee; 