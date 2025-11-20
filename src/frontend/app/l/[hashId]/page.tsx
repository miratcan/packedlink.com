import { notFound } from "next/navigation";

import { fetchMockList } from "@/lib/mockLists";

import styles from "./page.module.css";

interface PageProps {
  params: { hashId: string };
}

export default async function PublicListPage({ params }: PageProps) {
  const list = await fetchMockList(params.hashId);
  if (!list) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.breadcrumb}>Public sayfa</p>
          <h1 className={styles.title}>{list.title}</h1>
          <p className={styles.tagline}>{list.tagline}</p>
          <p className={styles.curator}>Küratör: {list.curator}</p>
        </div>

        <div className={styles.links}>
          {list.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkCard}
            >
              <p className={styles.linkTitle}>{link.title}</p>
              <p className={styles.linkNote}>{link.note}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
