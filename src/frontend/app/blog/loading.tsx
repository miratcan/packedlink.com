import styles from "./page.module.css";

const skeletonCards = Array.from({ length: 6 });

export default function BlogLoading() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.skeletonLine} style={{ width: "120px" }} />
            <div className={styles.skeletonLine} style={{ width: "70%", height: "32px" }} />
            <div className={styles.skeletonLine} style={{ width: "90%" }} />
          </div>
          <div className={styles.heroCard}>
            <div className={styles.skeletonLine} style={{ width: "80px" }} />
            <div className={styles.skeletonLine} style={{ width: "60%", height: "28px" }} />
            <div className={styles.skeletonLine} style={{ width: "90%" }} />
          </div>
        </section>

        <section className={styles.postsSection}>
          <div className={styles.grid}>
            {skeletonCards.map((_, idx) => (
              <article key={idx} className={styles.card}>
                <div className={styles.skeletonLine} style={{ width: "50%" }} />
                <div className={styles.skeletonLine} style={{ width: "90%", height: "24px" }} />
                <div className={styles.skeletonLine} style={{ width: "100%" }} />
                <div className={styles.skeletonLine} style={{ width: "40%" }} />
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
