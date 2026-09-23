import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/shared/Header";
import { Providers } from "@/app/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Storefront",
  description: "Browse products and manage a shopping cart.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full bg-[#faf8f5] font-sans text-[#1a1a1a]">
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
