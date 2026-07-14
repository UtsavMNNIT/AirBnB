import { Icon } from "./Icon";

/** Row of 5 stars filled to the nearest whole for the given rating. */
export function Stars({ rating = 5, size = 10 }: { rating?: number; size?: number }) {
  const filled = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-0.5 text-[#222]" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="starSmall" size={size} className={i < filled ? "opacity-100" : "opacity-25"} />
      ))}
    </span>
  );
}
