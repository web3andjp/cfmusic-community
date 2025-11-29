"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-white">
      <h1 className="text-3xl font-bold mb-6">Sign In</h1>

      <Button onClick={() => signIn("email")}>
        Sign in with Email
      </Button>
    </div>
  );
}