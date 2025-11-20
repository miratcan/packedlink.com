import type { BuilderLink } from "@/store/listBuilder";
import styles from "./LivePreviewLink.module.css";

interface LivePreviewLinkProps {
  link: BuilderLink;
  onRemove: (id: string) => void;
}

export function LivePreviewLink({ link, onRemove }: LivePreviewLinkProps) {
  return (
    <div className={styles.linkItem}>
      <div className={styles.accentBar} />
      <div className={styles.linkContent}>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkTitle}
        >
          {link.title}
        </a>
        {link.note && <p className={styles.linkNote}>{link.note}</p>}
      </div>
      <button
        onClick={() => onRemove(link.id)}
        className={styles.deleteButton}
        aria-label={`${link.title} linkini sil`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          role="img"
          aria-hidden="true"
        >
          <title>Sil</title>
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </button>
    </div>
  );
}
