import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TripWripp - Your Ultimate Travel Companion",
  description: "Discover amazing destinations, book exciting packages, and create unforgettable memories with TripWripp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
