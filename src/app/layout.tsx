import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Layout from "@/components/Layout";
import ErrorBoundary from '@/components/ui/ErrorBoundary';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TripWripp - Your Ultimate Travel Companion",
  description: "Discover amazing destinations, book exciting packages, and create unforgettable memories with TripWripp.",
  keywords: ["travel", "trekking", "Himalaya", "Nepal", "adventure", "tour packages", "TripWripp"],
  authors: [{ name: "TripWripp Team" }],
  openGraph: {
    title: 'TripWripp – Curated Adventure & Trek Experiences',
    description: 'Authentic Himalayan trekking, curated packages, and personalized travel planning with TripWripp.',
    url: 'https://www.tripwripp.com',
    siteName: 'TripWripp',
    images: [
      { url: 'https://www.tripwripp.com/og-image.jpg', width: 1200, height: 630, alt: 'TripWripp Adventure Travel' }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TripWripp – Adventure & Trekking',
    description: 'Plan authentic Himalayan trips & curated adventure routes.',
    images: ['https://www.tripwripp.com/og-image.jpg']
  },
  metadataBase: new URL('https://www.tripwripp.com')
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <Navigation />
          <Layout>
            {children}
          </Layout>
        </ErrorBoundary>
      </body>
    </html>
  );
}
