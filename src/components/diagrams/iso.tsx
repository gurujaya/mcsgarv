/**
 * Isometric wireframe figures in the Linear.app register: hairline strokes,
 * paper-filled faces that occlude back edges, dotted guide lines, mono labels.
 * Pure SVG, no runtime cost. Coordinates are in "units"; the projection is a
 * standard 30° isometric.
 */
import { cn } from "cn";

const C = Math.cos(Math.PI / 6);
const S = Math.sin(Math.PI / 6);

export function pt(x: number, y: number, z: number): [number, number] {
  return [(x - y) * C, (x + y) * S - z];
}

const poly = (pts: [number, number][]) =>
  pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");

export type BoxProps = {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
  /** "ink" tints the box purple; "ghost" draws outline only. */
  tone?: "paper" | "ink" | "ghost";
  dots?: boolean;
};

/** A box with top, +x and +y faces. Fill occludes whatever is behind it. */
export function Box({ x, y, z, w, d, h, tone = "paper", dots }: BoxProps) {
  const top = [
    pt(x, y, z + h),
    pt(x + w, y, z + h),
    pt(x + w, y + d, z + h),
    pt(x, y + d, z + h),
  ];
  const right = [
    pt(x + w, y, z),
    pt(x + w, y + d, z),
    pt(x + w, y + d, z + h),
    pt(x + w, y, z + h),
  ];
  const front = [
    pt(x, y + d, z),
    pt(x + w, y + d, z),
    pt(x + w, y + d, z + h),
    pt(x, y + d, z + h),
  ];
  const fills =
    tone === "ink"
      ? {
          top: "var(--iso-ink-top)",
          right: "var(--iso-ink-right)",
          front: "var(--iso-ink-front)",
        }
      : tone === "ghost"
        ? { top: "none", right: "none", front: "none" }
        : { top: "var(--iso-top)", right: "var(--iso-right)", front: "var(--iso-front)" };
  const stroke = tone === "ink" ? "var(--iso-stroke-ink)" : "var(--iso-stroke)";
  return (
    <g
      stroke={stroke}
      strokeWidth="1"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    >
      <polygon points={poly(front)} fill={fills.front} />
      <polygon points={poly(right)} fill={fills.right} />
      <polygon points={poly(top)} fill={fills.top} />
      {dots ? <TopDots x={x} y={y} z={z + h} w={w} d={d} /> : null}
    </g>
  );
}

function TopDots({
  x,
  y,
  z,
  w,
  d,
}: {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
}) {
  const out: React.ReactNode[] = [];
  const n = 3;
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      const [px, py] = pt(x + (w * (i + 0.5)) / n, y + (d * (j + 0.5)) / n, z);
      out.push(
        <circle
          key={`${i}-${j}`}
          cx={px}
          cy={py}
          r="0.55"
          fill="var(--iso-stroke)"
          stroke="none"
        />,
      );
    }
  return <>{out}</>;
}

/** Dotted vertical guide from (x,y,z0) to (x,y,z1). */
export function Guide({
  x,
  y,
  z0,
  z1,
}: {
  x: number;
  y: number;
  z0: number;
  z1: number;
}) {
  const [x0, y0] = pt(x, y, z0);
  const [x1, y1] = pt(x, y, z1);
  return (
    <line
      x1={x0}
      y1={y0}
      x2={x1}
      y2={y1}
      stroke="var(--iso-guide)"
      strokeWidth="1"
      strokeDasharray="1 2.4"
    />
  );
}

/** Dashed connector between two world points with an arrowhead at the end. */
export function Link({
  from,
  to,
  arrow = true,
}: {
  from: [number, number, number];
  to: [number, number, number];
  arrow?: boolean;
}) {
  const [x0, y0] = pt(...from);
  const [x1, y1] = pt(...to);
  const ang = Math.atan2(y1 - y0, x1 - x0);
  const ah = 2.2;
  const a1: [number, number] = [
    x1 - ah * Math.cos(ang - 0.5),
    y1 - ah * Math.sin(ang - 0.5),
  ];
  const a2: [number, number] = [
    x1 - ah * Math.cos(ang + 0.5),
    y1 - ah * Math.sin(ang + 0.5),
  ];
  return (
    <g stroke="var(--iso-stroke)" strokeWidth="1" fill="none">
      <line
        x1={x0}
        y1={y0}
        x2={x1}
        y2={y1}
        strokeDasharray="1.2 1.4"
        vectorEffect="non-scaling-stroke"
      />
      {arrow ? (
        <polyline points={poly([a1, [x1, y1], a2])} vectorEffect="non-scaling-stroke" />
      ) : null}
    </g>
  );
}

/** Flat ellipse on the ground/top plane, e.g. a round table or a coin. */
export function Disc({
  x,
  y,
  z,
  r,
  tone = "paper",
}: {
  x: number;
  y: number;
  z: number;
  r: number;
  tone?: "paper" | "ink";
}) {
  const [cx, cy] = pt(x, y, z);
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={r * C * 1.155}
      ry={r * S * 1.155}
      fill={tone === "ink" ? "var(--iso-ink-top)" : "var(--iso-top)"}
      stroke={tone === "ink" ? "var(--iso-stroke-ink)" : "var(--iso-stroke)"}
      strokeWidth="1"
      vectorEffect="non-scaling-stroke"
    />
  );
}

/** SVG frame with the iso color tokens. `box` is the viewBox; figures are drawn around origin. */
export function IsoCanvas({
  box = "-22 -20 44 40",
  className,
  children,
  title,
}: {
  box?: string;
  className?: string;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <svg viewBox={box} role="img" aria-label={title} className={cn("iso", className)}>
      <title>{title}</title>
      {children}
    </svg>
  );
}
