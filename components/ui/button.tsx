import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Button — Science DS
 * Sharp corners (radius 0), DM Mono labels, matches Figma component set:
 * Style=Gold | Primary | Outline | Ghost | Danger  ×  Size=SM | MD | LG
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-mono text-[11px] uppercase tracking-ui",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-30",
    "rounded-none", // always sharp
  ].join(" "),
  {
    variants: {
      variant: {
        // Gold — primary CTA (amber fill, dark text)
        gold:
          "bg-[#f0b840] text-[#0a0a0a] hover:bg-[#f0b840]/90",
        // Primary — white fill
        default:
          "bg-white text-[#0a0a0a] hover:bg-white/90",
        // Outline — border only, transparent bg
        outline:
          "border border-[#2a2a2a] bg-transparent text-white hover:bg-[#1c1c1c] hover:border-[#3a3a3a]",
        // Ghost — no border, subtle hover
        ghost:
          "bg-transparent text-[#555] hover:text-white hover:bg-[#1c1c1c]",
        // Danger — red tint
        destructive:
          "border border-[#f87171]/30 bg-transparent text-[#f87171] hover:bg-[#f87171]/10",
        // Link (utility)
        link:
          "bg-transparent text-[#acffaf] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-label",
        default: "h-9 px-4",
        lg: "h-11 px-6 text-[12px]",
        icon: "h-9 w-9",
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
