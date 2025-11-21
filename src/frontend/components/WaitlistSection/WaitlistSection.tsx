'use client'

import { useState } from "react";

import { Button } from "@/components/Button/Button";
import { SurfaceCard } from "@/components/SurfaceCard/SurfaceCard";
import styles from "./WaitlistSection.module.css";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    // TODO: Connect to waitlist endpoint once available.
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className={styles.section}>
      <SurfaceCard>
        <div className={styles.content}>
          <span className={styles.pill}>Coming soon</span>
          <h2>Get early access</h2>
          <p className={styles.subtitle}>
            Join to get launch updates and curator tools before anyone else.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputRow}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={styles.input}
                required
              />
              <Button variant="primary" context="dark" type="submit">
                Join waitlist
              </Button>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <p className={styles.note}>No spam. We’ll only email you when we launch.</p>
          </form>
        ) : (
          <div className={styles.successState}>
            <span className={styles.successBadge}>You’re in</span>
            <p className={styles.successTitle}>Thanks for joining</p>
            <p className={styles.successDescription}>
              We’ll email <strong>{email}</strong> with early access and launch news.
            </p>
            <Button href="/" variant="ghost" context="dark">
              Back to home
            </Button>
          </div>
        )}
      </SurfaceCard>

      <SurfaceCard tone="muted">
        <h3>What you’ll get</h3>
        <div className={styles.asideList}>
          <div className={styles.bullet}>
            <span className={styles.dot} />
            <span>Early access to curator tools</span>
          </div>
          <div className={styles.bullet}>
            <span className={styles.dot} />
            <span>Launch updates before anyone else</span>
          </div>
          <div className={styles.bullet}>
            <span className={styles.dot} />
            <span>Behind-the-scenes notes on building PackedLink</span>
          </div>
        </div>
      </SurfaceCard>
    </section>
  );
}
