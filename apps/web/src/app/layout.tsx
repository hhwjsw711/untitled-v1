import "@v1/ui/globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Provider as AnalyticsProvider } from "@v1/analytics/client";
import { cn } from "@v1/ui/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ConvexClientProvider } from "./convex-client-provider";

const DepartureMono = localFont({
  src: "../fonts/DepartureMono-Regular.woff2",
  variable: "--font-departure-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://untitled.uno"),
  title: "Untitled - Trust in Every Trade",
  description:
    "Untitled is a platform for Data Trading, IP Protection, and Future Security.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${DepartureMono.variable} ${GeistSans.variable} ${GeistMono.variable}`,
          "bg-[#0C0C0C] antialiased dark overflow-x-hidden",
        )}
      >
        <ConvexClientProvider>
          <Header />
          <main className="container mx-auto px-4 overflow-hidden md:overflow-visible">
            {children}
          </main>
          <Footer />
        </ConvexClientProvider>

        <AnalyticsProvider />
      </body>
    </html>
  );
}
