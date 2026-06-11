import Breadcrumbs from "./Breadcrumbs";

export default function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  crumbs: { name: string; path: string }[];
}) {
  return (
    <div className="relative overflow-hidden border-b border-white/10 pt-24">
      <div className="absolute -top-20 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-neon-blue/15 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={crumbs} />
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-base text-slate-400">{description}</p>
        )}
      </div>
    </div>
  );
}
