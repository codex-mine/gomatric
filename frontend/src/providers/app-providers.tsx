"use client";

import type { ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <SmoothScrollProvider>
        {children}
      </SmoothScrollProvider>
    </QueryProvider>
  );
}
