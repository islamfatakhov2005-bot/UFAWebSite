"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-shadow transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-[#3ECF8E] to-[#4AADAD] text-white shadow-sm hover:shadow-lg hover:shadow-[#3ECF8E]/25 hover:opacity-95",
        outline:
          "border-2 border-[#3ECF8E] text-[#2A9D6F] bg-transparent hover:bg-[#3ECF8E] hover:text-white hover:border-[#3ECF8E]",
        ghost:
          "bg-transparent hover:bg-gray-100 text-[#333333]",
        secondary:
          "bg-[#1A2332] text-white shadow-sm hover:bg-[#1A2332]/90",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700",
        amber:
          "bg-[#F59E0B] text-white shadow-sm hover:bg-[#D97706] hover:shadow-lg hover:shadow-[#F59E0B]/25",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-5 py-2",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props,
      });
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
