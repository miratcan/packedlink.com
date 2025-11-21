import clsx from "clsx";
import { PropsWithChildren } from "react";

import styles from "./SurfaceCard.module.css";

type SurfaceCardProps = PropsWithChildren<{
  tone?: "default" | "muted";
  className?: string;
}>;

export function SurfaceCard({ tone = "default", className, children }: SurfaceCardProps) {
  return (
    <div
      className={clsx(styles.card, tone === "muted" && styles.muted, className)}
    >
      {children}
    </div>
  );
}
