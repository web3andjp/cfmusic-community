"use client";

import { Providers } from "./providers";
import { FeatureBoard } from "@/components/feature-board";

export default function HomePage() {
  return (
    <Providers>
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-[220px,1fr]">
          <aside className="p-4 rounded-xl border border-white/10 bg-white/5 h-fit sticky top-8">
            <h2 className="text-sm font-semibold mb-3 text-white">Navigate</h2>
            <nav className="flex flex-col gap-2 text-sm text-white/80">
              <a className="hover:text-white transition" href="/#hero">
                ◆ Overview
              </a>
              <a className="hover:text-white transition" href="/#platform-roadmap">
                ◆ Platform roadmap
              </a>
              <a className="hover:text-white transition" href="/#dashboard">
                ◆ Feature list
              </a>
              <a className="hover:text-white transition" href="/feature-request">
                ◆ Submit a feature request
              </a>
            </nav>
          </aside>
          <FeatureBoard />
        </div>
      </main>
    </Providers>
  );
}
