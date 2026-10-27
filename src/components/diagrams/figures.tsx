import { Box, Disc, Guide, IsoCanvas, Link, pt } from "./iso";

/** Fig 02.1 · Represent: a table with eight seats, one of them elected. */
export function RepresentFig({ className }: { className?: string }) {
  const seats: [number, number][] = [
    [-7, -2],
    [-7, 2],
    [-2, -7],
    [2, -7],
    [7, -2],
    [7, 2],
    [-2, 7],
    [2, 7],
  ];
  const sorted = [...seats].sort((a, b) => a[0] + a[1] - (b[0] + b[1]));
  return (
    <IsoCanvas
      title="A round table with eight seats; one seat, the elected one, is highlighted"
      className={className}
    >
      {/* floor guide */}
      <Disc x={0} y={0} z={-6} r={11} />
      {/* table */}
      <Guide x={0} y={0} z0={-6} z1={-1} />
      <Box x={-1} y={-1} z={-6} w={2} d={2} h={5} />
      <Disc x={0} y={0} z={0} r={6.5} />
      {sorted.map(([sx, sy], i) => (
        <Box
          key={i}
          x={sx - 1.1}
          y={sy - 1.1}
          z={-6}
          w={2.2}
          d={2.2}
          h={2.2}
          tone={sx === 7 && sy === 2 ? "ink" : "paper"}
        />
      ))}
    </IsoCanvas>
  );
}

/** Fig 02.2 · Fund: the fee, stacked and passed down, with the panel's layer marked. */
export function FundFig({ className }: { className?: string }) {
  const layers = [-9, -5.2, -1.4, 2.4];
  return (
    <IsoCanvas
      title="Four stacked slabs with dotted guides; the third slab, the Budget Panel, is highlighted; a coin sits on top"
      className={className}
    >
      {[-5, 5].map((gx) =>
        [-5, 5].map((gy) => (
          <Guide key={`${gx}${gy}`} x={gx} y={gy} z0={layers[0]} z1={layers[3] + 3.5} />
        )),
      )}
      {layers.map((z, i) => (
        <Box
          key={z}
          x={-5}
          y={-5}
          z={z}
          w={10}
          d={10}
          h={1.6}
          tone={i === 2 ? "ink" : "paper"}
        />
      ))}
      <Disc x={0} y={0} z={layers[3] + 1.6} r={3.2} />
      <Disc x={0} y={0} z={layers[3] + 2.4} r={3.2} />
      <Box x={-3.2} y={-0.2} z={layers[3] + 1.6} w={6.4} d={0.4} h={0.8} tone="ghost" />
    </IsoCanvas>
  );
}

/** Fig 02.3 · Listen: many inputs converging on one body. */
export function ListenFig({ className }: { className?: string }) {
  const inputs: [number, number, number][] = [
    [-9, -3, 2.4],
    [-5, -9, 3.2],
    [3, -10, 1.8],
    [-9, 4, 1.6],
    [8, -4, 2.8],
  ];
  const sorted = [...inputs].sort((a, b) => a[0] + a[1] - (b[0] + b[1]));
  return (
    <IsoCanvas
      title="Five small blocks connected by dashed lines to one tall central block"
      className={className}
    >
      {sorted.map(([x, y, h], i) => (
        <g key={i}>
          <Box x={x - 1.4} y={y - 1.4} z={-6} w={2.8} d={2.8} h={h} dots />
          <Link
            from={[x, y, -6 + h]}
            to={[Math.sign(x) * 2.3 || 0.1, Math.sign(y) * 2.3 || 0.1, 1]}
          />
        </g>
      ))}
      <Box x={-2.6} y={-2.6} z={-6} w={5.2} d={5.2} h={9} tone="ink" />
    </IsoCanvas>
  );
}

/** Fig 02.4 · Build: a rising stage, bar by bar. */
export function BuildFig({ className }: { className?: string }) {
  const bars = Array.from({ length: 7 }, (_, i) => i);
  return (
    <IsoCanvas
      title="Seven bars rising in steps toward the right, the tallest highlighted"
      className={className}
    >
      {bars.map((i) => (
        <Box
          key={i}
          x={-9 + i * 2.6}
          y={-4 + i * 0.6}
          z={-7}
          w={2.1}
          d={7 - i * 0.6}
          h={2 + i * 1.9}
          tone={i === bars.length - 1 ? "ink" : "paper"}
        />
      ))}
      <Guide x={-9} y={-4} z0={-7} z1={8} />
      <Guide x={-9 + 6 * 2.6 + 2.1} y={-4 + 6 * 0.6} z0={-7} z1={8} />
    </IsoCanvas>
  );
}

/** Fig 03 · The conduit: a concern loops out through six stations and back. */
export function ConduitFig({ className }: { className?: string }) {
  const r = 13;
  const stations = Array.from({ length: 6 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI * 2) / 6;
    return { x: Math.cos(a) * r, y: Math.sin(a) * r, i };
  });
  const sorted = [...stations].sort((a, b) => a.x + a.y - (b.x + b.y));
  return (
    <IsoCanvas
      box="-38 -26 76 56"
      title="Six numbered blocks on a loop joined by dashed arrows, showing a concern travelling from a student through SGA to College leadership and back"
      className={className}
    >
      <Disc x={0} y={0} z={-4} r={r + 2.5} />
      {stations.map((s, i) => {
        const n = stations[(i + 1) % 6];
        const lift = (p: typeof s) =>
          [p.x * 0.78, p.y * 0.78, -1] as [number, number, number];
        return <Link key={`l${i}`} from={lift(s)} to={lift(n)} />;
      })}
      {sorted.map((s) => (
        <Box
          key={s.i}
          x={s.x - 1.6}
          y={s.y - 1.6}
          z={-4}
          w={3.2}
          d={3.2}
          h={s.i === 0 ? 2.2 : s.i === 3 ? 4.6 : 3}
          tone={s.i === 3 ? "ink" : s.i === 0 ? "ghost" : "paper"}
        />
      ))}
      {stations.map((s) => {
        const [lx, ly] = pt(s.x * 1.42, s.y * 1.42, -4);
        return (
          <text
            key={`t${s.i}`}
            x={lx}
            y={ly + 1}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="2.6"
            fill="var(--color-ink-muted)"
          >
            0{s.i + 1}
          </text>
        );
      })}
    </IsoCanvas>
  );
}

/** Fig 05 · Governance: five exploded layers; authority flows up from the bottom. */
export function GovernanceFig({ className }: { className?: string }) {
  const z = [-12, -7, -2, 3, 8];
  return (
    <IsoCanvas
      box="-30 -22 60 46"
      title="Five stacked slabs exploded vertically with dotted guides; the middle slab, SGA, is highlighted; an arrow rises from the bottom slab"
      className={className}
    >
      {[-6, 6].map((gx) =>
        [-6, 6].map((gy) => (
          <Guide key={`${gx}${gy}`} x={gx} y={gy} z0={z[0]} z1={z[4] + 1.4} />
        )),
      )}
      {z.map((zz, i) => (
        <Box
          key={zz}
          x={-6}
          y={-6}
          z={zz}
          w={12}
          d={12}
          h={1.4}
          tone={i === 2 ? "ink" : "paper"}
          dots={i === 4}
        />
      ))}
      <Link from={[9.5, 9.5, z[0]]} to={[9.5, 9.5, z[4] + 1.4]} />
    </IsoCanvas>
  );
}
