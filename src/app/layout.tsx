import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Amiri } from "next/font/google";
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

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["latin", "arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Hamza School — Guiding Hearts. Growing Minds.",
  description:
    "An institution where knowledge meets character — nurturing faith, excellence, and a lifelong love of learning in every child. Addis Ababa, Ethiopia.",
  keywords: [
    "Hamza School",
    "Islamic school Addis Ababa",
    "Ethiopia school",
    "primary school",
    "junior secondary",
    "faith-based school",
  ],
  authors: [{ name: "Hamza School" }],
  icons: {
    icon: "/hamza-logo.png",
  },
  openGraph: {
    title: "Hamza School — Guiding Hearts. Growing Minds.",
    description:
      "An institution where knowledge meets character — nurturing faith, excellence, and a lifelong love of learning.",
    siteName: "Hamza School",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza School",
    description: "Guiding Hearts. Growing Minds.",
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
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${amiri.variable} antialiased bg-background text-foreground`}
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
