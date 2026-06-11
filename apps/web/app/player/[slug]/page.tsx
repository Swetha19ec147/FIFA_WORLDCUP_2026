import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, Cake, Footprints, Ruler, Shirt, TrendingUp, Shield, Star, BarChart3 } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Flag from "@/components/ui/Flag";
import PlayerCutout from "@/components/ui/PlayerCutout";
import PlayerAvatar from "@/components/ui/PlayerAvatar";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Reveal from "@/components/ui/Reveal";
import JsonLd from "@/components/ui/JsonLd";
import { SITE, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { getPlayer, players, type PlayerPro } from "@/lib/players";
import ShareButtons from "@/components/ui/ShareButtons";

export function generateStaticParams() {
  return players.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPlayer(slug);
  if (!p) return { title: "Player not found" };
  const title = `${p.name} Stats, Career, Goals & FIFA World Cup 2026 Records`;
  const description = `${p.name} FIFA World Cup 2026 stats — ${p.goals} goals, ${p.assists} assists, ${p.rating.toFixed(1)} rating, ${p.careerGoals} career goals in ${p.careerCaps} caps. Full biography, honours and career history.`;
  const url = `${SITE.url}/player/${p.slug}`;
  return {
    title,
    description,
    keywords: [
      `${p.name} stats`, `${p.name} FIFA World Cup`, `${p.name} goals`,
      `${p.name} career stats`, `${p.name} biography`, `${p.name} 2026`,
      `${p.country} World Cup 2026`, "FIFA World Cup 2026 players",
    ],
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "profile", images: [{ url: p.image ?? "/og.png", alt: p.name }] },
    twitter: { card: "summary_large_image", title, description },
  };
}

function personJsonLd(p: PlayerPro) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    alternateName: p.fullName,
    nationality: p.country,
    jobTitle: `Professional Footballer (${p.pos})`,
    image: p.image ?? p.cutout,
    url: `${SITE.url}/player/${p.slug}`,
    affiliation: { "@type": "SportsTeam", name: p.club },
    memberOf: { "@type": "SportsTeam", name: `${p.country} national football team` },
    description: p.bio,
  };
}

function StatTile({ label, value, decimals = 0, accent, sub }: {
  label: string; value: number; decimals?: number; accent?: boolean; sub?: string;
}) {
  return (
    <div className="glass flex flex-col items-center justify-center p-5 text-center">
      <div className={accent ? "text-4xl font-black text-neon-gold" : "text-4xl font-black text-gradient"}>
        <AnimatedCounter value={value} decimals={decimals} />
      </div>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
      {sub && <p className="mt-0.5 text-[10px] text-slate-600">{sub}</p>}
    </div>
  );
}

function Fact({ icon: Icon, label, value }: { icon: typeof Cake; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-neon-cyan">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

function SectionTitle({ icon: Icon, children }: { icon: typeof Shield; children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-neon-cyan">
        <Icon className="h-4 w-4" />
      </span>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">{children}</h2>
    </div>
  );
}

export default async function PlayerProfile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPlayer(slug);
  if (!p) notFound();

  const isGk = p.posGroup === "GK";
  const more = players.filter((x) => x.slug !== p.slug && x.posGroup === p.posGroup).slice(0, 6);
  const honorsList = p.honors.split("·").map((h) => h.trim()).filter(Boolean);
  const playerFaq = faqJsonLd([
    { q: `What are ${p.name}'s stats at the FIFA World Cup 2026?`, a: `${p.name} has scored ${p.goals} goals and provided ${p.assists} assists in ${p.matchesPlayed} appearances at FIFA World Cup 2026, with an average rating of ${p.rating.toFixed(1)}.` },
    { q: `How many career goals does ${p.name} have?`, a: `${p.name} has scored ${p.careerGoals} career international goals in ${p.careerCaps} caps for ${p.country}.` },
    { q: `What club does ${p.name} play for?`, a: `${p.name} currently plays for ${p.club} and represents ${p.country} at international level, wearing the number ${p.number} shirt.` },
    { q: `What is ${p.name}'s FIFA rating?`, a: `${p.name} has a FIFA rating of ${p.fifaRating} and a market value of ${p.marketValue}.` },
    { q: `What honours has ${p.name} won?`, a: `${p.name}'s honours include: ${p.honors}.` },
  ]);
  const playerBreadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Players", path: "/players" },
    { name: p.name, path: `/player/${p.slug}` },
  ]);

  return (
    <>
      <JsonLd data={personJsonLd(p)} />
      <JsonLd data={playerBreadcrumb} />
      <JsonLd data={playerFaq} />

      {/* HERO */}
      <header className="relative overflow-hidden border-b border-white/10 pt-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-800 to-ink-900" />
        <div className="absolute -top-10 left-1/3 h-64 w-64 animate-pulse-glow rounded-full bg-neon-blue/20 blur-[120px]" />
        <div className="absolute -top-10 right-1/4 h-64 w-64 animate-pulse-glow rounded-full bg-neon-purple/20 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[
            { name: "Home", path: "/" },
            { name: "Players", path: "/players" },
            { name: p.name, path: `/player/${p.slug}` },
          ]} />

          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="relative mx-auto flex h-72 w-full max-w-sm items-end justify-center">
              <span className="absolute inset-x-0 top-2 text-center text-[10rem] font-black leading-none text-white/[0.04]">
                {p.number}
              </span>
              <PlayerCutout name={p.name} src={p.cutout} className="h-72 w-auto" />
            </div>

            <div>
              <div className="flex items-center gap-3">
                <Flag code={p.iso2} name={p.country} size="md" />
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-neon-cyan">
                  {p.country} · #{p.number}
                </span>
              </div>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">{p.name}</h1>
              {p.fullName && p.fullName !== p.name && (
                <p className="mt-1 text-sm text-slate-500">{p.fullName}</p>
              )}
              <p className="mt-2 text-lg text-slate-300">{p.pos} · {p.club}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.bio}</p>

              <div className="mt-4 flex items-center gap-4">
                <div className="rounded-xl border border-neon-gold/20 bg-neon-gold/5 px-4 py-2 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">Market Value</p>
                  <p className="text-base font-black text-neon-gold">{p.marketValue}</p>
                </div>
                <div className="rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 px-4 py-2 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">FIFA Rating</p>
                  <p className="text-base font-black text-neon-cyan">{p.fifaRating}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-4">
                <Fact icon={Cake} label="Age" value={`${p.age} yrs`} />
                <Fact icon={Ruler} label="Height" value={p.height} />
                <Fact icon={Footprints} label="Foot" value={p.foot} />
                <Fact icon={Shirt} label="Number" value={`#${p.number}`} />
              </div>

              <div className="mt-6 border-t border-white/5 pt-5">
                <ShareButtons
                  url={`${SITE.url}/player/${p.slug}`}
                  text={`${p.name} — ${p.goals} goals, ${p.assists} assists at FIFA World Cup 2026! ⚽ #WC2026 #WorldCup2026`}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">

        {/* WORLD CUP 2026 STATS */}
        <Reveal>
          <SectionTitle icon={TrendingUp}>World Cup 2026 — Tournament Stats</SectionTitle>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatTile label="Goals" value={p.goals} sub={`${p.matchesPlayed} appearances`} />
            <StatTile label="Assists" value={p.assists} />
            {isGk
              ? <StatTile label="Clean Sheets" value={p.cleanSheets} />
              : <StatTile label="Goal Involvements" value={p.goals + p.assists} />}
            <StatTile label="Avg Rating" value={p.rating} decimals={1} accent />
          </div>
        </Reveal>

        {/* CAREER STATS */}
        <Reveal>
          <SectionTitle icon={BarChart3}>Career Statistics</SectionTitle>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatTile label="Career Goals" value={p.careerGoals} />
            <StatTile label="International Caps" value={p.careerCaps} />
            <StatTile label="WC Appearances" value={p.matchesPlayed} />
            <StatTile label="FIFA Rating" value={p.fifaRating} accent />
          </div>
        </Reveal>

        {/* HONOURS */}
        <Reveal>
          <SectionTitle icon={Star}>Honours &amp; Achievements</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {honorsList.map((h, i) => (
              <div key={i} className="glass flex items-center gap-3 p-4">
                <Award className="h-4 w-4 shrink-0 text-neon-gold" />
                <span className="text-sm font-medium text-slate-200">{h}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* CLUB & NATIONAL */}
        <Reveal>
          <SectionTitle icon={Shield}>Club &amp; International</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass p-5">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Current Club</p>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-2xl font-black text-white/20">
                  {p.club[0]}
                </div>
                <div>
                  <p className="font-bold text-white">{p.club}</p>
                  <p className="text-sm text-slate-400">{p.pos}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/5 pt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-600">WC Goals</p>
                  <p className="text-2xl font-black text-white">{p.goals}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-600">WC Assists</p>
                  <p className="text-2xl font-black text-white">{p.assists}</p>
                </div>
              </div>
            </div>

            <div className="glass p-5">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">National Team</p>
              <div className="flex items-center gap-3">
                <Flag code={p.iso2} name={p.country} size="lg" />
                <div>
                  <p className="font-bold text-white">{p.country}</p>
                  <p className="text-sm text-slate-400">#{p.number} · {p.pos}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/5 pt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-600">Career Goals</p>
                  <p className="text-2xl font-black text-white">{p.careerGoals}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-600">Int'l Caps</p>
                  <p className="text-2xl font-black text-white">{p.careerCaps}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* MORE PLAYERS */}
        {more.length > 0 && (
          <section>
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-400">More {p.pos}s</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {more.map((m) => (
                <Link key={m.slug} href={`/player/${m.slug}`}
                  className="glass glass-hover flex flex-col items-center p-4 text-center">
                  <PlayerAvatar name={m.name} image={m.image} size="lg" />
                  <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-white">
                    <Flag code={m.iso2} name={m.country} size="sm" className="!h-3 !w-4" />
                    {m.name.split(" ").slice(-1)[0]}
                  </p>
                  <p className="text-xs text-slate-500">{m.pos}</p>
                  <p className="mt-1 text-xs font-semibold text-neon-gold">{m.rating.toFixed(1)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
