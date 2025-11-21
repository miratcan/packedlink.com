import clsx from "clsx";
import styles from "../page.module.css";

export function Trust() {
  return (
    <section className={styles.trustSection}>
      <div className={clsx(styles.trustContainer, styles.contentWidth)}>
        <div className={styles.trustGrid}>
          <TrustItem
            title="Doesn't put you in a tracking trap"
            description={"Doesn't get into tricks like \"Let's convert your followers to email list, add pixels.\""}
            icon={
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            }
          />
          <TrustItem
            title="Doesn't sell or rent your data"
            description="Doesn't use your links for ad targeting. Your lists are yours, we just store them."
            icon={
              <>
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
              </>
            }
          />
          <TrustItem
            title="You leave when you want"
            description="Export your lists, close your account. We don't leave data behind."
            icon={
              <>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}

type TrustItemProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

function TrustItem({ title, description, icon }: TrustItemProps) {
  return (
    <div className={styles.trustItem}>
      <div className={styles.trustItemHeader}>
        <div className={styles.trustIconWrapper}>
          <svg className={styles.trustIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {icon}
          </svg>
        </div>
        <h3 className={styles.trustTitle}>{title}</h3>
      </div>
      <p className={styles.trustDescription}>{description}</p>
    </div>
  );
}
