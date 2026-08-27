"use client";

import { useTheme } from "@/providers/theme-provider";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
  variant?: "ghost" | "pill";
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("w-9 h-9 rounded-full bg-transparent", className)} />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={cn(
        "relative w-9 h-9 flex items-center justify-center bg-transparent border-0 outline-none cursor-pointer select-none text-slate-700 dark:text-slate-200 hover:text-[#ED1B26] dark:hover:text-amber-400 hover:scale-110 active:scale-95 transition-all duration-300",
        className
      )}
    >
      <Sun
        className={cn(
          "w-5 h-5 text-amber-400 transition-all duration-300 absolute",
          isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
        )}
      />
      <Moon
        className={cn(
          "w-5 h-5 text-[#061474] dark:text-slate-200 transition-all duration-300 absolute",
          isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
        )}
      />
    </button>
  );
}
