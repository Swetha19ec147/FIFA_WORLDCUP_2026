import { cn } from "@/lib/utils";

const sizes = {
  sm: { w: 24, h: 18, cls: "w-6 h-[18px]" },
  md: { w: 32, h: 24, cls: "w-8 h-6" },
  lg: { w: 56, h: 42, cls: "w-14 h-[42px]" },
  xl: { w: 80, h: 60, cls: "w-20 h-[60px]" },
};

/**
 * Country flag rendered from flagcdn (works on every OS, unlike emoji flags
 * which fail to render on Windows). `code` is an ISO 3166-1 alpha-2 value
 * such as "br" or "gb-eng".
 */
export default function Flag({
  code,
  name,
  size = "md",
  className,
}: {
  code: string;
  name?: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const s = sizes[size];
  const px = s.w * 2; // retina source width
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w${px <= 40 ? 40 : px <= 80 ? 80 : 160}/${code}.png`}
      srcSet={`https://flagcdn.com/w160/${code}.png 2x`}
      alt={name ? `${name} flag` : ""}
      width={s.w}
      height={s.h}
      loading="lazy"
      decoding="async"
      className={cn(
        "inline-block shrink-0 rounded-[3px] object-cover ring-1 ring-white/15",
        s.cls,
        className,
      )}
    />
  );
}
