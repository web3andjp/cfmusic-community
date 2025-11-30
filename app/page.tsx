"use client";

import { Providers } from "./providers";
import { FeatureBoard } from "@/components/feature-board";

export default function HomePage() {
  return (
    <Providers>
      <div className="bg-gradient-to-r from-amber-900/50 via-amber-700/40 to-amber-600/35">
        <main className="max-w-6xl mx-auto px-4 pt-6 pb-12 md:pt-8">
          <FeatureBoard />
        </main>
      </div>
    </Providers>
  );
}
