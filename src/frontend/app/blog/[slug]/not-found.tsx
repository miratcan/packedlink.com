import Link from "next/link";

import styles from "./page.module.css";

export default function BlogPostNotFound() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.article}>
          <p className={styles.kicker}>PackedLink Blog</p>
          <h1 className={styles.title}>Post not found</h1>
          <p style={{ color: "var(--color-text-secondary)" }}>
            The blog post you&apos;re looking for isn&apos;t published. Head back to the blog index.
          </p>
          <Link href="/blog" className={styles.backLink}>
            Return to blog →
          </Link>
        </div>
      </main>
    </div>
  );
}
