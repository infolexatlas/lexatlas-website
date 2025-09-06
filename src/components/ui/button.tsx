import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl2 text-sm font-medium ring-offset-background transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:hover:scale-100",
  {
    variants: {
      variant: {
        default: "bg-brand-navy text-white shadow-soft hover:scale-105 hover:shadow-premium hover:border hover:border-brand-gold focus-visible:ring-gold-glow",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-brand-navy text-brand-navy bg-white shadow-soft hover:scale-105 hover:shadow-premium hover:border-brand-gold focus-visible:ring-gold-glow",
        secondary:
          "bg-white text-brand-navy border border-brand-navy shadow-soft hover:scale-105 hover:shadow-premium hover:border-brand-gold focus-visible:ring-gold-glow",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-brand-navy underline-offset-4 hover:underline decoration-brand-gold",
        premium: "bg-gradient-to-r from-brand-navy to-brand-navyEdge text-white shadow-premium hover:scale-105 hover:shadow-soft hover:border hover:border-brand-gold focus-visible:ring-gold-glow",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-xl2 px-3",
        lg: "h-11 rounded-xl2 px-8",
        xl: "h-12 rounded-xl2 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
