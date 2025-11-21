import clsx from "clsx";
import styles from "../page.module.css";

export function ValueProps() {
  return (
    <section id="why" className={styles.valueSection}>
      <div className={clsx(styles.valueContainer, styles.contentWidth)}>
        <div className={styles.valueSectionHeader}>
          <h2 className={styles.valueSectionTitle}>Why PackedLink?</h2>
          <p className={styles.valueSectionSubtitle}>
            The simplest way to share links. One address, endless possibilities.
          </p>
        </div>

        <div className={styles.valueGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Pack your links together.</h3>
            <p className={styles.featureDescription}>
              YouTube courses, coffee shops, favorite brands, Figma files, GitHub repos. Pack everything on one page, add notes to each link.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Share one address.</h3>
            <p className={styles.featureDescription}>
              Put it in Instagram bio, add to YouTube description, share in WhatsApp group. Everyone clicks one link, sees all lists. Updates automatically reflect to everyone.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Always find in the same place.</h3>
            <p className={styles.featureDescription}>
              Don't search in WhatsApp chat, phone notes, or Excel. Open the page, find the link, copy. Everything in one place, always updated, never lost.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
