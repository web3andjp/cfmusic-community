"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Feature = {
  id: string;
  title: string;
  description: string;
  votes: number;
};

type RoadmapItem = {
  title: string;
  description: string;
  status: "planned" | "building" | "shipped";
  eta?: string;
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
    title: "🚀 Beta Platform Launch",
    description:
      "Core listening, adaptive streaming, lightweight offline caching, early discovery, and feedback loops.",
    status: "building",
    eta: "March",
  },
  {
    title: "🎶 Community Playlists",
    description:
      "Curated around events, regions, moods, and causes with follow/save and playlist metadata.",
    status: "planned",
    eta: "Q2",
  },
  {
    title: "Upcoming Items",
    description: "More roadmap items coming soon as we grow the platform with community input.",
    status: "planned",
    eta: "Rolling",
  },
];

export function FeatureBoard() {
  const { data: session } = useSession();
  const router = useRouter();

  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Guest Info
  const [guestId, setGuestId] = useState<string | null>(null);

  useEffect(() => {
    const g = localStorage.getItem("campfire-guest");
    if (g) {
      const parsed = JSON.parse(g);
      setGuestId(parsed.guestId);
    }
  }, []);

  // Load features from server
  async function loadFeatures() {
    setLoading(true);
    const res = await fetch("/api/features");
    const data = await res.json();
    setFeatures(data);
    setLoading(false);
  }

  useEffect(() => {
    loadFeatures();
  }, []);

  async function submitFeature() {
    if (!title.trim()) return;

    const res = await fetch("/api/features", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        guestId, // works for guest OR auth
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setTitle("");
      setDescription("");
      await loadFeatures();
    } else {
      alert("You must sign in or use guest mode.");
    }
  }

  async function vote(featureId: string) {
    const res = await fetch("/api/features/vote", {
      method: "POST",
      body: JSON.stringify({
        featureId,
        guestId, // attaches guest id when no session
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      await loadFeatures();
      // Drop the user back on the dashboard view with fresh data.
      router.push("/#dashboard");
    } else {
      alert("You must sign in or use guest mode.");
    }
  }

  const isLoggedIn = !!session?.user?.email || !!guestId;

  return (
    <div className="flex flex-col gap-8 mt-6">
      {/* Full-width Platform Roadmap banner */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gradient-to-r from-amber-900/80 via-amber-700/70 to-amber-600/60 border-y border-white/10 shadow-2xl">
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-10 space-y-6">
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
                      className={`w-20 h-20 rounded-full border-2 flex items-center justify-center text-sm font-semibold uppercase tracking-wide ${colors.ring}`}
                    >
                      {item.status}
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-px flex-1 min-h-[60px] ${colors.stem}`} />
                      <div className={`w-3 h-3 rounded-full ${colors.dot}`} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg text-white">{item.title}</h3>
                      <p className={`text-sm ${colors.label}`}>{item.description}</p>
                      {item.eta && (
                        <p className="text-xs text-white/60">
                          <span className="font-semibold">ETA:</span> {item.eta}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-amber-800/40 via-amber-700/30 to-amber-500/25 p-6 shadow-xl">
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
      </section>

      {/* Submit Feature */}
      <div className="p-5 border border-white/10 rounded-xl bg-white/5 shadow-lg" id="dashboard">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
          <h2 className="text-xl font-semibold">Suggest a Feature</h2>
          <span className="text-xs uppercase tracking-[0.2em] text-white/60 bg-white/10 px-3 py-1 rounded-full">
            Dashboard
          </span>
        </div>

        {!isLoggedIn && (
          <p className="text-red-400 mb-3">
            You must sign in or use “Continue as Guest” to submit ideas.
          </p>
        )}

        <Input
          placeholder="Feature title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={!isLoggedIn}
          className="mb-3 text-black"
        />

        <Textarea
          placeholder="Feature description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={!isLoggedIn}
          className="mb-3 text-black"
        />

        <Button onClick={submitFeature} disabled={!isLoggedIn} className="bg-amber-600">
          Submit Feature
        </Button>
      </div>

      {/* Feature List */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Feature Requests</p>
            <h2 className="text-xl font-semibold mt-1">Your votes decide what we build next</h2>
          </div>
          <span className="text-sm text-white/70">
            {features.length} ideas • {features.reduce((sum, f) => sum + f.votes, 0)} total votes
          </span>
        </div>

        {loading && <p className="text-white/60">Loading...</p>}

        {features.map((f) => {
          const disabled = !isLoggedIn;
          return (
            <div
              key={f.id}
              className="p-4 border border-white/10 rounded-lg bg-white/5 flex justify-between hover:border-amber-400/40 transition"
            >
              <div>
                <h3 className="font-bold text-lg">{f.title}</h3>
                <p className="text-white/70 text-sm mt-1">{f.description}</p>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-lg font-bold mb-1">{f.votes}</span>

                <Button
                  size="sm"
                  onClick={() => vote(f.id)}
                  disabled={disabled}
                  className="bg-amber-600"
                  title={disabled ? "You must be logged in to vote." : "Vote for this feature"}
                >
                  Vote
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
