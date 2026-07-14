const COLORS = ["#C6316A", "#3B5", "#0891B2", "#7C3AED", "#D97706", "#DC2626", "#0D9488", "#DB2777"];

function hueFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h + name.charCodeAt(i)) % COLORS.length;
  return COLORS[h];
}

/** Round avatar: photo if provided, otherwise the initial on a stable colour. */
export function Avatar({
  name, src, size = 40,
}: { name: string; src?: string; size?: number }) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover bg-[#F7F7F7]"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="rounded-full flex items-center justify-center text-white font-medium select-none"
      style={{ width: size, height: size, background: hueFor(name), fontSize: size * 0.42 }}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
