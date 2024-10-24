import { formatToCurrency } from '@ui/utils/formatCurrency';

describe('formatToCurrency', () => {
  it('should format 1000000 to 1.000.000$', () => {
    expect(formatToCurrency(1000000)).toBe('1.000.000$');
  });

  it('should format 0 to 0$', () => {
    expect(formatToCurrency(0)).toBe('0$');
  });

  it('should format large numbers correctly', () => {
    expect(formatToCurrency(123456789)).toBe('123.456.789$');
  });

  it('should format small numbers correctly', () => {
    expect(formatToCurrency(1000)).toBe('1.000$');
  });

  it('should handle negative numbers', () => {
    expect(formatToCurrency(-1000000)).toBe('-1.000.000$');
  });
});
