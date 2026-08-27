import type { Metadata } from "next";
import { sora, plusJakartaSans } from "@/lib/fonts";
import { AppProviders } from "@/providers/app-providers";
import { CookieBanner } from "@/components/ui/cookie-banner";
import { BackToTop } from "@/components/ui/back-to-top";
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
  icons: {
    icon: [
      { url: "/fav.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/fav.png",
    apple: "/fav.png",
  },
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
      suppressHydrationWarning
      className={`${sora.variable} ${plusJakartaSans.variable} antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('gomatric-theme') || 'light';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col transition-colors duration-300">
        <AppProviders>
          {children}
          <CookieBanner />
          <BackToTop />
        </AppProviders>
      </body>
    </html>
  );
}
