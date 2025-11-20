"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Button } from "@/components/Button/Button";
import PublishSummary from "@/components/PublishSummary/PublishSummary";
import { mockPublishList } from "@/lib/api";
import { selectPublishPayload, useListBuilderStore } from "@/store/listBuilder";

import styles from "./page.module.css";

export default function PublishPage() {
  const router = useRouter();
  const payload = useListBuilderStore(selectPublishPayload);
  const setLastPublish = useListBuilderStore((state) => state.setLastPublish);

  const mutation = useMutation({
    mutationFn: () => mockPublishList(payload),
    onSuccess: (result) => {
      setLastPublish(result);
      router.push("/success");
    },
  });

  const disabled = payload.links.length === 0 || mutation.isPending;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.breadcrumb}>Adım 3 · Publish</p>
          <h1 className={styles.title}>Mock publish ekranı</h1>
        </div>

        <PublishSummary {...payload} />

        <div className={styles.actions}>
          <Button
            variant="primary"
            context="light"
            onClick={() => mutation.mutate()}
            disabled={disabled}
          >
            {mutation.isPending ? "Yayınlanıyor..." : "Yayınla"}
          </Button>

          {mutation.isError && (
            <p className={styles.errorMessage}>
              Mock publish başarısız. Daha sonra tekrar dene.
            </p>
          )}

          <p className={styles.note}>
            Backend endpoint'i hazır olduğunda bu mutation gerçek `/api/lists` çağrısına dönecek. Şimdilik React Query cache bize state sağlıyor.
          </p>
        </div>
      </div>
    </div>
  );
}
