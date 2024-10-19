import type { Metadata } from "next";
import localFont from "next/font/local";
import '@coinbase/onchainkit/styles.css';
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { OnchainkitProviders } from '@/Providers/OnchainkitProviders';
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BlockHolder",
  description: "Saving & Investing crypto assets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <OnchainkitProviders>
            {children}
          </OnchainkitProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
