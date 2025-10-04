export default function formatDate(dateValue: Date | string) {
  return new Date(dateValue).toISOString().split('T')[0]
}
