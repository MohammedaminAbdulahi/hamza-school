import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Amiri } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["latin", "arabic"],
  weight: ["400", "700"],
  display: "swap",
});

const SITE_URL = "https://hamzaschool.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hamza School — Guiding Hearts. Growing Minds. | Addis Ababa",
    template: "%s | Hamza School",
  },
  description:
    "Hamza School is a warm, faith-based primary and junior secondary school in Addis Ababa, Ethiopia. Serving Grades 1–8 with caring teachers, a biology lab, and Islamic values. Enroll now for 2025/2026.",
  keywords: [
    "Hamza School",
    "Islamic school Addis Ababa",
    "school Ethiopia",
    "primary school Addis Ababa",
    "junior secondary school",
    "Grades 1 to 8",
    "faith-based school",
    "private school Ethiopia",
    "Muslim school Addis Ababa",
    "Hamza School admissions",
  ],
  authors: [{ name: "Hamza School" }],
  creator: "Hamza School",
  publisher: "Hamza School",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Hamza School",
    title: "Hamza School — Guiding Hearts. Growing Minds.",
    description:
      "A warm, faith-based school in Addis Ababa serving Grades 1–8. Caring teachers, a real biology lab, and a love for learning rooted in Islamic values.",
    images: [
      {
        url: "/hero-desk.jpeg",
        width: 1264,
        height: 842,
        alt: "Hamza School — study desk with books on Knowledge, Faith, Character, and Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza School — Guiding Hearts. Growing Minds.",
    description:
      "A warm, faith-based school in Addis Ababa serving Grades 1–8. Enroll now for 2025/2026.",
    images: ["/hero-desk.jpeg"],
  },
  icons: {
    icon: [
      { url: "/hamza-logo.png", type: "image/png" },
    ],
    apple: "/hamza-logo.png",
  },
  manifest: "/manifest.json",
  category: "education",
};

export const viewport = {
  themeColor: "#1F3D2F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured data for Google rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "School",
              name: "Hamza School",
              description:
                "A warm, faith-based primary and junior secondary school in Addis Ababa, Ethiopia serving Grades 1–8.",
              url: SITE_URL,
              logo: `${SITE_URL}/hamza-logo.png`,
              image: `${SITE_URL}/hero-desk.jpeg`,
              telephone: "+251912345678",
              email: "hello@hamzaschool.et",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Bole Road",
                addressLocality: "Addis Ababa",
                addressCountry: "ET",
              },
              foundingDate: "2015",
              slogan: "Guiding Hearts. Growing Minds.",
            }),
          }}
        />
      </head>
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
