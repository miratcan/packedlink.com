'use client'

import styles from './LinkBar.module.css'

interface LinkBarProps {
  title: string
  description?: string
  href?: string
  onClick?: () => void
}

export function LinkBar({ title, description, href, onClick }: LinkBarProps) {
  const Element = href ? 'a' : 'div'

  return (
    <Element
      className={styles.linkBar}
      href={href}
      onClick={onClick}
      {...(href && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      <div className={styles.bar} />
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        {description && <div className={styles.description}>{description}</div>}
      </div>
    </Element>
  )
}
