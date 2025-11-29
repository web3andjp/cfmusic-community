"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const [email, setEmail] = useState("");

  const handleSignIn = () => {
    if (!email) return;
    signIn("email", { email });
  };

  const handleGuest = () => {
    const guestId = crypto.randomUUID();
    localStorage.setItem(
      "campfire-guest",
      JSON.stringify({ guestId, createdAt: Date.now() })
    );
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-6 px-4 text-white">
      
      <h1 className="text-3xl font-bold">Sign In</h1>

      {/* Email Input */}
      <Input
        type="email"
        placeholder="Enter your email"
        className="max-w-sm w-full bg-white text-black placeholder:text-gray-600"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Magic Link Button */}
      <Button
        className="max-w-sm w-full bg-amber-600 text-black font-semibold hover:bg-amber-500"
        onClick={handleSignIn}
      >
        Send Magic Link
      </Button>

      <div className="text-white/60 text-sm">or</div>

      {/* Guest Mode Button */}
      <Button
        variant="outline"
        className="max-w-sm w-full border-white/40 text-white hover:bg-white/10"
        onClick={handleGuest}
      >
        Continue as Guest
      </Button>
    </div>
  );
}