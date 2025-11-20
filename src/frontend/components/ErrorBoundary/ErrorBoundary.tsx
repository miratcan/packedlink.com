"use client";

import React from "react";
import { Button } from "../Button/Button";
import styles from "./ErrorBoundary.module.css";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error boundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.icon}
              >
                <title>Hata</title>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <h1 className={styles.title}>Bir şeyler ters gitti</h1>
            <p className={styles.message}>
              Üzgünüz, beklenmeyen bir hata oluştu. Sayfayı yenilemeyi veya ana sayfaya dönmeyi deneyebilirsiniz.
            </p>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className={styles.errorDetails}>
                <summary className={styles.errorSummary}>Hata detayları (sadece development)</summary>
                <pre className={styles.errorStack}>{this.state.error.stack}</pre>
              </details>
            )}

            <div className={styles.actions}>
              <Button variant="primary" context="light" onClick={this.handleReset}>
                Tekrar dene
              </Button>
              <Button variant="ghost" context="light" href="/">
                Ana sayfaya dön
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
