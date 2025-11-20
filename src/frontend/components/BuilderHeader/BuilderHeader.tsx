import Link from "next/link";

import { Button } from "../Button/Button";
import styles from "./BuilderHeader.module.css";

interface BuilderHeaderProps {
  canPublish: boolean;
  onPublish?: () => void;
}

export function BuilderHeader({ canPublish, onPublish }: BuilderHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.nav}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon} />
            <span className={styles.logoText}>PackedLink</span>
          </Link>

          <Button
            variant="primary"
            context="light"
            href={canPublish ? "/publish" : undefined}
            disabled={!canPublish}
            onClick={onPublish}
          >
            Publish
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
}
