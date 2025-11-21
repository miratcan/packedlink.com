import Link from "next/link";

import { Header } from "@/components/Header/Header";
import { Button } from "@/components/Button/Button";
import { fetchBlogPosts } from "@/lib/api/blog";
import { formatDate } from "@/lib/formatDate";
import styles from "./page.module.css";

type BlogIndexProps = {
  searchParams?: { page?: string };
};

export default async function BlogIndexPage({ searchParams }: BlogIndexProps) {
  const currentPage = Math.max(parseInt(searchParams?.page ?? "1", 10) || 1, 1);

  let data;
  try {
    data = await fetchBlogPosts({ page: currentPage });
  } catch (error) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <section className={styles.hero}>
            <p className={styles.kicker}>PackedLink Blog</p>
            <h1 className={styles.title}>Stories failed to load</h1>
            <p className={styles.subtitle}>
              We couldn&apos;t reach the blog API right now. Please refresh or try again later.
            </p>
          </section>
        </main>
      </div>
    );
  }

  const { items: posts, pages } = data;
  const totalPages = Math.max(pages || Math.ceil((data.count || posts.length) / 10) || 1, 1);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Curated notes on link-first publishing.</h1>
            <p className={styles.subtitle}>
              Product decisions, launch experiments, and the craft of keeping curated lists useful.
            </p>
            <div className={styles.heroActions}>
              <Button href="/waitlist" size="large" variant="primary" context="dark">
                Join waitlist
              </Button>
              <Link href="#posts" className={styles.subtleLink}>
                Skip to posts ↓
              </Link>
            </div>
          </div>
          <div className={styles.heroCard}>
            <p className={styles.heroCardText}>
              We design for curators. Expect transparent updates, lessons learned, and practical link
              playbooks.
            </p>
          </div>
        </section>

        <section id="posts" className={styles.postsSection}>
          {posts.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No published posts yet. Come back soon.</p>
            </div>
          ) : (
            <>
              <div className={styles.grid}>
                {posts.map((post) => (
                  <article key={post.slug} className={styles.card}>
                    <div className={styles.metaRow}>
                      <span className={styles.date}>{formatDate(post.published_at)}</span>
                      {post.tags.length > 0 && (
                        <div className={styles.tags}>
                          {post.tags.map((tag) => (
                            <span key={tag.slug} className={styles.tag}>
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
                      <h3 className={styles.cardTitle}>{post.title}</h3>
                    </Link>

                    <p className={styles.excerpt}>
                      {post.excerpt || post.content.slice(0, 180).concat("...")}
                    </p>

                    <div className={styles.cardFooter}>
                      <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                        Read post →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              <div className={styles.pagination}>
                <Button href={hasPrev ? `/blog?page=${currentPage - 1}` : undefined} variant="ghost" context="dark" disabled={!hasPrev}>
                  ← Newer
                </Button>
                <span className={styles.pageIndicator}>
                  Page {currentPage} of {totalPages}
                </span>
                <Button href={hasNext ? `/blog?page=${currentPage + 1}` : undefined} variant="ghost" context="dark" disabled={!hasNext}>
                  Older →
                </Button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
