import type { Metadata } from "next";
import Link from "next/link";
import Flag from "@/components/ui/Flag";
import JsonLd from "@/components/ui/JsonLd";
import PageHeader from "@/components/ui/PageHeader";
import { pageMeta, faqJsonLd } from "@/lib/seo";
import { teams, groupIds } from "@/lib/data";

export const metadata: Metadata = pageMeta({
  title: "FIFA World Cup 2026 Teams — All 48 Nations, Groups & Squads",
  description:
    "Complete list of all 48 FIFA World Cup 2026 teams across 12 groups. View squad details, fixtures and group standings for every nation — Argentina, Brazil, France, England and more.",
  path: "/teams",
  keywords: [
    "FIFA World Cup 2026 teams", "World Cup 2026 squads", "World Cup 2026 groups",
    "48 teams World Cup 2026", "FIFA 2026 nations", "Argentina squad 2026",
    "Brazil squad 2026", "France squad 2026", "England squad 2026",
  ],
});

export default function TeamsPage() {
  const faq = faqJsonLd([
    { q: "How many teams are in the FIFA World Cup 2026?", a: "FIFA World Cup 2026 features 48 teams for the first time, expanded from 32. The teams are split into 12 groups of 4." },
    { q: "Which teams qualified for FIFA World Cup 2026?", a: "All 48 qualified teams include Argentina, Brazil, France, England, Spain, Germany, Portugal, Netherlands, and many more from every confederation." },
    { q: "How are World Cup 2026 groups structured?", a: "FIFA World Cup 2026 uses 12 groups (A through L) each containing 4 teams. The top 2 from each group plus 8 best third-place teams advance to the Round of 32." },
  ]);

  return (
    <>
      <JsonLd data={faq} />
      <PageHeader
        eyebrow="All 48 Nations"
        title="World Cup 2026 Teams"
        description="Every team competing at FIFA World Cup 2026, grouped by their draw placement across 12 groups."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Teams", path: "/teams" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {groupIds.map((gid) => {
            const groupTeams = teams.filter((t) => t.group === gid);
            return (
              <section key={gid} aria-labelledby={`group-${gid}`}>
                <h2
                  id={`group-${gid}`}
                  className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-neon-cyan"
                >
                  Group {gid}
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {groupTeams.map((team) => {
                    const slug = team.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                    return (
                      <Link
                        key={team.code}
                        href={`/team/${slug}`}
                        className="glass glass-hover flex items-center gap-3 rounded-xl p-4 transition-all hover:border-neon-cyan/40"
                        aria-label={`${team.name} — Group ${gid} — FIFA World Cup 2026`}
                      >
                        <Flag code={team.iso2} name={team.name} size="md" />
                        <div>
                          <p className="text-sm font-bold text-white leading-tight">{team.name}</p>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                            Group {gid}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
