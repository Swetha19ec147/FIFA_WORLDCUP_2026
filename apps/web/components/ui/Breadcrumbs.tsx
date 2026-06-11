import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export default function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <JsonLd data={breadcrumbJsonLd(items)} />
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span className="font-medium text-slate-200" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.path}
                    className="transition-colors hover:text-neon-cyan"
                  >
                    {item.name}
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
