import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

/** Full-bleed photo with a dark wash and a serif line, like Solva's hero. */
export function PhotoBand() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-end overflow-hidden bg-ink text-white">
      <Image
        src="/images/sga-group-wide.jpg"
        alt="Rockville SGA senators and officers gathered on a staircase before an advocacy event"
        fill
        sizes="100vw"
        className="object-cover object-[50%_30%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,11,20,0.15)_0%,rgba(15,11,20,0.35)_50%,rgba(15,11,20,0.85)_100%)]" />
      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-6 pt-40 pb-14 md:flex-row md:items-end md:justify-between md:px-10 md:pb-20">
        <div>
          <p className="font-mono text-[11px] tracking-[0.14em] text-white/70 uppercase">
            Get involved
          </p>
          <h2 className="serif-display mt-5 max-w-[14ch] text-[44px] text-white md:text-[80px]">
            Campus gets better when more people show up.
          </h2>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <p className="max-w-[36ch] text-[15px] leading-[1.55] text-white/75 md:text-right">
            Run for Senator-at-Large, join the Student Activities Board, or sit on an open
            committee. Or just come to a Monday meeting, {site.meeting.time}.
          </p>
          <div className="flex gap-3">
            <Link
              href="/get-involved"
              className="mono-button bg-white text-ink hover:bg-white/90"
            >
              Three ways in
            </Link>
            <Link
              href="/senators"
              className="mono-button border border-white/30 text-white hover:border-white/70"
            >
              Meet the team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
