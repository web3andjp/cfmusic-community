"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const { data: session } = useSession();
  const [guest, setGuest] = useState(false);
  const [guestId, setGuestId] = useState<string | null>(null);

  useEffect(() => {
    const g = typeof window !== "undefined"
      ? localStorage.getItem("campfire-guest")
      : null;

    if (g) {
      const parsed = JSON.parse(g);
      setGuest(true);
      setGuestId(parsed.guestId);
    }
  }, []);

  // Auto-upgrade guest → registered user after sign-in
  useEffect(() => {
    if (session?.user && guest) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("campfire-guest");
      }
      setGuest(false);
      setGuestId(null);
    }
  }, [session, guest]);

  const logoutGuest = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("campfire-guest");
      window.location.href = "/";
    }
  };

  const email = session?.user?.email;

  return (
    <header className="flex items-center justify-between p-4 border-b border-white/10">
      <h1 className="text-xl font-bold text-white">Campfire Community Hub</h1>

      {/* Logged-in user */}
      {email && (
        <div className="flex items-center gap-3">
          <span className="text-white/80">{email}</span>
          <Button
            className="bg-transparent border border-white/40 text-white hover:bg-white/10 px-4 py-1"
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        </div>
      )}

      {/* Guest user */}
      {!email && guest && (
        <div className="flex items-center gap-3">
          <span className="text-white/80">Guest User</span>
          <Button
            className="bg-transparent border border-white/40 text-white hover:bg-white/10 px-4 py-1"
            onClick={logoutGuest}
          >
            Exit Guest Mode
          </Button>
        </div>
      )}

      {/* Not logged in */}
      {!email && !guest && (
        <Button
          className="bg-amber-600 text-black hover:bg-amber-500 px-4 py-1"
          onClick={() => signIn()}
        >
          Sign In
        </Button>
      )}
    </header>
  );
}