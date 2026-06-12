"use client";

import { MotionConfig, useReducedMotion } from "motion/react";
import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  const content = <MotionConfig reducedMotion="user">{children}</MotionConfig>;

  if (reducedMotion) return content;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.15 }}>
      {content}
    </ReactLenis>
  );
}
