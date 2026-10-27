"use client";

import { MotionConfig } from "motion/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <NuqsAdapter>
        <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
      </NuqsAdapter>
    </MotionConfig>
  );
}
