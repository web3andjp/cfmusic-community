import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles
          "flex h-10 w-full rounded-md border border-white/20 bg-[#1A1A1A] px-3 py-2 text-white",
          "placeholder:text-white/50",
          // Focus ring
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-campfire-amber focus-visible:ring-offset-0",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };