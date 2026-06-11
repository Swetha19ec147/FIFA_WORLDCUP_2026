import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Users, Trophy, Calendar } from "lucide-react";
import Flag from "@/components/ui/Flag";
import PlayerAvatar from "@/components/ui/PlayerAvatar";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/ui/JsonLd";
import { SITE, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { teams, allMatches } from "@/lib/data";
import { players } from "@/lib/players";

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function generateStaticParams() {
  return teams.map((t) => ({ slug: slugify(t.name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const team = teams.find((t) => slugify(t.name) === slug);
  if (!team) return { title: "Team not found" };

  const title = `${team.name} — FIFA World Cup 2026 Squad, Fixtures & Stats`;
  const description = `${team.name} full squad, Group ${team.group} fixtures, match results and player statistics at FIFA World Cup 2026. Everything you need to follow ${team.name} at the World Cup.`;
  const url = `${SITE.url}/team/${slug}`;
  return {
    title,
    description,
    keywords: [
      `${team.name} World Cup 2026`, `${team.name} squad 2026`,
      `${team.name} fixtures 2026`, `${team.name} players`,
      `${team.name} FIFA 2026`, `Group ${team.group} World Cup 2026`,
    ],
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const team = teams.find((t) => slugify(t.name) === slug);
  if (!team) notFound();

  const squad = players.filter(
    (p) => p.country.toLowerCase() === team.name.toLowerCase() ||
           p.iso2 === team.iso2
  ).sort((a, b) => {
    const order = { GK: 0, DEF: 1, MID: 2, FWD: 3 };
    return order[a.posGroup] - order[b.posGroup];
  });

  const teamMatches = allMatches.filter(
    (m) => m.home.code === team.code || m.away.code === team.code
  );

  const faq = faqJsonLd([
    { q: `What group is ${team.name} in at the 2026 World Cup?`, a: `${team.name} is in Group ${team.group} at the FIFA World Cup 2026.` },
    { q: `Who are ${team.name}'s key players at World Cup 2026?`, a: squad.filter(p => p.star).length > 0 ? `${team.name}'s key players include ${squad.filter(p => p.star).map(p => p.name).slice(0, 3).join(", ")}.` : `${team.name} feature experienced international players at FIFA World Cup 2026.` },
    { q: `When do ${team.name} play at the 2026 World Cup?`, a: teamMatches.length > 0 ? `${team.name} play ${teamMatches.map(m => `${m.home.name} vs ${m.away.name} on ${m.kickoff.slice(0, 10)}`).join(", ")}.` : `Check the ${team.name} schedule on the fixtures page.` },
    { q: `How many players does ${team.name} have at World Cup 2026?`, a: `${team.name} have ${squad.length} players listed in their World Cup 2026 squad on Visionary FIFA.` },
  ]);

  const posLabels: Record<string, string> = { GK: "Goalkeepers", DEF: "Defenders", MID: "Midfielders", FWD: "Forwards" };
  const byPos = (["GK", "DEF", "MID", "FWD"] as const).map((pos) => ({
    pos,
    label: posLabels[pos],
    players: squad.filter((p) => p.posGroup === pos),
  })).filter((g) => g.players.length > 0);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Teams", path: "/teams" },
        { name: team.name, path: `/team/${slug}` },
      ])} />
      <JsonLd data={faq} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "SportsTeam",
        name: team.name,
        sport: "Association Football",
        url: `${SITE.url}/team/${slug}`,
        memberOf: { "@type": "SportsEvent", name: "FIFA World Cup 2026" },
      }} />

      {/* Hero */}
      <header className="relative overflow-hidden border-b border-white/10 pt-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-800 to-ink-900" />
        <div className="absolute -top-16 left-1/3 h-64 w-64 animate-pulse-glow rounded-full bg-neon-blue/20 blur-[120px]" />
        <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[
            { name: "Home", path: "/" },
            { name: "Teams", path: "/teams" },
            { name: team.name, path: `/team/${slug}` },
          ]} />
          <div className="flex items-center gap-6 mt-4">
            <Flag code={team.iso2} name={team.name} size="xl" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-neon-cyan">Group {team.group} · FIFA World Cup 2026</p>
              <h1 className="mt-1 text-4xl font-black text-white sm:text-5xl">{team.name}</h1>
              <p className="mt-1 text-sm text-slate-400">{squad.length} players · Group {team.group}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">

        {/* Squad by position */}
        {squad.length > 0 && (
          <section aria-labelledby="squad-heading">
            <div className="mb-6 flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-neon-cyan">
                <Users className="h-4 w-4" />
              </span>
              <h2 id="squad-heading" className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                World Cup 2026 Squad — {team.name}
              </h2>
            </div>
            {byPos.map(({ pos, label, players: posPlayers }) => (
              <div key={pos} className="mb-8">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">{label}</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {posPlayers.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/player/${p.slug}`}
                      className="glass glass-hover flex flex-col items-center p-4 text-center rounded-xl"
                      aria-label={`${p.name} — ${p.pos} — ${team.name} World Cup 2026`}
                    >
                      <PlayerAvatar name={p.name} image={p.image} size="lg" />
                      <p className="mt-3 text-sm font-bold text-white leading-tight">
                        {p.name.split(" ").slice(-1)[0]}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">#{p.number} · {p.pos}</p>
                      <p className="mt-1 text-xs font-semibold text-neon-gold">{p.rating.toFixed(1)}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Fixtures */}
        {teamMatches.length > 0 && (
          <section aria-labelledby="fixtures-heading">
            <div className="mb-6 flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-neon-cyan">
                <Calendar className="h-4 w-4" />
              </span>
              <h2 id="fixtures-heading" className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                {team.name} Fixtures — World Cup 2026
              </h2>
            </div>
            <div className="space-y-3">
              {teamMatches.map((m) => (
                <Link
                  key={m.id}
                  href={`/match/${m.slug}`}
                  className="glass glass-hover flex items-center justify-between gap-4 rounded-xl p-4"
                  aria-label={`${m.home.name} vs ${m.away.name} — ${m.stage}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Flag code={m.home.iso2} name={m.home.name} size="sm" />
                    <span className="text-sm font-semibold text-white truncate">{m.home.name}</span>
                  </div>
                  <div className="text-center shrink-0">
                    {m.homeScore != null ? (
                      <span className="text-lg font-black text-white">{m.homeScore} – {m.awayScore}</span>
                    ) : (
                      <span className="text-xs text-slate-400">{m.kickoff.slice(0, 10)}</span>
                    )}
                    <p className="text-[10px] text-slate-500 uppercase">{m.stage}</p>
                  </div>
                  <div className="flex items-center gap-3 min-w-0 justify-end">
                    <span className="text-sm font-semibold text-white truncate">{m.away.name}</span>
                    <Flag code={m.away.iso2} name={m.away.name} size="sm" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related teams in same group */}
        <section aria-labelledby="group-teams-heading">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-neon-cyan">
              <Trophy className="h-4 w-4" />
            </span>
            <h2 id="group-teams-heading" className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Group {team.group} Teams
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {teams.filter(t => t.group === team.group && t.code !== team.code).map((t) => (
              <Link
                key={t.code}
                href={`/team/${slugify(t.name)}`}
                className="glass glass-hover flex items-center gap-3 rounded-xl p-4"
              >
                <Flag code={t.iso2} name={t.name} size="md" />
                <p className="text-sm font-bold text-white">{t.name}</p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
