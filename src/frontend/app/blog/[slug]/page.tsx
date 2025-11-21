import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";

import { Header } from "@/components/Header/Header";
import { fetchBlogPost, fetchBlogPosts } from "@/lib/api/blog";
import { formatDate } from "@/lib/formatDate";
import styles from "./page.module.css";

type PageProps = {
  params: { slug: string };
};

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

function buildShareUrl(slug: string) {
  return siteUrl ? `${siteUrl}/blog/${slug}` : `/blog/${slug}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const post = await fetchBlogPost(params.slug);
    return {
      title: `${post.title} · PackedLink Blog`,
      description: post.excerpt || post.content.slice(0, 140),
    };
  } catch {
    return {
      title: "PackedLink Blog",
      description: "Curated updates from PackedLink.",
    };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  let post;
  try {
    post = await fetchBlogPost(params.slug);
  } catch (error: any) {
    if (error?.code === 404) {
      notFound();
    }
    throw error;
  }

  let relatedPosts = [];
  try {
    const related = await fetchBlogPosts({ page: 1 });
    relatedPosts = related.items.filter((item) => item.slug !== post.slug).slice(0, 3);
  } catch {
    relatedPosts = [];
  }

  const shareUrl = buildShareUrl(post.slug);
  const tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`;

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <article className={styles.article}>
          <header className={styles.header}>
            <p className={styles.kicker}>PackedLink Blog</p>
            <h1 className={styles.title}>{post.title}</h1>

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

            <div className={styles.shareRow}>
              <span className={styles.shareLabel}>Share</span>
              <div className={styles.shareActions}>
                <a href={tweetUrl} target="_blank" rel="noreferrer" className={styles.shareLink}>
                  Twitter/X
                </a>
                <a href={linkedinUrl} target="_blank" rel="noreferrer" className={styles.shareLink}>
                  LinkedIn
                </a>
              </div>
            </div>
          </header>

          <div className={styles.content}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypePrism]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className={styles.related}>
            <div className={styles.relatedHeading}>
              <h2>More to read</h2>
              <Link href="/blog" className={styles.backLink}>
                View all posts →
              </Link>
            </div>
            <div className={styles.relatedGrid}>
              {relatedPosts.map((item) => (
                <Link key={item.slug} href={`/blog/${item.slug}`} className={styles.relatedCard}>
                  <p className={styles.relatedDate}>{formatDate(item.published_at)}</p>
                  <p className={styles.relatedTitle}>{item.title}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
