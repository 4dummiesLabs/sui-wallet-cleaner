import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WalletProvider from "@/components/WalletProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Sui Wallet Cleaner",
  description: "Secure wallet management for the Sui ecosystem",
  keywords: ["Sui", "wallet", "NFT", "crypto", "blockchain", "cleaner"],
  authors: [{ name: "Sui Wallet Cleaner" }],
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} min-h-screen bg-background text-foreground antialiased`}>
        <WalletProvider>
          <ErrorBoundary>
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-background-secondary">
              {children}
            </div>
          </ErrorBoundary>
        </WalletProvider>
      </body>
    </html>
  );
}
