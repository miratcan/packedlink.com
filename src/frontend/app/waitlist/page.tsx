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

    // For now, just store in localStorage - you'll replace this with API call later
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Django forms expect this content type
        },
        body: new URLSearchParams({
          'curator_email': email,
          'title': 'New List', // Default value
          'description': 'Created from waitlist', // Default value
          'curator_name': 'Waitlist User', // Default value
        }).toString(),
      });

      if (!response.ok) {
        throw new Error('Failed to join waitlist.');
      }

      // Backend redirects to builder page on success, we need to handle this
      // For now, we'll just show success state. In a full integration,
      // you might redirect the user to the builder page with the manage_token
      // if the frontend was also intended to immediately handle the new list.
      // Given the description, just saving the email is sufficient for the waitlist.

      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  }

  return (
    <div className={styles.waitlistPage}>
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.container}>
          {!submitted ? (
            <>
              <div className={styles.badge}>Coming Soon</div>

              <h1 className={styles.title}>
                We're building something special
              </h1>

              <p className={styles.description}>
                PackedLink is launching soon. Join the waitlist to be the first to know when we go live. You'll get early access and exclusive features.
              </p>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputWrapper}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className={styles.input}
                    required
                  />
                  <Button
                    variant="primary"
                    context="dark"
                    type="submit"
                  >
                    Join waitlist
                  </Button>
                </div>
                {error && <p className={styles.error}>{error}</p>}
              </form>

              <p className={styles.note}>
                No spam. We'll only email you when we launch.
              </p>
            </>
          ) : (
            <div className={styles.successState}>
              <div className={styles.successIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>

              <h2 className={styles.successTitle}>
                You're on the list!
              </h2>

              <p className={styles.successDescription}>
                Thanks for joining. We'll email you at <strong>{email}</strong> when we launch.
              </p>

              <Button
                href="/"
                variant="ghost"
                context="dark"
              >
                Back to home
              </Button>
            </div>
          )}
        </div>

        {/* Decorative blobs */}
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
      </main>
    </div>
  )
}
