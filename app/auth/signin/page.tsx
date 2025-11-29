"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const [email, setEmail] = useState("");

  const handleMagicLink = () => {
    if (!email) return;
    signIn("email", { email });
  };

  const handleGuest = () => {
    signIn("credentials", {
      email: "guest@cfmusic.org",
      redirect: true,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0A0A] px-6">
      <div className="w-full max-w-md text-center space-y-6">
        <h1 className="text-4xl font-bold text-white">Sign In</h1>

        <Input
          type="email"
          placeholder="Enter your email"
          className="w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          className="w-full bg-campfire-amber hover:bg-campfire-amber/90 text-black font-semibold py-3 rounded-lg"
          onClick={handleMagicLink}
        >
          Send Magic Link
        </Button>

        <div className="text-white/50 text-sm">or</div>

        <Button
          onClick={handleGuest}
          className="
            w-full py-3 rounded-lg font-semibold
            bg-white/10 text-white 
            border border-white/20
            hover:bg-white/20
            transition
          "
        >
          Continue as Guest
        </Button>
      </div>
    </div>
  );
}