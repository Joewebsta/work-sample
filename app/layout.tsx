import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flexpa Work Sample",
  description: "Flexpa Work Sample",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        type="module"
        strategy="lazyOnload"
        src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/dotWave.js"
      />
      <body className={`${inter.className} bg-[#fafafa] py-5`}>{children}</body>
    </html>
  );
}
