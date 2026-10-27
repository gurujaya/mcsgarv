import { Container } from "@/components/primitives/container";
import { CTA } from "@/components/primitives/cta";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="eyebrow">404</p>
      <h1 className="display mt-2 text-[44px] text-ink">
        That page isn’t on the agenda.
      </h1>
      <p className="mt-4 max-w-[60ch] text-ink-muted">
        The link may be old, or the page moved. Try the search (⌘K) or head back home.
      </p>
      <div className="mt-8 flex gap-3">
        <CTA href="/">Back home</CTA>
        <CTA href="/contact" variant="ghost">
          Contact SGA
        </CTA>
      </div>
    </Container>
  );
}
