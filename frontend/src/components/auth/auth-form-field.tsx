"use client";

import { forwardRef, useState, InputHTMLAttributes, ReactNode } from "react";
import { Eye, EyeOff, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AuthFormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: LucideIcon;
  rightLabelAction?: ReactNode;
  prefix?: string;
}

export const AuthFormField = forwardRef<HTMLInputElement, AuthFormFieldProps>(
  (
    {
      label,
      error,
      icon: Icon,
      type = "text",
      rightLabelAction,
      prefix,
      className,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === "password";
    const computedType = isPasswordType ? (showPassword ? "text" : "password") : type;

    return (
      <div className="space-y-1.5 w-full">
        {/* Label & Optional Right Action Link */}
        <div className="flex items-center justify-between">
          <label className="block text-[13px] sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
            {label}
          </label>
          {rightLabelAction && (
            <div className="text-xs font-semibold text-[#061474] dark:text-blue-400 hover:text-[#ED1B26] dark:hover:text-[#ED1B26] transition-colors">
              {rightLabelAction}
            </div>
          )}
        </div>

        {/* Input Wrapper */}
        <div className="relative flex items-center">
          {/* Prefix (e.g. +1 for phone) */}
          {prefix && (
            <div className="flex items-center justify-center px-3.5 h-[46px] sm:h-12 bg-slate-100 dark:bg-slate-800 border border-r-0 border-slate-200 dark:border-slate-700 rounded-l-md text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 select-none">
              {prefix}
            </div>
          )}

          {/* Leading Icon */}
          {Icon && !prefix && (
            <div className="absolute left-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
              <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </div>
          )}

          <input
            ref={ref}
            type={computedType}
            className={cn(
              "w-full h-[46px] sm:h-12 px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-[#F8FAFC]/60 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-md transition-all duration-200 focus:bg-white dark:focus:bg-slate-800 focus:border-[#061474] dark:focus:border-blue-500 focus:ring-2 focus:ring-[#061474]/10 dark:focus:ring-blue-500/20 outline-none",
              Icon && !prefix && "pl-10 sm:pl-11",
              prefix && "rounded-l-none",
              isPasswordType && "pr-11",
              error && "border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-500/10",
              className
            )}
            {...props}
          />

          {/* Password Show/Hide Button */}
          {isPasswordType && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Validation Error Message */}
        {error && (
          <p className="text-xs text-red-500 font-medium pl-1 animate-fadeIn">
            {error}
          </p>
        )}
      </div>
    );
  }
);

AuthFormField.displayName = "AuthFormField";
