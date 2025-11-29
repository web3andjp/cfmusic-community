import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { Providers } from "./providers";

export const metadata = {
  title: "Campfire Community Hub",
  description: "Feature suggestions + community voting",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Providers>
          <SiteHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}