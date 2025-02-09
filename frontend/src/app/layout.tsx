import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GlobalProviders } from "./providers";
import "./globals.css";
import { GlobalHeader } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Address Holding",
  description: "Apartment listing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalProviders>
          <GlobalHeader />
          {children}
        </GlobalProviders>
      </body>
    </html>
  );
}
