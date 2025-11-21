import Link from "next/link";

import { Button } from "../Button/Button";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon} />
            <span className={styles.logoText}>PackedLink</span>
          </Link>

          <div className={styles.navLinks}>
            <Link href="/blog" className={styles.navLink}>
              Blog
            </Link>
            <a href="#why" className={styles.navLink}>
              Why?
            </a>
            <a href="#who" className={styles.navLink}>
              Who uses it?
            </a>
            <Button variant="primary" context="light" href="/#waitlist">
              Join Waitlist
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
