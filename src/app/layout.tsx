import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hamza School | Learning Without Limits — Addis Ababa, Ethiopia",
  description:
    "Hamza School is a warm, family-like school in Addis Ababa serving Grades 1–8. Caring teachers, a real biology lab, and a love for learning that lasts a lifetime.",
  keywords: [
    "Hamza School",
    "school Addis Ababa",
    "Ethiopia school",
    "primary school",
    "junior secondary",
    "Grades 1 to 8",
    "private school Ethiopia",
  ],
  authors: [{ name: "Hamza School" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Hamza School | Inspiring Excellence, Building Tomorrow's Leaders",
    description:
      "A premier institution committed to academic excellence and character development.",
    siteName: "Hamza School",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza School",
    description:
      "Inspiring Excellence, Building Tomorrow's Leaders.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <SonnerToaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
