import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-[10px] border border-border bg-white px-4 py-3 text-base text-slate-900 placeholder:text-text-muted outline-none focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50 resize-y transition-colors",
          error && "border-error focus:ring-error focus:border-error",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
