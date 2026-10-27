import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MeetingVideo } from "./meeting-video";
import { MeetingStatus } from "@/components/layout/meeting-status";
import { site } from "@/content/site";

/** Full-bleed loop of a Monday open meeting, in the Petrarch register. */
export function MeetingBand() {
  return (
    <section className="relative isolate flex min-h-[86svh] items-end overflow-hidden bg-ink text-white">
      <MeetingVideo
        src="/video/open-meeting.mp4"
        poster="/images/open-meeting.jpg"
        alt="Students seated around tables at a Monday open meeting in the Student Life room"
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,17,28,0.25)_0%,rgba(22,17,28,0.35)_45%,rgba(22,17,28,0.88)_100%)]" />
      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-6 pt-40 pb-14 md:flex-row md:items-end md:justify-between md:px-10 md:pb-20">
        <div>
          <p className="font-mono text-[11px] tracking-[0.14em] text-white/70 uppercase">
            Open meetings · {site.meeting.day}s {site.meeting.time} · {site.office.room}
          </p>
          <h2 className="serif-display mt-5 max-w-[14ch] text-[44px] text-white md:text-[84px]">
            Every Monday at four. Everyone’s invited.
          </h2>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <p className="max-w-[38ch] text-[15px] leading-[1.55] text-white/75 md:text-right">
            Hear what senators are working on, speak during open floor, and see how
            decisions get made. No sign-up. Walk in, sit anywhere, leave when you need to.
          </p>
          <MeetingStatus className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-white/80 uppercase hover:text-white md:justify-end" />
          <div className="flex gap-3">
            <Link
              href="/events?type=meeting"
              className="mono-button bg-white text-ink hover:bg-white/90"
            >
              Upcoming meetings <ArrowRight className="size-3.5" aria-hidden />
            </Link>
            <Link
              href="/get-involved"
              className="mono-button border border-white/30 text-white hover:border-white/70"
            >
              Get involved
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
