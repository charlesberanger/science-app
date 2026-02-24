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
    "inline-flex items-center gap-1.5 rounded-full border",
    "px-2.5 py-0.5",
    "font-mono text-[9px] uppercase tracking-widest",
    "transition-colors",
  ].join(" "),
  {
    variants: {
      variant: {
        default:     "border-[#2a2a2a] bg-transparent text-[#555]",
        gold:        "border-[#fcd34d]/50 bg-[#1a1300]/60 text-[#fcd34d]",
        success:     "border-[#4ade80]/30 bg-[#4ade80]/10 text-[#4ade80]",
        warning:     "border-[#fcd34d]/30 bg-[#fcd34d]/10 text-[#fcd34d]",
        destructive: "border-[#f87171]/30 bg-[#f87171]/10 text-[#f87171]",
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
    default:     "bg-[#555]",
    gold:        "bg-[#fcd34d]",
    success:     "bg-[#4ade80]",
    warning:     "bg-[#fcd34d]",
    destructive: "bg-[#f87171]",
  }
  const v = (variant ?? "default") as string

  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dotColor[v])} />
      )}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
