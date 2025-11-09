import type { Metadata } from "next";
import "./globals.css";
import WalletProvider from "@/components/WalletProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Sui Wallet Cleaner",
  description: "Review and manage unwanted NFTs in your Sui wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-deep-ocean min-h-screen">
        <WalletProvider>
          {children}
          <Toaster position="bottom-right" theme="dark" />
        </WalletProvider>
      </body>
    </html>
  );
}
