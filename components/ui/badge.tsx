import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Badge — Science DS
 * Pill shape (rounded-full — the one exception to sharp corners).
 * Variants: default | gold | success | warning | destructive
 */
const badgeVariants = cva(
  [
    "inline-flex items-center gap-1 rounded-full border",
    "px-2 py-px",
    "font-mono text-ui",
    "transition-colors",
  ].join(" "),
  {
    variants: {
      variant: {
        default:     "border-border bg-transparent text-muted-foreground",
        gold:        "border-feedback-warning/50 bg-feedback-status-warning/60 text-feedback-warning",
        success:     "border-feedback-success/30 bg-feedback-success/10 text-feedback-success",
        warning:     "border-feedback-warning/30 bg-feedback-warning/10 text-feedback-warning",
        destructive: "border-destructive/30 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

function Badge({ className, variant, dot = true, children, ...props }: BadgeProps) {
  const dotColor: Record<string, string> = {
    default:     "bg-muted-foreground",
    gold:        "bg-feedback-warning",
    success:     "bg-feedback-success",
    warning:     "bg-feedback-warning",
    destructive: "bg-destructive",
  }
  const v = (variant ?? "default") as string

  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span className={cn("h-1 w-1 shrink-0 rounded-full", dotColor[v])} />
      )}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
