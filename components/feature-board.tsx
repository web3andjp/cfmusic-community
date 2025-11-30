"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Clock3, Layers, Sparkles } from "lucide-react";

type RoadmapItem = {
  title: string;
  description: string;
  status: "planned" | "building" | "shipped";
  eta?: string;
  icon: ReactNode;
};

const roadmapColors: Record<
  RoadmapItem["status"],
  { ring: string; stem: string; dot: string; label: string }
> = {
  planned: {
    ring: "border-amber-200 bg-black/30",
    stem: "bg-amber-200/60",
    dot: "bg-amber-200",
    label: "text-white/80",
  },
  building: {
    ring: "border-amber-300 bg-amber-500/20",
    stem: "bg-amber-300/80",
    dot: "bg-amber-300",
    label: "text-amber-100",
  },
  shipped: {
    ring: "border-emerald-200 bg-emerald-500/15",
    stem: "bg-emerald-200/70",
    dot: "bg-emerald-200",
    label: "text-emerald-100",
  },
};

const roadmap: RoadmapItem[] = [
  {
    title: "Beta Platform Launch",
    description:
      "Foundational listening launch with adaptive streaming, lightweight offline caching, early discovery, and feedback loops for listeners and artists.",
    status: "building",
    eta: "March",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    title: "Community Playlists",
    description:
      "Curated for events, regions, moods, and causes with follow/save, playlist metadata (theme, curator, region), and simple discovery.",
    status: "planned",
    eta: "Q2",
    icon: <Layers className="w-6 h-6" />,
  },
  {
    title: "Upcoming Items",
    description: "More roadmap items coming soon as we grow the platform with community input.",
    status: "planned",
    eta: "Rolling",
    icon: <Clock3 className="w-6 h-6" />,
  },
];

export function FeatureBoard() {
  return (
    <div className="flex flex-col gap-8 mt-6" id="hero">
      {/* Full-width Platform Roadmap banner */}
      <section
        id="platform-roadmap"
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gradient-to-r from-amber-900/80 via-amber-700/70 to-amber-600/60 border-y border-white/10 shadow-2xl"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-10 space-y-6">
          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl font-semibold text-white">
              The Future of Music Starts Here
            </h3>
            <p className="text-lg text-white/90 leading-relaxed">
              Campfire is redefining streaming as a community-powered public good — a place where
              artists thrive, fans belong, and everyone participates in a fairer music ecosystem.
            </p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">Platform Roadmap</p>
              <h2 className="text-3xl font-semibold mt-1 leading-tight text-white">
                Where Campfire Music is heading next
              </h2>
              <p className="text-white/80 mt-2 max-w-3xl">
                A transparent look at the core initiatives shaping our nonprofit, artist-first streaming
                platform. Follow progress, vote on priorities, and watch features move from planned →
                building → shipped.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-stretch gap-8 md:gap-4 relative">
              {roadmap.map((item) => {
                const colors = roadmapColors[item.status];
                return (
                  <div
                    key={item.title}
                    className="flex-1 flex flex-col items-center text-center gap-3 pt-2"
                  >
                    <div
                      className={`w-20 h-20 rounded-full border-2 flex items-center justify-center text-sm font-semibold uppercase tracking-wide relative ${colors.ring}`}
                    >
                      {item.status}
                    </div>
                    {item.eta && (
                      <p className="text-xs text-white/70 font-semibold">ETA: {item.eta}</p>
                    )}
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-px flex-1 min-h-[64px] ${colors.stem}`} />
                      <div className={`w-3 h-3 rounded-full ${colors.dot}`} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg text-white flex items-center justify-center gap-2">
                        <span className="inline-flex items-center justify-center rounded-md bg-white/10 border border-white/15 px-2 py-1 text-sm">
                          {item.icon}
                        </span>
                        <span>{item.title}</span>
                      </h3>
                      <p className={`text-sm ${colors.label}`}>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center">
        <a
          href="/auth/signin"
          className="inline-flex items-center justify-center rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-amber-500"
        >
          Register / Sign In
        </a>
      </div>

      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen rounded-2xl border border-white/10 bg-gradient-to-r from-amber-800/40 via-amber-700/30 to-amber-500/25 p-6 shadow-xl">
        <p className="text-sm uppercase tracking-[0.2em] text-white/70 mb-2">
          Community roadmap
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-white mb-3">
          Vote on what ships next. Shape the future of this non-profit music platform.
        </h1>
        <p className="text-white/80 max-w-3xl">
          Drop ideas, upvote priorities, and follow along as we move work across the platform roadmap.
          Every vote keeps the platform aligned with listeners and artists in the mission.
        </p>
        <div className="mt-4 flex">
          <a
            href="/auth/signin"
            className="inline-flex items-center justify-center rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-amber-500"
          >
            Register / Sign In
          </a>
        </div>
      </section>

    </div>
  );
}
