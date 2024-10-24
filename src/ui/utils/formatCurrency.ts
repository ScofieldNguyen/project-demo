export function formatToCurrency(value: number): string {
  return new Intl.NumberFormat('de-DE').format(value) + '$';
}
