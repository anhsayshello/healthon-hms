export function formatDateTime(value?: string | Date, fallback = '—') {
  if (!value) return fallback
  return new Date(value).toLocaleString()
}
