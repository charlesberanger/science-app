"use client";

import { useEffect, useState } from "react";

const DEADLINE = new Date("2026-04-12T23:59:00Z");

function getRemaining() {
  const diff = DEADLINE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { days, hours, minutes };
}

interface CountdownTimerProps {
  /** compact: shows only days, e.g. "38". full: shows "38d 14h 22m" */
  mode?: "compact" | "full";
}

export default function CountdownTimer({ mode = "compact" }: CountdownTimerProps) {
  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (mode === "compact") {
    return <>{remaining.days}</>;
  }

  return (
    <>
      {remaining.days}d {remaining.hours}h {remaining.minutes}m
    </>
  );
}
