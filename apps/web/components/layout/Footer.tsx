import Link from "next/link";
import TrophyCup from "@/components/ui/TrophyCup";

const cols = [
  {
    title: "Tournament",
    links: [
      { href: "/standings", label: "Standings" },
      { href: "/schedule", label: "Schedule" },
      { href: "/predictions", label: "AI Predictions" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/news", label: "News" },
      { href: "/players", label: "Player Stats" },
      { href: "/standings#groups", label: "Groups A–L" },
      { href: "/", label: "Home" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2.5">
            <TrophyCup animated={false} className="h-10 w-auto" />
            <span className="text-lg font-bold">
              <span className="text-white">VISIONARY</span>{" "}
              <span className="text-gradient">FIFA</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            The premium hub for the FIFA World Cup 2026 — live scores, AI
            predictions, standings, fixtures and player statistics across all 48
            teams and 12 groups.
          </p>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-400 transition-colors hover:text-neon-cyan"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Visionary FIFA. Demo project — not affiliated with FIFA.</p>
          <p>Built with Next.js 15 · TypeScript · Tailwind · Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
