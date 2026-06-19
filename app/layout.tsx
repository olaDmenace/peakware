import type { Metadata, Viewport } from "next";
import { Sora, Inter, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./lineicons.css";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, websiteSchema } from "@/content/seo";

const SITE_TITLE = "Peakware Consulting — Technology that earns its place";
const SITE_DESCRIPTION =
  "Peakware Consulting designs, builds and secures cloud, data, AI and software systems for UK organisations. Senior expertise, straight answers, lasting results.";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://peakwareconsulting.co.uk"),
  title: {
    default: SITE_TITLE,
    template: "%s — Peakware Consulting",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Peakware Consulting",
  alternates: { canonical: "/" },
  keywords: [
    "technology consultancy UK",
    "cloud consultancy",
    "data engineering",
    "agentic AI",
    "machine learning",
    "custom software development",
    "cybersecurity",
    "analytics",
    "IT training",
    "Peakware",
  ],
  authors: [{ name: "Peakware Consulting" }],
  creator: "Peakware Consulting",
  publisher: "Peakware Consulting",
  formatDetection: { email: false, telephone: false, address: false },
  openGraph: {
    type: "website",
    siteName: "Peakware Consulting",
    locale: "en_GB",
    url: "https://peakwareconsulting.co.uk",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0d14",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${sora.variable} ${inter.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh flex flex-col bg-ink text-cream">
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <Providers>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
