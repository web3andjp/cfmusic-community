import "./globals.css";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Campfire Community Hub",
  description: "Help shape the future of CFMusic",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}