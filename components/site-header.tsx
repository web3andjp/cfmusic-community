"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const { data: session } = useSession();
  const [guest, setGuest] = useState(false);

  useEffect(() => {
    const g = localStorage.getItem("campfire-guest");
    setGuest(!!g);
  }, []);

  // Auto-upgrade guest → registered user after sign-in
  useEffect(() => {
    if (session?.user && guest) {
      localStorage.removeItem("campfire-guest");
      setGuest(false);
    }
  }, [session, guest]);

  const logoutGuest = () => {
    localStorage.removeItem("campfire-guest");
    window.location.href = "/";
  };

  const email = session?.user?.email;

  return (
    <header className="flex items-center justify-between p-4 border-b border-white/10">
      <h1 className="text-xl font-bold text-white">Campfire Community Hub</h1>

      {/* Logged-in User */}
      {email && (
        <div className="flex items-center gap-3">
          <span className="text-white/80">{email}</span>
          <Button variant="outline" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      )}

      {/* Guest User */}
      {!email && guest && (
        <div className="flex items-center gap-3">
          <span className="text-white/80">Guest User</span>
          <Button variant="outline" onClick={logoutGuest}>
            Exit Guest Mode
          </Button>
        </div>
      )}

      {/* Not logged in */}
      {!email && !guest && (
        <Button onClick={() => signIn()}>Sign In</Button>
      )}
    </header>
  );
}
