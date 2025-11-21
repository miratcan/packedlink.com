import clsx from "clsx";

import { Button } from "@/components/Button/Button";
import styles from "../page.module.css";

export function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={clsx(styles.heroContainer, styles.contentWidth)}>
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Pack your links. Share anywhere.</h1>

            <p className={styles.heroSubtitle}>
              YouTube courses, coffee shops, jewelry products. Pack your frequently used links in one place. Share in bio, keep it always updated.
            </p>

            <div className={styles.heroCta}>
              <Button href="/#waitlist" size="large" variant="primary" context="dark">
                Join waitlist
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Button>
              <Button href="#why" variant="ghost" context="dark">
                Learn more
              </Button>
            </div>

            <p className={styles.heroTrustText}>
              Join the waitlist for early access. Be the first to know when we launch.
            </p>
          </div>

          <div className={styles.heroExampleWrapper}>
            <div className={styles.heroExampleCard}>
              <div className={styles.exampleProfile}>
                <div className={styles.exampleAvatar}>
                  <span className={styles.exampleAvatarText}>S</span>
                </div>
                <div>
                  <p className={styles.exampleProfileName}>Sarah</p>
                  <p className={styles.exampleProfileHandle}>@sarah_creates</p>
                </div>
              </div>

              <h3 className={styles.exampleCardTitle}>My Favorite Tech Tools</h3>
              <p className={styles.exampleCardDesc}>
                The tools I use daily for productivity and creativity.
              </p>

              <div className={styles.exampleLinks}>
                <div className={styles.exampleLink}>
                  <div className={styles.exampleLinkBar}></div>
                  <div className={styles.exampleLinkContent}>
                    <p className={styles.exampleLinkTitle}>Notion - All-in-one workspace</p>
                    <p className={styles.exampleLinkSubtitle}>Where I organize everything</p>
                  </div>
                </div>
                <div className={styles.exampleLink}>
                  <div className={styles.exampleLinkBar}></div>
                  <div className={styles.exampleLinkContent}>
                    <p className={styles.exampleLinkTitle}>Figma - Design collaboration</p>
                    <p className={styles.exampleLinkSubtitle}>Best tool for UI design</p>
                  </div>
                </div>
                <div className={styles.exampleLink}>
                  <div className={styles.exampleLinkBar}></div>
                  <div className={styles.exampleLinkContent}>
                    <p className={styles.exampleLinkTitle}>Linear - Project management</p>
                    <p className={styles.exampleLinkSubtitle}>Clean and fast</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.heroBlob1}></div>
      <div className={styles.heroBlob2}></div>
    </section>
  );
}
