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

  const handleDevLogin = () => {
    signIn("dev");
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-white gap-6">
      <h1 className="text-3xl font-bold">Sign In</h1>

      <Input
        type="email"
        placeholder="Enter your email"
        className="text-black max-w-sm w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button className="bg-amber-600 text-white w-full max-w-sm" onClick={handleMagicLink}>
        Send Magic Link
      </Button>

      {/* TEMP DEV LOGIN BUTTON */}
      <Button className="bg-gray-600 text-white w-full max-w-sm" onClick={handleDevLogin}>
        Dev Login (Temporary)
      </Button>
    </div>
  );
}