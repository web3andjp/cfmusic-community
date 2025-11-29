"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const [email, setEmail] = useState("");

  const handleSignIn = () => {
    if (!email) return;
    signIn("resend", { email });
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-4 text-white">
      <h1 className="text-3xl font-bold">Sign In</h1>

      <Input
        type="email"
        placeholder="Enter your email"
        className="max-w-sm w-full bg-white/10 border-white/20 text-white placeholder-white/40"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button
        className="bg-amber-600 text-white hover:bg-amber-500"
        onClick={handleSignIn}
      >
        Send Magic Link
      </Button>

      <Button
        className="bg-white/10 border border-white/20 text-white hover:bg-white/20 mt-2"
        onClick={() => signIn("credentials", { name: "Demo User" })}
      >
        Dev Login
      </Button>
    </div>
  );
}