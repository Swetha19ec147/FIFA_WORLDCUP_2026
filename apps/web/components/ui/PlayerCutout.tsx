"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

function initials(name: string) {
  const p = name.trim().split(/\s+/);
  return ((p[0]?.[0] ?? "") + (p.length > 1 ? p[p.length - 1][0] : "")).toUpperCase();
}

/**
 * Transparent player cut-out (full upper body). Falls back to a large initials
 * monogram if the image is missing or fails to load.
 */
export default function PlayerCutout({
  name,
  src,
  className,
}: {
  name: string;
  src?: string;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);
  const show = src && !errored;

  if (!show) {
    return (
      <div
        className={cn(
          "flex items-end justify-center text-6xl font-black text-white/15",
          className,
        )}
      >
        {initials(name)}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      loading="lazy"
      decoding="async"
      onError={() => setErrored(true)}
      className={cn("object-contain object-bottom drop-shadow-2xl", className)}
    />
  );
}
