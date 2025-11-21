import { Header } from '@/components/Header/Header'
import { WaitlistSection } from '@/components/WaitlistSection/WaitlistSection'
import { Hero } from '@/app/landing/Hero'
import { ValueProps } from '@/app/landing/ValueProps'
import { UseCases } from '@/app/landing/UseCases'
import { Trust } from '@/app/landing/Trust'
import styles from './page.module.css'

export default function HomePage() {
  return (
    <div className={styles.homepage}>
      <Header />

      <Hero />
      <ValueProps />
      <UseCases />
      <Trust />
      <WaitlistSection />
      <Footer />
    </div>
  )
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>
            <div className={styles.footerLogoIcon}></div>
            <span className={styles.footerLogoText}>PackedLink</span>
          </div>
          <p className={styles.footerCopyright}>© 2024 PackedLink</p>
        </div>
      </div>
    </footer>
  );
}
