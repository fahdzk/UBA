import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UBA — Union of Brand Ambassadors",
  description:
    "The professional union for brand ambassadors. Find jobs, rate agencies, file violations, and protect your rights.",
  keywords: [
    "brand ambassador",
    "union",
    "UBA",
    "agency ratings",
    "job board",
    "worker rights",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="min-h-screen bg-surface-raised antialiased">
        {children}
      </body>
    </html>
  );
}
