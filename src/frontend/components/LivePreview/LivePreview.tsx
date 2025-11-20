"use client";

import { useState } from "react";
import type { BuilderLink } from "@/store/listBuilder";
import { ConfirmDialog } from "../ConfirmDialog/ConfirmDialog";
import { LivePreviewLink } from "./LivePreviewLink";

import styles from "./LivePreview.module.css";

interface LivePreviewProps {
  title: string;
  description: string;
  creatorName: string;
  creatorHandle: string;
  links: BuilderLink[];
  onRemoveLink: (id: string) => void;
}

export function LivePreview({
  title,
  description,
  creatorName,
  creatorHandle,
  links,
  onRemoveLink,
}: LivePreviewProps) {
  const [linkToDelete, setLinkToDelete] = useState<BuilderLink | null>(null);
  const displayTitle = title || "List title";
  const firstInitial = creatorName.charAt(0).toUpperCase() || "?";

  const handleRemoveClick = (link: BuilderLink) => {
    setLinkToDelete(link);
  };

  const handleConfirmDelete = () => {
    if (linkToDelete) {
      onRemoveLink(linkToDelete.id);
      setLinkToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setLinkToDelete(null);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Gradient header */}
          <div className={styles.headerGradient} />

          <div className={styles.content}>
            {/* Creator info */}
            {creatorName && (
              <div className={styles.creatorInfo}>
                <div className={styles.avatar}>
                  <span className={styles.avatarInitial}>{firstInitial}</span>
                </div>
                <div className={styles.creatorDetails}>
                  <p className={styles.creatorName}>{creatorName}</p>
                  {creatorHandle && (
                    <p className={styles.creatorHandle}>{creatorHandle}</p>
                  )}
                </div>
              </div>
            )}

            {/* List title and description */}
            <h3 className={styles.listTitle}>{displayTitle}</h3>
            {description && <p className={styles.listDescription}>{description}</p>}

            {/* Links */}
            <div className={styles.linksContainer}>
              {links.length === 0 ? (
                <div className={styles.emptyState}>
                  <p className={styles.emptyMessage}>
                    Links you add will appear here.
                  </p>
                </div>
              ) : (
                links.map((link) => (
                  <LivePreviewLink
                    key={link.id}
                    link={link}
                    onRemove={() => handleRemoveClick(link)}
                  />
                ))
              )}
            </div>

            {/* Copy all button */}
            {links.length > 0 && (
              <div className={styles.footer}>
                <button className={styles.copyButton}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  Copy all
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!linkToDelete}
        title="Delete link?"
        message={`Are you sure you want to delete "${linkToDelete?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}
