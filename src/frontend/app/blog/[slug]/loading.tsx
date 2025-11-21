import styles from "./page.module.css";

export default function BlogPostLoading() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <article className={styles.article}>
          <div className={styles.skeletonLine} style={{ width: "120px" }} />
          <div className={styles.skeletonLine} style={{ width: "70%", height: "32px" }} />
          <div className={styles.skeletonLine} style={{ width: "40%" }} />
          <div className={styles.skeletonLine} style={{ width: "100%", height: "200px" }} />
        </article>
      </main>
    </div>
  );
}
