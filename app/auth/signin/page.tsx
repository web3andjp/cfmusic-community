"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const [email, setEmail] = useState("");

  const handleMagicLink = async () => {
    if (!email) return;

    await signIn("email", {
      email,
      redirect: true,
      callbackUrl: "/",
    });
  };

  const handleGuest = async () => {
    await signIn("credentials", {
      email: "guest@cfmusic.org",
      password: "guest",
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] px-6 gap-6 text-white">

      <h1 className="text-4xl font-bold text-white mb-4">
        Sign In
      </h1>

      {/* Email input */}
      <Input
        type="email"
        placeholder="Enter your email"
        className="max-w-md w-full text-black bg-white rounded-md px-4 py-3 text-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button
        onClick={handleMagicLink}
        className="bg-[#D87800] hover:bg-[#b96500] text-white text-lg font-semibold max-w-md w-full py-3"
      >
        Send Magic Link
      </Button>

      <div className="text-gray-400">or</div>

      {/* CONTINUE AS GUEST */}
      <Button
        variant="outline"
        onClick={handleGuest}
        className="border border-white text-white hover:bg-white/10 max-w-md w-full py-3 text-lg font-semibold"
      >
        Continue as Guest
      </Button>

    </div>
  );
}