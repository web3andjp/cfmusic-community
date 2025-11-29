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

const roadmap: RoadmapItem[] = [
  {
    title: "Mobile-first listening",
    description: "Stream the catalog with lightweight offline caching and low-data modes.",
    status: "building",
    eta: "March",
  },
  {
    title: "Donor-friendly playback links",
    description: "Shareable listening links that surface project impact and donation calls-to-action.",
    status: "planned",
    eta: "Q2",
  },
  {
    title: "Community playlists",
    description: "Curated playlists for events, regions, and causes with simple follow and save.",
    status: "planned",
  },
  {
    title: "Accessible audio player",
    description: "Keyboard-first controls, captions/lyrics, and high-contrast theme baked into the player.",
    status: "shipped",
    eta: "Live",
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
      <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-amber-800/40 via-amber-700/30 to-amber-500/25 p-6 shadow-xl">
        <p className="text-sm uppercase tracking-[0.2em] text-white/70 mb-2">
          Community roadmap
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-white mb-3">
          Vote on what ships next. Shape the future of this non-profit music platform.
        </h1>
        <p className="text-white/80 max-w-3xl">
          Drop ideas, upvote priorities, and follow along as we move work across the product roadmap.
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

        {features.map((f) => (
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
                disabled={!isLoggedIn}
                className="bg-amber-600"
              >
                Vote
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Roadmap */}
      <div className="border border-white/10 rounded-xl bg-white/5 p-5 shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Product Roadmap</p>
            <h2 className="text-xl font-semibold mt-1">Follow the build from idea to shipped</h2>
          </div>
          <span className="text-sm text-white/70">Updated weekly</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {roadmap.map((item) => (
            <div
              key={item.title}
              className="border border-white/10 rounded-lg bg-black/30 p-4 flex flex-col gap-2 hover:border-amber-400/40 transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{item.title}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full uppercase tracking-wide ${
                    item.status === "shipped"
                      ? "bg-emerald-500/20 text-emerald-200 border border-emerald-500/40"
                      : item.status === "building"
                      ? "bg-amber-500/20 text-amber-100 border border-amber-400/50"
                      : "bg-white/10 text-white/70 border border-white/20"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-white/70 text-sm">{item.description}</p>
              {item.eta && <p className="text-xs text-white/50">ETA: {item.eta}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
