export type FormKind = "contact" | "interest" | "funding";

export async function submitForm(
  kind: FormKind,
  data: Record<string, unknown>,
): Promise<void> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      form: kind,
      ...data,
      page: typeof window !== "undefined" ? window.location.pathname : "",
    }),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? `Request failed (${res.status})`);
  }
}
