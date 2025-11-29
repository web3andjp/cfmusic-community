import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Campfire Community Hub",
  description: "Suggest and vote on features for Campfire Music",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0A0A0A] text-white">
        <Providers>
          <SiteHeader />
          <main className="max-w-3xl mx-auto p-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}