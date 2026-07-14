/** Airbnb save/wishlist heart. `filled` shows the rausch state; `stroke` sets the
 *  outline colour (white over photos, #222 on light surfaces). */
export function HeartIcon({
  filled = false, size = 24, stroke = "#fff",
}: { filled?: boolean; size?: number; stroke?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      aria-hidden="true"
      style={{ fill: filled ? "#FF385C" : "rgba(0,0,0,0.5)", stroke, strokeWidth: 2, overflow: "visible" }}
    >
      <path d="M16 28c7.3-6.6 12-10.4 12-15.6C28 8.5 25.2 6 21.6 6c-2.3 0-4.2 1.2-5.6 3.2C14.6 7.2 12.7 6 10.4 6 6.8 6 4 8.5 4 12.4 4 17.6 8.7 21.4 16 28z" />
    </svg>
  );
}
