import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
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

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Hamza School | Nurturing Faith, Inspiring Futures — Addis Ababa",
  description:
    "Hamza School is a warm, faith-based school in Addis Ababa serving Grades 1–8. Caring teachers, a real biology lab, and a love for learning rooted in values.",
  keywords: [
    "Hamza School",
    "Islamic school Addis Ababa",
    "Ethiopia school",
    "primary school",
    "junior secondary",
    "Grades 1 to 8",
    "faith-based school",
  ],
  authors: [{ name: "Hamza School" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Hamza School | Nurturing Faith, Inspiring Futures",
    description:
      "A warm, faith-based school in Addis Ababa serving Grades 1–8.",
    siteName: "Hamza School",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza School",
    description: "Nurturing Faith, Inspiring Futures.",
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
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-background text-foreground`}
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
