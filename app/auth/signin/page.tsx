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
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-6">
      <div className="w-full max-w-md bg-[#0A0A0A] space-y-8">
        
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-white tracking-tight">
          Sign In
        </h1>

        {/* Email Input */}
        <div className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email"
            className="
              w-full px-4 py-3
              bg-[#111111] text-white 
              placeholder-[#A2A2A2]
              border border-[#2A2A2A]
              rounded-xl
              focus:border-[#D87800]
              focus:ring-1 focus:ring-[#D87800]
              transition
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Magic Link Button */}
          <Button
            onClick={handleMagicLink}
            className="
              w-full py-3 text-lg font-semibold
              bg-[#D87800] text-black
              hover:bg-[#b86200]
              rounded-xl
              transition
            "
          >
            Send Magic Link
          </Button>
        </div>

        {/* OR Divider */}
        <div className="flex items-center justify-center py-2">
          <span className="text-[#A2A2A2] text-sm">or</span>
        </div>

        {/* Guest Button */}
        <Button
          onClick={handleGuest}
          className="
            w-full py-3 text-lg font-semibold
            bg-white/5 text-white
            border border-white/20
            hover:bg-white/10
            rounded-xl
            transition
          "
        >
          Continue as Guest
        </Button>
      </div>
    </div>
  );
}