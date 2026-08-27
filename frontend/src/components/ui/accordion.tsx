"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
}

interface AccordionContextValue {
  type: "single" | "multiple";
  value: string | string[];
  onValueChange: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, type = "single", collapsible: _collapsible, defaultValue = type === "single" ? "" : [], ...props }, ref) => {
    const [value, setValue] = React.useState<string | string[]>(defaultValue);

    const handleValueChange = (itemValue: string) => {
      if (type === "single") {
        setValue(value === itemValue ? "" : itemValue);
      } else {
        const arrValue = Array.isArray(value) ? value : [];
        if (arrValue.includes(itemValue)) {
          setValue(arrValue.filter((v) => v !== itemValue));
        } else {
          setValue([...arrValue, itemValue]);
        }
      }
    };

    return (
      <AccordionContext.Provider value={{ type, value, onValueChange: handleValueChange }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </AccordionContext.Provider>
    )
  }
)
Accordion.displayName = "Accordion"

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | undefined>(undefined);

const AccordionItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(
  ({ className, value, ...props }, ref) => {
    const context = React.useContext(AccordionContext);
    if (!context) throw new Error("AccordionItem must be used within Accordion");

    const isOpen = context.type === "single" 
      ? context.value === value 
      : Array.isArray(context.value) && context.value.includes(value);

    return (
      <AccordionItemContext.Provider value={{ value, isOpen }}>
        <div ref={ref} className={cn("border border-border rounded-md overflow-hidden bg-white", className)} {...props} />
      </AccordionItemContext.Provider>
    )
  }
)
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(AccordionContext);
    const itemContext = React.useContext(AccordionItemContext);
    
    if (!context || !itemContext) throw new Error("AccordionTrigger must be used within AccordionItem");

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={itemContext.isOpen}
        onClick={() => context.onValueChange(itemContext.value)}
        className={cn(
          "flex flex-1 w-full items-center justify-between p-4 font-medium transition-all hover:bg-surface text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown 
          className={cn(
            "h-5 w-5 shrink-0 text-text-muted transition-transform duration-200", 
            itemContext.isOpen && "rotate-180"
          )} 
        />
      </button>
    )
  }
)
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const itemContext = React.useContext(AccordionItemContext);
    if (!itemContext) throw new Error("AccordionContent must be used within AccordionItem");

    return (
      <div
        ref={ref}
        role="region"
        className={cn(
          "overflow-hidden text-sm transition-all duration-200 ease-in-out",
          itemContext.isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
        {...props}
      >
        <div className={cn("p-4 pt-0 text-text-secondary", className)}>
          {children}
        </div>
      </div>
    )
  }
)
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
