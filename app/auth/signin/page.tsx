"use client";

import { Providers } from "./providers";
import { FeatureBoard } from "@/components/feature-board";

export default function HomePage() {
  return (
    <Providers>
      <main className="max-w-5xl mx-auto px-4 py-12">
        <FeatureBoard />
      </main>
    </Providers>
  );
}