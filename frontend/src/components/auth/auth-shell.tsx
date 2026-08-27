"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface AuthShellProps {
  children: ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-10 relative overflow-hidden bg-[#F8FAFC] dark:bg-[#080D1A] transition-colors duration-300">
      
      {/* ======================================================== */}
      {/* BACKGROUND SVG GRAPHICS (Dot Matrix + Trajectory Curves) */}
      {/* ======================================================== */}
      
      {/* 1. Dot Matrix Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="auth-grid-dots"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" className="fill-slate-400 dark:fill-slate-600" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#auth-grid-dots)" />
        </svg>
      </div>

      {/* 2. Serpentine Red & Slate Trajectory Curves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          {/* Subtle Red Arc */}
          <path
            d="M-100 450 C 300 650, 600 250, 1100 480 C 1300 570, 1500 400, 1600 450"
            stroke="#ED1B26"
            strokeWidth="1.5"
            strokeOpacity="0.4"
            fill="none"
          />
          {/* Dashed Flight Trajectory */}
          <path
            d="M-50 200 C 400 100, 700 700, 1200 350 C 1400 200, 1550 300, 1600 280"
            stroke="#64748B"
            strokeWidth="1.25"
            strokeDasharray="6 6"
            strokeOpacity="0.25"
            fill="none"
          />
          {/* Ambient Glow Orbs */}
          <circle cx="200" cy="300" r="280" fill="rgba(6, 20, 116, 0.03)" className="dark:fill-blue-600/5" />
          <circle cx="1200" cy="650" r="320" fill="rgba(237, 27, 38, 0.03)" className="dark:fill-red-600/5" />
        </svg>
      </div>

      {/* ======================================================== */}
      {/* TOP HEADER CONTROLS (Back to Home & Dark Mode Toggle)    */}
      {/* ======================================================== */}
      <header className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-20 pointer-events-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#061474] dark:hover:text-white transition-colors bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-md border border-slate-200/80 dark:border-slate-800 shadow-xs group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span>Back to GoMatric</span>
        </Link>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-1 rounded-md border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <ThemeToggle />
        </div>
      </header>

      {/* ======================================================== */}
      {/* CENTERED AUTH CARD CONTAINER                             */}
      {/* ======================================================== */}
      <div className="relative z-10 w-full max-w-[440px] my-14 sm:my-16">
        {children}
      </div>

    </main>
  );
}
