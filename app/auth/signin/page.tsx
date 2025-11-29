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
    // Save a local "guest" session that your app can read
    localStorage.setItem(
      "campfire-guest",
      JSON.stringify({
        guest: true,
        name: "Guest User"
      })
    );

    // Reload to trigger UI update
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-white gap-6">
      <h1 className="text-3xl font-bold">Welcome to Campfire</h1>

      {/* Magic Link Email Login */}
      <div className="flex flex-col gap-3 items-center w-full max-w-sm">
        <Input
          type="email"
          placeholder="Enter your email"
          className="text-black w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button className="bg-amber-600 w-full" onClick={handleMagicLink}>
          Send Magic Link
        </Button>
      </div>

      {/* Divider */}
      <div className="text-white/60 text-sm">or</div>

      {/* Guest Mode */}
      <Button
        variant="outline"
        className="border-white text-white w-full max-w-sm"
        onClick={handleGuest}
      >
        Continue as Guest
      </Button>
    </div>
  );
}