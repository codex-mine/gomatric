import type { Metadata } from "next";
import { sora, plusJakartaSans } from "@/lib/fonts";
import { AppProviders } from "@/providers/app-providers";
import { CookieBanner } from "@/components/ui/cookie-banner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "GoMatric — Premium Travel Solutions",
    template: "%s | GoMatric",
  },
  description:
    "Visa assistance, tour packages, and complete travel solutions. Discover destinations, plan trips, and travel with confidence.",
  keywords: [
    "travel agency",
    "visa services",
    "tour packages",
    "travel booking",
    "GoMatric",
    "travel solutions",
  ],
  authors: [{ name: "GoMatric" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "GoMatric",
    title: "GoMatric — Premium Travel Solutions",
    description:
      "Visa assistance, tour packages, and complete travel solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoMatric — Premium Travel Solutions",
    description:
      "Visa assistance, tour packages, and complete travel solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppProviders>
          {children}
          <CookieBanner />
        </AppProviders>
      </body>
    </html>
  );
}
