import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.fullName}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <OgCard
      title={site.tagline}
      subtitle="Montgomery College · Rockville Campus · Student Government Association"
    />,
    size,
  );
}

/** Shared OG layout. Also used by nested opengraph-image routes. */
export function OgCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "linear-gradient(135deg, #FAF9FC 0%, #F1EEF6 100%)",
        color: "#1A1523",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 9999,
            background: "#51237F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          SGA
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, fontWeight: 700 }}>SGA Rockville</div>
          <div
            style={{
              fontSize: 20,
              color: "#666666",
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
          >
            Montgomery College
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            fontSize: 72,
            lineHeight: 1.05,
            fontWeight: 700,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#666666",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          {subtitle}
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {["#51237F", "#6E4D94", "#FF5E3A", "#0E8AD9", "#28A689"].map((c) => (
          <div
            key={c}
            style={{ width: 56, height: 8, borderRadius: 9999, background: c }}
          />
        ))}
      </div>
    </div>
  );
}
