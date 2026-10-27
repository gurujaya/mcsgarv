import Image from "next/image";
import { cn } from "cn";
import { initials } from "@/content/people";

const sizes = {
  sm: "size-10 text-sm",
  md: "size-12 text-base",
  lg: "size-20 text-2xl",
  xl: "size-28 text-3xl",
} as const;

const px = { sm: 40, md: 48, lg: 80, xl: 112 } as const;

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
        className={cn("shrink-0 rounded-full object-cover", sizes[size], className)}
      />
    );
  }
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-mc-purple/8 font-serif font-semibold text-mc-purple",
        sizes[size],
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
