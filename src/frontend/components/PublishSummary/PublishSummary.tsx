import type { BuilderLink } from "@/store/listBuilder";
import styles from "./PublishSummary.module.css";

interface Props {
  title: string;
  tagline: string;
  description: string;
  creatorName: string;
  creatorHandle: string;
  links: BuilderLink[];
}

export default function PublishSummary({ title, tagline, description, creatorName, creatorHandle, links }: Props) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title || "Adsız liste"}</h2>
      <p className={styles.tagline}>{tagline || "Kısa açıklama"}</p>
      <p className={styles.description}>{description || "Notlarını burada paylaş."}</p>

      {(creatorName || creatorHandle) && (
        <div className={styles.creatorInfo}>
          <p className={styles.creatorLabel}>Oluşturan:</p>
          <p className={styles.creatorName}>{creatorName}</p>
          {creatorHandle && <p className={styles.creatorHandle}>{creatorHandle}</p>}
        </div>
      )}

      <div className={styles.links}>
        {links.map((link) => (
          <div key={link.id} className={styles.linkItem}>
            <div className={styles.accentBar} />
            <div className={styles.linkContent}>
              <a href={link.url} className={styles.linkTitle}>
                {link.title}
              </a>
              {link.note && <p className={styles.linkNote}>{link.note}</p>}
            </div>
          </div>
        ))}
        {links.length === 0 && (
          <p className={styles.emptyState}>
            Henüz link eklemedin. Backend hazır olana kadar mock listelerle oynayabilirsin.
          </p>
        )}
      </div>
    </section>
  );
}
