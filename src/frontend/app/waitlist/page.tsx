'use client'

import { useState } from 'react'
import { Header } from '@/components/Header/Header'
import { Button } from '@/components/Button/Button'
import styles from './page.module.css'

export default function WaitlistPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Basic email validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    // TODO: Connect to waitlist endpoint once available.
    setSubmitted(true)
  }

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.card}>
            <span className={styles.pill}>Coming soon</span>
            <p className={styles.eyebrow}>PackedLink waitlist</p>
            <h1 className={styles.title}>We’re building the easiest way to share curated links.</h1>
            <p className={styles.description}>
              Join to get early access, launch updates, and creator tools before they ship.
            </p>

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
                <h2 className={styles.successTitle}>Thanks for joining</h2>
                <p className={styles.successDescription}>
                  We’ll email <strong>{email}</strong> with early access and launch news.
                </p>
                <Button href="/" variant="ghost" context="dark">
                  Back to home
                </Button>
              </div>
            )}
          </div>

          <div className={styles.aside}>
            <h2 className={styles.asideTitle}>What you’ll get</h2>
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
          </div>
        </section>
      </main>
    </div>
  )
}
