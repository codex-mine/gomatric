"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./button";

export function CookieBanner() {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem("gomatric_cookie_consent");
    if (!consent) {
      setAccepted(false);
    }
  }, []);

  if (accepted) return null;

  const handleAccept = (choice: "all" | "necessary") => {
    localStorage.setItem("gomatric_cookie_consent", choice);
    setAccepted(true);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm bg-brand-primary-dark text-white p-5 rounded-[14px] shadow-2xl border border-white/10 backdrop-blur-md">
      <p className="text-sm text-white/90 mb-3 leading-relaxed">
        We use cookies to enhance your browsing experience and analyze our traffic.
      </p>
      <div className="flex items-center justify-between text-xs text-white/60 mb-4">
        <Link href="/cookie-policy" className="hover:underline text-white/80">
          Cookie Policy
        </Link>
        <Link href="/privacy-policy" className="hover:underline text-white/80">
          Privacy Policy
        </Link>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="accent"
          onClick={() => handleAccept("all")}
          className="flex-1 text-xs h-9"
        >
          Accept All
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleAccept("necessary")}
          className="flex-1 text-xs h-9 border-white/20 text-white hover:bg-white/10"
        >
          Necessary Only
        </Button>
      </div>
    </div>
  );
}
