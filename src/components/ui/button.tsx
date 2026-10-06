import * as React from "react"
import { cn } from "@/lib/utils/cn"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp'
  size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            'bg-purple-600 text-white hover:bg-purple-700 focus-visible:ring-purple-600': variant === 'primary',
            'bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-900': variant === 'secondary',
            'border-2 border-purple-600 text-purple-600 hover:bg-purple-50 focus-visible:ring-purple-600': variant === 'outline',
            'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-900': variant === 'ghost',
            'bg-green-500 text-white hover:bg-green-600 focus-visible:ring-green-500': variant === 'whatsapp',
          },
          {
            'h-9 px-4 text-sm': size === 'sm',
            'h-11 px-6 text-base': size === 'md',
            'h-14 px-8 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
