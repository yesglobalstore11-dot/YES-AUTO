import * as React from "react"
import { cn } from "@/lib/utils/cn"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger'
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
          {
            'bg-purple-600 text-white': variant === 'default',
            'bg-gray-200 text-gray-800': variant === 'secondary',
            'bg-green-500 text-white': variant === 'success',
            'bg-yellow-500 text-white': variant === 'warning',
            'bg-red-500 text-white': variant === 'danger',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge }
