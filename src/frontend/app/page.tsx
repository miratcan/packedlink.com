import { Button } from '@/components/Button/Button'
import { Header } from '@/components/Header/Header'
import { WaitlistSection } from '@/components/WaitlistSection/WaitlistSection'
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

function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={`${styles.heroContainer} ${styles.contentWidth}`}>
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Pack your links. Share anywhere.</h1>
            <p className={styles.heroSubtitle}>
              YouTube courses, coffee shops, jewelry products. Pack your frequently used links in one place. Share in bio, keep it always updated.
            </p>
            <div className={styles.heroCta}>
              <Button href="/#waitlist" size="large" variant="primary" context="dark">
                Join waitlist
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Button>
              <Button href="#why" variant="ghost" context="dark">
                Learn more
              </Button>
            </div>

            <p className={styles.heroTrustText}>
              Join the waitlist for early access. Be the first to know when we launch.
            </p>
          </div>

          <div className={styles.heroExampleWrapper}>
            <div className={styles.heroExampleCard}>
              <div className={styles.exampleProfile}>
                <div className={styles.exampleAvatar}>
                  <span className={styles.exampleAvatarText}>S</span>
                </div>
                <div>
                  <p className={styles.exampleProfileName}>Sarah</p>
                  <p className={styles.exampleProfileHandle}>@sarah_creates</p>
                </div>
              </div>

              <h3 className={styles.exampleCardTitle}>My Favorite Tech Tools</h3>
              <p className={styles.exampleCardDesc}>
                The tools I use daily for productivity and creativity.
              </p>

              <div className={styles.exampleLinks}>
                <div className={styles.exampleLink}>
                  <div className={styles.exampleLinkBar}></div>
                  <div className={styles.exampleLinkContent}>
                    <p className={styles.exampleLinkTitle}>Notion - All-in-one workspace</p>
                    <p className={styles.exampleLinkSubtitle}>Where I organize everything</p>
                  </div>
                </div>
                <div className={styles.exampleLink}>
                  <div className={styles.exampleLinkBar}></div>
                  <div className={styles.exampleLinkContent}>
                    <p className={styles.exampleLinkTitle}>Figma - Design collaboration</p>
                    <p className={styles.exampleLinkSubtitle}>Best tool for UI design</p>
                  </div>
                </div>
                <div className={styles.exampleLink}>
                  <div className={styles.exampleLinkBar}></div>
                  <div className={styles.exampleLinkContent}>
                    <p className={styles.exampleLinkTitle}>Linear - Project management</p>
                    <p className={styles.exampleLinkSubtitle}>Clean and fast</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.heroBlob1}></div>
      <div className={styles.heroBlob2}></div>
    </section>
  );
}

function ValueProps() {
  return (
    <section id="why" className={styles.valueSection}>
      <div className={`${styles.valueContainer} ${styles.contentWidth}`}>
        <div className={styles.valueSectionHeader}>
          <h2 className={styles.valueSectionTitle}>Why PackedLink?</h2>
          <p className={styles.valueSectionSubtitle}>
            The simplest way to share links. One address, endless possibilities.
          </p>
        </div>

        <div className={styles.valueGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Pack your links together.</h3>
            <p className={styles.featureDescription}>
              YouTube courses, coffee shops, favorite brands, Figma files, GitHub repos. Pack everything on one page, add notes to each link.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Share one address.</h3>
            <p className={styles.featureDescription}>
              Put it in Instagram bio, add to YouTube description, share in WhatsApp group. Everyone clicks one link, sees all lists. Updates automatically reflect to everyone.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Always find in the same place.</h3>
            <p className={styles.featureDescription}>
              Don't search in WhatsApp chat, phone notes, or Excel. Open the page, find the link, copy. Everything in one place, always updated, never lost.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section id="who" className={styles.useCasesSection}>
      <div className={`${styles.useCasesContainer} ${styles.contentWidth}`}>
        <div className={styles.useCasesSectionHeader}>
          <h2 className={styles.useCasesSectionTitle}>Who uses it?</h2>
        </div>

        <div className={styles.useCasesGrid}>
          <UseCaseCard
            title="Content creators"
            description="Create content on YouTube, Instagram, TikTok. Give one link for your videos, products, courses."
            examples={[
              "• Equipment I use",
              "• Courses I recommend",
              "• My music playlists",
            ]}
          />

          <UseCaseCard
            title="Place and guide sharers"
            description="City guides, breakfast lists, place recommendations. Pack everything on one page, share with the group."
            examples={[
              "• Best coffee in Austin",
              "• Brooklyn brunch spots",
              "• Meditation studios nearby",
            ]}
          />

          <UseCaseCard
            title="Teachers and educators"
            description="Homework links, lecture videos, PDF notes. Pack everything on one page, share with class."
            examples={[
              "• 8th grade math resources",
              "• Weekly homework links",
              "• Exam prep video list",
            ]}
          />

          <UseCaseCard
            title="Team link sharers"
            description="Team documents, forms, tools. Links always asked of you. Make one list, give to everyone."
            examples={[
              "• All our tools and services",
              "• Onboarding resources",
              "• Brand guide and templates",
            ]}
          />
        </div>

        <div className={styles.useCasesFooter}>
          <p className={styles.useCasesFooterText}>
            In addition, different groups like students, exam candidates, and community managers also use PackedLink.
          </p>
        </div>
      </div>
    </section>
  );
}

type UseCaseCardProps = {
  title: string;
  description: string;
  examples: string[];
};

function UseCaseCard({ title, description, examples }: UseCaseCardProps) {
  return (
    <div className={styles.useCaseCard}>
      <h3 className={styles.useCaseTitle}>{title}</h3>
      <p className={styles.useCaseDescription}>{description}</p>
      <div className={styles.useCaseExamples}>
        <p className={styles.useCaseExamplesTitle}>Example lists</p>
        <ul className={styles.useCaseExampleList}>
          {examples.map((example) => (
            <li key={example} className={styles.useCaseExampleItem}>
              {example}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Trust() {
  return (
    <section className={styles.trustSection}>
      <div className={`${styles.trustContainer} ${styles.contentWidth}`}>
        <div className={styles.trustGrid}>
          <TrustItem
            title="Doesn't put you in a tracking trap"
            description={"Doesn't get into tricks like \"Let's convert your followers to email list, add pixels.\""}
            icon={
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            }
          />
          <TrustItem
            title="Doesn't sell or rent your data"
            description="Doesn't use your links for ad targeting. Your lists are yours, we just store them."
            icon={
              <>
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
              </>
            }
          />
          <TrustItem
            title="You leave when you want"
            description="Export your lists, close your account. We don't leave data behind."
            icon={
              <>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}

type TrustItemProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

function TrustItem({ title, description, icon }: TrustItemProps) {
  return (
    <div className={styles.trustItem}>
      <div className={styles.trustItemHeader}>
        <div className={styles.trustIconWrapper}>
          <svg className={styles.trustIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {icon}
          </svg>
        </div>
        <h3 className={styles.trustTitle}>{title}</h3>
      </div>
      <p className={styles.trustDescription}>{description}</p>
    </div>
  );
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
