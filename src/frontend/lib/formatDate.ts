export function formatDate(input: string | null | undefined, locale: string = 'en-US') {
  if (!input) return ''
  const date = new Date(input)
  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}
