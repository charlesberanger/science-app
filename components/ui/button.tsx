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
    "font-mono",
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
          "bg-feedback-warning text-black hover:bg-feedback-warning/90",
        // Primary — inverts with theme (dark bg in light mode, white bg in dark mode)
        default:
          "bg-foreground text-background hover:bg-foreground/90",
        // Outline — border only, transparent bg
        outline:
          "border border-border bg-transparent text-foreground hover:bg-secondary hover:border-border",
        // Ghost — no border, subtle hover
        ghost:
          "bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary",
        // Danger — red tint
        destructive:
          "border border-destructive/30 bg-transparent text-destructive hover:bg-destructive/10",
        // Link (utility)
        link:
          "bg-transparent text-lime-400 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-label",
        default: "h-9 px-4 text-sm",
        lg: "h-11 px-6 text-sm",
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
