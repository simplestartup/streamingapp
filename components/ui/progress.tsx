"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

// Extend CSSProperties to include custom properties
interface CustomCSSProperties extends React.CSSProperties {
  "--progress-background"?: string;
}

// Update the component props to use the extended type
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    style?: CustomCSSProperties; // Use the extended type here
  }
>(({ className, value, style, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 transition-all"
      style={{
        transform: `translateX(-${100 - (value || 0)}%)`,
        backgroundColor: style?.["--progress-background"] || "var(--primary)",
      }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
