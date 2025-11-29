"use client";

import { useSession } from "next-auth/react";
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

export function FeatureBoard() {
  const { data: session } = useSession();

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
    } else {
      alert("You must sign in or use guest mode.");
    }
  }

  const isLoggedIn = !!session?.user?.email || !!guestId;

  return (
    <div className="flex flex-col gap-8 mt-6">
      {/* Submit Feature */}
      <div className="p-4 border border-white/10 rounded-lg bg-white/5">
        <h2 className="text-xl font-semibold mb-4">Suggest a Feature</h2>

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

        <Button
          onClick={submitFeature}
          disabled={!isLoggedIn}
          className="bg-amber-600"
        >
          Submit Feature
        </Button>
      </div>

      {/* Feature List */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Feature Requests</h2>

        {loading && <p className="text-white/60">Loading...</p>}

        {features.map((f) => (
          <div
            key={f.id}
            className="p-4 border border-white/10 rounded-lg bg-white/5 flex justify-between"
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
    </div>
  );
}