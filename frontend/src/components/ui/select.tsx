import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          className={cn(
            "flex h-12 w-full appearance-none rounded-[10px] border border-border bg-white px-4 py-2 pr-10 text-base ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/15 focus-visible:border-brand-primary disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-error focus-visible:ring-error/15 focus-visible:border-error",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted pointer-events-none" />
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }
