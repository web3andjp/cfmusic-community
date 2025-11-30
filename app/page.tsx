"use client";

import { Providers } from "./providers";
import { FeatureBoard } from "@/components/feature-board";

export default function HomePage() {
  return (
    <Providers>
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gradient-to-r from-amber-900/80 via-amber-700/60 to-amber-600/50">
        <main className="max-w-6xl mx-auto px-4 pt-6 pb-12 md:pt-8">
          <FeatureBoard />
        </main>
      </div>
    </Providers>
  );
}
