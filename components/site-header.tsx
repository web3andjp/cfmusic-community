"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const { data: session } = useSession();

  return (
    <header className="border-b border-slate-800/60 bg-slate-950/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500 shadow-md shadow-amber-500/40" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide text-slate-50">
              Campfire Community Hub
            </span>
            <span className="text-xs text-slate-400">
              Help shape the future of CFMusic
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {!session ? (
            <Button
              size="sm"
              className="bg-amber-500 text-xs font-medium text-slate-950 hover:bg-amber-400"
              onClick={() => signIn("email")}
            >
              Sign in
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="border-slate-700/80 bg-slate-900/80 text-xs text-slate-200 hover:bg-slate-800"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}