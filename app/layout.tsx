import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { Providers } from "@/components/providers";

export const metadata = {
  title: "Campfire Community Hub",
  description: "Community-driven roadmap for CFMusic.org",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
          <SiteHeader />

          <main className="flex-1">
            <Providers>
              <div className="mx-auto w-full max-w-5xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
                {children}
              </div>
            </Providers>
          </main>

          <footer className="border-t border-slate-800/60 bg-slate-950/80">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 text-xs text-slate-400 sm:px-6 lg:px-8">
              <span>© {new Date().getFullYear()} Campfire Music</span>
              <span className="text-slate-500">
                Built by the community ✨
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}