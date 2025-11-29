"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md space-y-4 rounded-2xl border border-slate-800/80 bg-slate-950/80 px-6 py-6 shadow-[0_0_60px_-40px_rgba(0,0,0,0.9)]">
        <h1 className="text-lg font-semibold text-slate-50">
          Sign in to join the fire
        </h1>

        <p className="text-sm text-slate-400">
          We use passwordless sign-in to protect your privacy. Enter your email and
          we’ll send you a magic link.
        </p>

        <Button
          className="w-full bg-amber-500 text-sm font-medium text-slate-950 hover:bg-amber-400"
          onClick={() => signIn("email")}
        >
          Send magic link
        </Button>
      </div>
    </div>
  );
}