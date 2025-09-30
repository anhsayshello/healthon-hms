export default function formatDate(dateValue: Date) {
  return new Date(dateValue).toISOString().split('T')[0]
}
