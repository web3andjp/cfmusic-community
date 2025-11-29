"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Feature = {
  id: number;
  title: string;
  description: string | null;
  createdAt: string;
  createdBy?: {
    email?: string | null;
    name?: string | null;
  } | null;
  votes: { userId: string; featureId: number }[];
};

export function FeatureBoard() {
  const { data: session } = useSession();
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [votingOn, setVotingOn] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const isAuthed = !!session?.user;

  async function loadFeatures() {
    try {
      setLoading(true);
      const res = await fetch("/api/features", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load features");
      const data = await res.json();
      setFeatures(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFeatures();
  }, []);

  async function handleSubmitFeature() {
    if (!title.trim()) return;
    try {
      setSubmitting(true);
      const res = await fetch("/api/features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error("Failed to create feature");
      setTitle("");
      setDescription("");
      await loadFeatures();
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleVote(featureId: number) {
    if (!isAuthed) return;
    try {
      setVotingOn(featureId);
      const res = await fetch("/api/features/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featureId }),
      });
      if (!res.ok) throw new Error("Failed to vote");
      await loadFeatures();
    } catch (e) {
      console.error(e);
    } finally {
      setVotingOn(null);
    }
  }

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold tracking-tight text-slate-50 sm:text-base">
            Feature ideas from the community
          </h2>
          <p className="text-xs text-slate-400">
            Upvote ideas you’d use personally, or suggest new improvements.
          </p>
        </div>

        {/* Submit */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-amber-500 text-xs font-medium text-slate-950 shadow-sm shadow-amber-500/40 hover:bg-amber-400"
              disabled={!isAuthed}
            >
              {isAuthed ? "Submit a feature idea" : "Sign in to submit ideas"}
            </Button>
          </DialogTrigger>
          <DialogContent className="border-slate-800 bg-slate-950 text-slate-50">
            <DialogHeader>
              <DialogTitle>Propose a new feature</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {!isAuthed && (
                <p className="rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
                  You must sign in before submitting ideas.
                </p>
              )}

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-200">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Fair revenue split dashboard"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-200">Why does this matter?</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe how this improves fairness or user experience"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  size="sm"
                  onClick={handleSubmitFeature}
                  disabled={!isAuthed || submitting || !title.trim()}
                  className="bg-amber-500 text-xs text-slate-950 hover:bg-amber-400"
                >
                  {submitting ? "Submitting..." : "Submit feature"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Feature List */}
      <div className="space-y-3">
        {loading ? (
          <p className="text-xs text-slate-500">Loading ideas…</p>
        ) : features.length === 0 ? (
          <Card className="border-slate-800 bg-slate-950/70">
            <CardContent className="py-6 text-sm text-slate-400">
              No ideas yet — be the first to suggest something!
            </CardContent>
          </Card>
        ) : (
          features.map((feature) => {
            const voteCount = feature.votes?.length ?? 0;

            return (
              <Card
                key={feature.id}
                className="border-slate-800 bg-slate-950/70 hover:border-amber-500/40"
              >
                <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-50">
                      {feature.title}
                    </h3>
                    {feature.description && (
                      <p className="text-xs text-slate-400">{feature.description}</p>
                    )}
                  </div>

                  <div className="flex flex-col items-end">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={!isAuthed || votingOn === feature.id}
                      onClick={() => handleVote(feature.id)}
                      className="border-slate-700 bg-slate-900 text-[0.7rem] hover:border-amber-500 hover:bg-slate-800"
                    >
                      {votingOn === feature.id ? "Voting..." : "Upvote"}
                    </Button>
                    <span className="text-[0.7rem] text-slate-500">
                      {voteCount} vote{voteCount === 1 ? "" : "s"}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="flex items-center justify-between pt-0 text-[0.7rem] text-slate-500">
                  <Badge variant="outline">Community idea</Badge>
                  <span>
                    {new Date(feature.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </section>
  );
}