import clsx from "clsx";
import styles from "../page.module.css";

type UseCaseCardProps = {
  title: string;
  description: string;
  examples: string[];
};

export function UseCases() {
  return (
    <section id="who" className={styles.useCasesSection}>
      <div className={clsx(styles.useCasesContainer, styles.contentWidth)}>
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
