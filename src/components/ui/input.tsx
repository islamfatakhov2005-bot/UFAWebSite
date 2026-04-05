import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#333333] placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#3ECF8E]/50 focus:border-[#3ECF8E] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
export type { InputProps };
