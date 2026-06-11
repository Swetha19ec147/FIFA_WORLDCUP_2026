import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  cta,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <Reveal>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-base leading-relaxed text-slate-400">
              {description}
            </p>
          )}
        </div>
        {href && cta && (
          <Link
            href={href}
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-neon-cyan transition-colors hover:text-white"
          >
            {cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </Reveal>
  );
}
