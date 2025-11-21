import type { Metadata } from "next";
import clsx from 'clsx'

import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";
import "./globals.css";
import styles from './layout.module.css'
import Providers from "./providers";

const display = { variable: "" };

export const metadata: Metadata = {
  title: "PackedLink",
  description: "Link listelerini insanlara sunmanın sade yolu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={display.variable}>
      <body>
        <ErrorBoundary>
          <Providers>
            {children}
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
