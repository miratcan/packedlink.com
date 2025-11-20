"use client";

import { Button } from "@/components/Button/Button";
import { useListBuilderStore } from "@/store/listBuilder";

import styles from "./page.module.css";

export default function SuccessPage() {
  const lastPublish = useListBuilderStore((state) => state.lastPublish);
  const reset = useListBuilderStore((state) => state.reset);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.breadcrumb}>Adım 4 · Success</p>
          <h1 className={styles.title}>Liste yayınlandı</h1>
        </div>

        {!lastPublish && (
          <p className={styles.message}>
            Henüz mock publish gerçekleştirmedin. Önce builder'da link ekle ve publish et.
          </p>
        )}

        {lastPublish && (
          <div className={styles.results}>
            <div className={styles.resultItem}>
              <p className={styles.resultLabel}>Public URL</p>
              <code className={styles.resultValue}>{lastPublish.publicUrl}</code>
            </div>
            <div className={styles.resultItem}>
              <p className={styles.resultLabel}>Yönetim URL'i</p>
              <code className={styles.resultValue}>{lastPublish.manageUrl}</code>
            </div>
            <div className={styles.expireDate}>
              Expire tarihi: {new Date(lastPublish.expiresAt).toLocaleDateString("tr-TR")}
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <Button variant="primary" context="light" href="/builder">
            Builder'a dön
          </Button>
          <Button variant="ghost" context="light" onClick={() => reset()}>
            Yeni mock liste
          </Button>
        </div>
      </div>
    </div>
  );
}
