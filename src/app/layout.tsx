import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Providers from "@/lib/Providers";
import { Toaster } from "sonner";
import { getSession } from "@/lib/session";
import SessionProvider from "@/lib/session-provider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="grammarly-disable" content="true" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Providers>
          <SessionProvider initialSession={session}>{children}</SessionProvider>
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
