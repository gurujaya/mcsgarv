import {
  Wallet,
  HandHeart,
  Scale,
  Utensils,
  Megaphone,
  PartyPopper,
  Briefcase,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import type { Committee } from "@/content/types";
import { IconTile } from "@/components/directory/directory-row";

/** Icon per committee slug. Falls back to Landmark for new committees. */
export const committeeIcons: Record<string, LucideIcon> = {
  "budget-panel": Wallet,
  "community-service": HandHeart,
  ethics: Scale,
  food: Utensils,
  "public-outreach": Megaphone,
  sab: PartyPopper,
  wdce: Briefcase,
};

export function CommitteeIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = committeeIcons[slug] ?? Landmark;
  return <Icon className={className} aria-hidden />;
}

export function CommitteeTile({
  committee,
  className,
}: {
  committee: Committee;
  className?: string;
}) {
  return (
    <IconTile tone={committee.color} className={className}>
      <CommitteeIcon slug={committee.slug} />
    </IconTile>
  );
}
