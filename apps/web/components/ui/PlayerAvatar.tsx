"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const sizes = {
  sm: "h-9 w-9 text-[11px]",
  md: "h-12 w-12 text-sm",
  lg: "h-20 w-20 text-xl",
  xl: "h-28 w-28 text-2xl",
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function hue(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return h;
}

/**
 * Player headshot. Renders the real `image` if provided; otherwise a clean
 * gradient initials avatar (deterministic colour per name). If a real photo
 * URL 404s, it falls back to the avatar automatically.
 */
export default function PlayerAvatar({
  name,
  image,
  size = "md",
  className,
}: {
  name: string;
  image?: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);
  const h = hue(name);
  const showImage = image && !errored;

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-bold text-white ring-2 ring-white/15",
        sizes[size],
        className,
      )}
      style={
        showImage
          ? undefined
          : {
              background: `linear-gradient(135deg, hsl(${h} 72% 46%), hsl(${(h + 45) % 360} 70% 32%))`,
            }
      }
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        initials(name)
      )}
    </span>
  );
}
