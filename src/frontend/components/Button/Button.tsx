'use client'

import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'ghost'
  size?: 'default' | 'large'
  context?: 'light' | 'dark'
  href?: string
  disabled?: boolean
}

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'default',
  context = 'dark',
  href,
  disabled = false
}: ButtonProps) {
  // Determine variant class based on context + variant combination
  const variantClass = variant === 'ghost'
    ? (context === 'light' ? styles.ghostLight : styles.ghostDark)
    : (context === 'light' ? styles.primaryLight : styles.primaryDark)

  const sizeClass = size === 'large' ? styles.large : ''
  const disabledClass = disabled ? styles.disabled : ''
  const className = `${variantClass} ${sizeClass} ${disabledClass}`.trim()

  if (href && !disabled) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }

  return (
    <button className={className} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  )
}
