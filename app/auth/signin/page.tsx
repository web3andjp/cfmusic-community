"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const [email, setEmail] = useState("");

  const handleSignIn = () => {
    if (!email) return;
    // IMPORTANT: Provider id must be "email", not "resend"
    signIn("email", { email });
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-white gap-4">
      <h1 className="text-3xl font-bold">Sign In</h1>

      <Input
        type="email"
        placeholder="Enter your email"
        className="text-black max-w-sm w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button className="bg-amber-600 text-white" onClick={handleSignIn}>
        Send Magic Link
      </Button>
    </div>
  );
}