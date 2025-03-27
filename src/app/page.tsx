"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import PinListAll from "./components/Pins/PinListAll";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Session Data:", session);
    console.log("Session Status:", status);
  }, [session, status]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <PinListAll />
    </div>
  );
}
