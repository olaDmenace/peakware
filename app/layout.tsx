import type { Metadata } from "next";
import { Sora, Inter, Geist_Mono } from "next/font/google";
import "./lineicons.css";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

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
    default: "Peakware Consulting — Technology that earns its place",
    template: "%s — Peakware Consulting",
  },
  description:
    "Peakware Consulting designs, builds and secures cloud, data, AI and software systems for UK organisations. Senior expertise, straight answers, lasting results.",
  openGraph: {
    siteName: "Peakware Consulting",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${sora.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream">
        <Providers>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
