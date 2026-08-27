"use client";

import { forwardRef, SelectHTMLAttributes, InputHTMLAttributes } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { COUNTRY_CODES, CountryCode } from "@/lib/constants/country-codes";

export interface AuthPhoneFieldProps {
  label?: string;
  error?: string;
  phoneCodeProps?: SelectHTMLAttributes<HTMLSelectElement>;
  phoneNumberProps?: InputHTMLAttributes<HTMLInputElement>;
  countryCodes?: CountryCode[];
  className?: string;
}

export const AuthPhoneField = forwardRef<HTMLInputElement, AuthPhoneFieldProps>(
  (
    {
      label = "Phone Number",
      error,
      phoneCodeProps,
      phoneNumberProps,
      countryCodes = COUNTRY_CODES,
      className,
    },
    ref
  ) => {
    return (
      <div className={cn("space-y-1.5 w-full", className)}>
        {/* Label */}
        {label && (
          <label className="block text-[13px] sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
            {label}
          </label>
        )}

        {/* Input Wrapper */}
        <div
          className={cn(
            "relative flex items-stretch h-[46px] sm:h-12 rounded-md border border-slate-200 dark:border-slate-700/80 bg-[#F8FAFC]/60 dark:bg-slate-800/50 transition-all duration-200 focus-within:bg-white dark:focus-within:bg-slate-800 focus-within:border-[#061474] dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-[#061474]/10 dark:focus-within:ring-blue-500/20",
            error &&
              "border-red-500 dark:border-red-500 focus-within:border-red-500 focus-within:ring-red-500/10"
          )}
        >
          {/* Country Code Selector Box */}
          <div className="relative flex items-center shrink-0 border-r border-slate-200 dark:border-slate-700/80 bg-slate-100/70 dark:bg-slate-800/80 rounded-l-md hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors">
            <select
              aria-label="Select Country Code"
              className="appearance-none h-full pl-3 pr-7 sm:pl-3.5 sm:pr-8 bg-transparent text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 outline-none cursor-pointer z-10"
              {...phoneCodeProps}
            >
              {countryCodes.map((item) => (
                <option
                  key={`${item.country}-${item.code}`}
                  value={item.code}
                  className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white py-1"
                >
                  {item.flag} {item.code} ({item.name})
                </option>
              ))}
            </select>

            <ChevronDown className="absolute right-2 sm:right-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Phone Number Input Field */}
          <div className="relative flex-1 flex items-center">
            <input
              ref={ref}
              type="tel"
              autoComplete="tel"
              placeholder="(555) 000-0000"
              className="w-full h-full px-3.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-transparent outline-none"
              {...phoneNumberProps}
            />
          </div>
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

AuthPhoneField.displayName = "AuthPhoneField";
