/**
 * Subtle 150ms crossfade on route change, done in CSS so server-rendered HTML
 * paints immediately (no opacity:0 until hydration). Never blocks navigation.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
