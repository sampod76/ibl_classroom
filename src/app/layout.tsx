import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Providers from "@/lib/Providers";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>
          {children}
          {/* <Analytics /> */}
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
