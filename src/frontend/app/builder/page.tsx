"use client";

import { useState } from "react";

import { Button } from "@/components/Button/Button";
import { BuilderHeader } from "@/components/BuilderHeader/BuilderHeader";
import { LivePreview } from "@/components/LivePreview/LivePreview";
import { useListBuilderStore } from "@/store/listBuilder";

import styles from "./page.module.css";

const emptyLink = { title: "", url: "", note: "" };

export default function BuilderPage() {
  const {
    title,
    tagline,
    description,
    creatorName,
    creatorHandle,
    links,
    setMeta,
    addLink,
    removeLink,
  } = useListBuilderStore();

  const [draftLink, setDraftLink] = useState(emptyLink);
  const canPublish = title && links.length > 0;

  const handleAddLink = () => {
    if (!draftLink.title || !draftLink.url) return;
    addLink(draftLink);
    setDraftLink(emptyLink);
  };

  return (
    <div className={styles.page}>
      {/* Sticky header */}
      <BuilderHeader canPublish={!!canPublish} />

      {/* Main content */}
      <main className={styles.main}>
        <div className={styles.grid}>
          {/* Left column - Form */}
          <div className={styles.formColumn}>
            {/* List info card */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>List information</h2>

              <div className={styles.formGroup}>
                <label htmlFor="list-title" className={styles.label}>
                  List title
                </label>
                <input
                  id="list-title"
                  type="text"
                  className={styles.input}
                  value={title}
                  onChange={(e) => setMeta({ title: e.target.value })}
                  placeholder="For example: My Favorite Tech Tools"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="list-description" className={styles.label}>
                  Description (optional)
                </label>
                <textarea
                  id="list-description"
                  className={styles.textarea}
                  rows={3}
                  value={description}
                  onChange={(e) => setMeta({ description: e.target.value })}
                  placeholder="Add a description about this list..."
                />
              </div>

              {/* Creator info */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="creator-name" className={styles.label}>
                    Your name (optional)
                  </label>
                  <input
                    id="creator-name"
                    type="text"
                    className={styles.input}
                    value={creatorName}
                    onChange={(e) => setMeta({ creatorName: e.target.value })}
                    placeholder="For example: Sarah"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="creator-handle" className={styles.label}>
                    Username (optional)
                  </label>
                  <input
                    id="creator-handle"
                    type="text"
                    className={styles.input}
                    value={creatorHandle}
                    onChange={(e) => setMeta({ creatorHandle: e.target.value })}
                    placeholder="@username"
                  />
                </div>
              </div>
            </div>

            {/* Add link card */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Add link</h2>

              <div className={styles.formGroup}>
                <label htmlFor="link-url" className={styles.label}>
                  Link URL
                </label>
                <input
                  id="link-url"
                  type="url"
                  className={styles.input}
                  value={draftLink.url}
                  onChange={(e) => setDraftLink({ ...draftLink, url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="link-title" className={styles.label}>
                  Title
                </label>
                <input
                  id="link-title"
                  type="text"
                  className={styles.input}
                  value={draftLink.title}
                  onChange={(e) => setDraftLink({ ...draftLink, title: e.target.value })}
                  placeholder="Link title"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="link-note" className={styles.label}>
                  Description (optional)
                </label>
                <input
                  id="link-note"
                  type="text"
                  className={styles.input}
                  value={draftLink.note}
                  onChange={(e) => setDraftLink({ ...draftLink, note: e.target.value })}
                  placeholder="A short description about this link"
                />
              </div>

              <Button
                variant="primary"
                context="light"
                onClick={handleAddLink}
                disabled={!draftLink.title || !draftLink.url}
              >
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
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                Add link
              </Button>
            </div>
          </div>

          {/* Right column - Live Preview */}
          <div className={styles.previewColumn}>
            <LivePreview
              title={title}
              description={description}
              creatorName={creatorName}
              creatorHandle={creatorHandle}
              links={links}
              onRemoveLink={removeLink}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
