"use client";

import type { ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { AuthProvider } from "./auth-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
