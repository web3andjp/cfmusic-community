"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
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
    <header className="border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-6">
        <div className="flex items-center gap-3">
          <Image
            src="/campfire-logo.png"
            alt="Campfire Music logo"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className="text-xs uppercase tracking-[0.2em] text-white/60">
              Campfire Music
            </span>
            <span className="text-lg font-semibold text-white">Community Hub</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-4 text-sm text-white/80 ml-4">
          <a href="/#hero" className="hover:text-white transition">
            Overview
          </a>
          <a href="/#platform-roadmap" className="hover:text-white transition">
            Platform Roadmap
          </a>
          <a href="/feature-request" className="hover:text-white transition">
            Feature Requests
          </a>
        </nav>

        <div className="flex-1" />

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
      </div>
    </header>
  );
}
