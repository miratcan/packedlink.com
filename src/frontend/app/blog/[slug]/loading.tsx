import styles from "./page.module.css";

export default function BlogPostLoading() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <article className={styles.article}>
          <div className="skeleton-line" style={{ width: "120px" }} />
          <div className="skeleton-line" style={{ width: "70%", height: "32px" }} />
          <div className="skeleton-line" style={{ width: "40%" }} />
          <div className="skeleton-line" style={{ width: "100%", height: "200px" }} />
        </article>
      </main>
    </div>
  );
}
