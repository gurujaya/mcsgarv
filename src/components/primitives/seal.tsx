import { cn } from "cn";

/**
 * The MC Rockville SGA seal.
 *
 * TODO: replace with official seal. Drop the real SVG at
 * `public/brand/sga-seal.svg`, then change `USE_PLACEHOLDER` to false. Until
 * then <SealPlaceholder/> draws a purple circle with three torches and "SGA".
 */
const USE_PLACEHOLDER = true;

export function Seal({ className, size = 40 }: { className?: string; size?: number }) {
  if (USE_PLACEHOLDER) return <SealPlaceholder className={className} size={size} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static SVG, no optimization needed
    <img
      src="/brand/sga-seal.svg"
      alt="Montgomery College Rockville SGA seal"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
    />
  );
}

export function SealPlaceholder({
  className,
  size = 40,
  title = "Montgomery College Rockville SGA seal",
}: {
  className?: string;
  size?: number;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      className={cn("shrink-0", className)}
    >
      <circle cx="50" cy="50" r="48" fill="var(--color-mc-purple)" />
      <circle
        cx="50"
        cy="50"
        r="42"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      {/* three torches */}
      {[32, 50, 68].map((x, i) => (
        <g key={x} transform={`translate(${x} ${i === 1 ? 22 : 28})`}>
          <path
            d="M0 -6 C 4 -2, 4 4, 0 8 C -4 4, -4 -2, 0 -6 Z"
            fill="var(--color-mc-orange)"
          />
          <rect
            x="-1.6"
            y="8"
            width="3.2"
            height="14"
            rx="1"
            fill="#fff"
            fillOpacity="0.9"
          />
        </g>
      ))}
      <text
        x="50"
        y="76"
        textAnchor="middle"
        fontFamily="var(--font-sans), system-ui, sans-serif"
        fontWeight="600"
        fontSize="26"
        fill="#fff"
      >
        SGA
      </text>
    </svg>
  );
}
