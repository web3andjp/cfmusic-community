import { FeatureBoard } from "@/components/feature-board";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-900/80 via-slate-950 to-slate-950 px-5 py-6 shadow-[0_0_60px_-40px_rgba(0,0,0,0.9)] sm:px-7 sm:py-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
              Help shape the future of CFMusic
            </h1>
            <p className="max-w-xl text-sm text-slate-400 sm:text-[0.9rem]">
              Suggest ideas, vote on improvements, and participate in building a fair,
              community-owned music streaming platform.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 text-xs text-slate-400 sm:items-end">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[0.7rem] font-medium text-amber-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Community Alpha — built in the open
            </span>
            <span className="text-[0.7rem] text-slate-500">
              Your feedback directly shapes our roadmap.
            </span>
          </div>
        </div>
      </section>

      <FeatureBoard />
    </div>
  );
}