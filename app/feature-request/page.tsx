"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Providers } from "../providers";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Feature = {
  id: string;
  title: string;
  description: string;
  votes: number;
};

export default function FeatureRequestPage() {
  return (
    <Providers>
      <FeatureRequestForm />
    </Providers>
  );
}

function FeatureRequestForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const [guestId, setGuestId] = useState<string | null>(null);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const g = localStorage.getItem("campfire-guest");
    if (g) {
      const parsed = JSON.parse(g);
      setGuestId(parsed.guestId);
    }
  }, []);

  const isLoggedIn = !!session?.user?.email || !!guestId;

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
    if (!title.trim() || submitting) return;
    setSubmitting(true);

    const res = await fetch("/api/features", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        guestId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setSubmitting(false);

    if (res.ok) {
      setTitle("");
      setDescription("");
      await loadFeatures();
      router.push("/");
    } else {
      alert("You must sign in or use guest mode.");
    }
  }

  async function vote(featureId: string) {
    if (!isLoggedIn) return;
    const res = await fetch("/api/features/vote", {
      method: "POST",
      body: JSON.stringify({
        featureId,
        guestId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      await loadFeatures();
    } else {
      alert("You must sign in or use guest mode.");
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-6">
      <div className="flex flex-col gap-4" id="dashboard">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Feature Requests</p>
            <h2 className="text-xl font-semibold mt-1">
              Help us improve Campfire by suggesting features and enhancements.
            </h2>
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

      <div>
        <h1 className="text-3xl font-semibold text-white mt-2">Suggest a Feature</h1>
        <p className="text-white/80 mt-2">
          Help us improve Campfire by proposing new features or enhancements. Your ideas guide the
          roadmap and shape the platform.
        </p>
      </div>

      {!isLoggedIn && (
        <p className="text-red-400">
          You must sign in or use “Continue as Guest” to submit ideas.
        </p>
      )}

      <div className="p-5 border border-white/10 rounded-xl bg-white/5 shadow-lg">
        <div className="space-y-3">
          <Input
            placeholder="Feature title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={!isLoggedIn || submitting}
            className="text-black"
          />

          <Textarea
            placeholder="Feature description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={!isLoggedIn || submitting}
            className="text-black"
          />

          <div className="flex items-center gap-3">
            <Button
              onClick={submitFeature}
              disabled={!isLoggedIn || submitting}
              className="bg-amber-600"
            >
              {submitting ? "Submitting..." : "Submit Feature"}
            </Button>
            <Button
              onClick={() => router.push("/#dashboard")}
              className="bg-transparent border border-white/40 text-white hover:bg-white/10"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
