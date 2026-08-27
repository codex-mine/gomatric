"use client";

import { useTheme } from "@/providers/theme-provider";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
  variant?: "ghost" | "pill";
}

export function ThemeToggle({ className, variant = "ghost" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse", className)} />
    );
  }

  const isDark = theme === "dark";

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer select-none",
          isDark
            ? "bg-slate-900 border-slate-700 text-amber-300 hover:border-amber-400/50"
            : "bg-slate-100 border-slate-200 text-[#061474] hover:border-slate-300",
          className
        )}
      >
        {isDark ? (
          <>
            <Sun className="w-3.5 h-3.5 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
            <span>Light</span>
          </>
        ) : (
          <>
            <Moon className="w-3.5 h-3.5 text-[#061474] transition-transform duration-300 rotate-0 hover:-rotate-12" />
            <span>Dark</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={cn(
        "relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer select-none border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-xs",
        className
      )}
    >
      <Sun
        className={cn(
          "w-4 h-4 text-amber-500 transition-all duration-300 absolute",
          isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
        )}
      />
      <Moon
        className={cn(
          "w-4 h-4 text-[#061474] transition-all duration-300 absolute",
          isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
        )}
      />
    </button>
  );
}
