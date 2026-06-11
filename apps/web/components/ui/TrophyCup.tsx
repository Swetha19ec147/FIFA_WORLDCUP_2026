import { cn } from "@/lib/utils";

/**
 * The FIFA World Cup trophy — a detailed, realistic, STATIC gold rendering
 * (globe held aloft by two figures, green malachite base band, FIFA WORLD CUP
 * plinth). No animation, per request. Original stylised vector art.
 *
 * Props are kept for call-site compatibility but no longer animate.
 */
export default function TrophyCup({
  className,
  glow = false,
  podium = false,
}: {
  className?: string;
  glow?: boolean;
  animated?: boolean;
  sparkles?: boolean;
  podium?: boolean;
}) {
  return (
    <div className={cn("relative inline-block", className)}>
      {glow && (
        <div className="absolute inset-0 -z-10 rounded-full bg-neon-gold/20 blur-3xl" />
      )}

      <svg
        viewBox="0 0 240 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="FIFA World Cup trophy"
        className="h-full w-full drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)]"
      >
        <defs>
          <linearGradient id="tc-gold" x1="0.2" y1="0" x2="0.85" y2="1">
            <stop offset="0" stopColor="#FFF7D6" />
            <stop offset="0.28" stopColor="#FBD969" />
            <stop offset="0.55" stopColor="#E3A11C" />
            <stop offset="0.78" stopColor="#B97A0C" />
            <stop offset="1" stopColor="#83520A" />
          </linearGradient>
          <linearGradient id="tc-gold-light" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#FFFBEA" />
            <stop offset="0.5" stopColor="#FFE38A" />
            <stop offset="1" stopColor="#D9930F" />
          </linearGradient>
          <radialGradient id="tc-globe" cx="0.38" cy="0.32" r="0.85">
            <stop offset="0" stopColor="#FFFBEA" />
            <stop offset="0.42" stopColor="#FBD45C" />
            <stop offset="0.78" stopColor="#D08C0E" />
            <stop offset="1" stopColor="#94600A" />
          </radialGradient>
          <linearGradient id="tc-green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1f7a47" />
            <stop offset="0.5" stopColor="#0f5a32" />
            <stop offset="1" stopColor="#0a3f23" />
          </linearGradient>
          <radialGradient id="tc-podium" cx="0.5" cy="0.2" r="0.9">
            <stop offset="0" stopColor="#23262e" />
            <stop offset="1" stopColor="#0a0c12" />
          </radialGradient>
        </defs>

        {/* Optional dark podium (poster look) */}
        {podium && (
          <>
            <path d="M58 330 L182 330 L210 392 L30 392 Z" fill="url(#tc-podium)" />
            <ellipse cx="120" cy="330" rx="62" ry="12" fill="#15171d" />
            <ellipse cx="120" cy="330" rx="46" ry="8" fill="#0a0c12" />
          </>
        )}

        {/* ---- Base / plinth ---- */}
        {/* black foot under base */}
        <ellipse cx="120" cy="318" rx="50" ry="11" fill="#0c0d12" opacity="0.6" />
        {/* lower gold base */}
        <path d="M82 300 L158 300 L168 314 Q120 326 72 314 Z" fill="url(#tc-gold)" />
        {/* green malachite band with FIFA WORLD CUP */}
        <path d="M86 286 L154 286 L158 300 L82 300 Z" fill="url(#tc-green)" />
        <text
          x="120"
          y="296"
          textAnchor="middle"
          fontSize="8"
          fontWeight="700"
          letterSpacing="0.5"
          fill="#E9E3C9"
          fontFamily="var(--font-sans), sans-serif"
        >
          FIFA WORLD CUP
        </text>
        {/* upper gold base ring */}
        <path d="M92 270 L148 270 Q150 280 154 286 L86 286 Q90 280 92 270 Z" fill="url(#tc-gold-light)" />
        <ellipse cx="120" cy="270" rx="28" ry="6" fill="url(#tc-gold)" />

        {/* ---- Body / figures (the spiral) ---- */}
        {/* main column silhouette */}
        <path
          d="M120 108
             C103 112 90 134 97 162
             C101 184 99 204 108 224
             C113 240 111 256 106 270
             L134 270
             C129 256 127 240 132 224
             C141 204 139 184 143 162
             C150 134 137 112 120 108 Z"
          fill="url(#tc-gold)"
        />
        {/* vertical sheen highlight */}
        <path
          d="M110 120 C100 145 101 188 109 224"
          stroke="url(#tc-gold-light)"
          strokeOpacity="0.85"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* the two arms reaching up to hold the globe */}
        <path
          d="M101 158 C92 134 98 118 117 110"
          stroke="#C68610"
          strokeOpacity="0.7"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M139 158 C148 134 142 118 123 110"
          stroke="#C68610"
          strokeOpacity="0.7"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* twist contour lines suggesting the figures */}
        <path d="M112 130 C106 150 108 180 116 206" stroke="#8A5806" strokeOpacity="0.35" strokeWidth="2" fill="none" />
        <path d="M128 130 C134 150 132 180 124 206" stroke="#8A5806" strokeOpacity="0.35" strokeWidth="2" fill="none" />

        {/* ---- Globe ---- */}
        <circle cx="120" cy="72" r="42" fill="url(#tc-globe)" />
        {/* meridians / parallels */}
        <g stroke="#8A5806" strokeOpacity="0.4" strokeWidth="1.3" fill="none">
          <ellipse cx="120" cy="72" rx="14" ry="42" />
          <ellipse cx="120" cy="72" rx="30" ry="42" />
          <ellipse cx="120" cy="72" rx="42" ry="14" />
          <line x1="78" y1="72" x2="162" y2="72" />
        </g>
        {/* hint of continents */}
        <path
          d="M104 52 q10 -4 16 4 q-6 8 -16 6 q-4 -8 0 -10 Z"
          fill="#B97A0C"
          opacity="0.45"
        />
        <path
          d="M124 86 q12 -2 14 8 q-10 6 -16 -2 q-2 -5 2 -6 Z"
          fill="#B97A0C"
          opacity="0.4"
        />
        <circle cx="120" cy="72" r="42" stroke="#9A6206" strokeOpacity="0.55" strokeWidth="2" fill="none" />
        {/* specular highlight */}
        <ellipse cx="104" cy="56" rx="13" ry="9" fill="#FFFCEC" opacity="0.5" />
      </svg>
    </div>
  );
}
