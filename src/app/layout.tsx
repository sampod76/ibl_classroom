"use client";
// import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Providers from "@/lib/Providers";
import { Toaster } from "sonner";
// const inter = Inter({ subsets: ["latin"] });
// const _geistMono = Geist_Mono({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={`font-sans antialiased`}>
          {children}
          <Analytics />
          <Toaster richColors position="top-center" />
        </body>
      </html>
    </Providers>
  );
}
