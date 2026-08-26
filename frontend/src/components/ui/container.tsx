import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const containerVariants = cva(
  "mx-auto px-5 md:px-8 w-full",
  {
    variants: {
      size: {
        default: "max-w-[1280px]",
        large: "max-w-[1440px]",
        narrow: "max-w-[760px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ size, className }))}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

export { Container, containerVariants }
