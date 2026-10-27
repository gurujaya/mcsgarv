import Image from "next/image";
import { cn } from "cn";
import { initials } from "@/content/people";

const sizes = {
  sm: "size-9 text-[12px]",
  md: "size-10 text-[13px]",
  lg: "size-16 text-lg",
  xl: "size-24 text-2xl",
} as const;

const px = { sm: 36, md: 40, lg: 64, xl: 96 } as const;

export function Avatar({
  name,
  photo,
  size = "md",
  className,
}: {
  name: string;
  photo?: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  if (photo) {
    return (
      <Image
        src={photo}
        alt={name}
        width={px[size]}
        height={px[size]}
        sizes={`${px[size]}px`}
        className={cn(
          "shrink-0 rounded-full border border-line object-cover",
          sizes[size],
          className,
        )}
      />
    );
  }
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border border-line bg-surface font-mono font-medium tracking-[0.04em] text-ink-muted",
        sizes[size],
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
