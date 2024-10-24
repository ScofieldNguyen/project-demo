import { parseMsToDateString } from '@ui/utils/parseDate';

describe('parse miliseconds to date string', () => {
  it('should correctly format a Unix timestamp (in seconds) to DD/MM/YYYY format', () => {
    // Example: January 1, 2024
    const timestamp = 1704067200000; // Unix timestamp for 2024-01-01 00:00:00 UTC
    expect(parseMsToDateString(timestamp)).toBe('01/01/2024');
  });

  it('should correctly format a Unix timestamp with single-digit day and month', () => {
    // Example: September 5, 2023
    const timestamp = 1693872000000; // Unix timestamp for 2023-09-05 00:00:00 UTC
    expect(parseMsToDateString(timestamp)).toBe('05/09/2023');
  });

  it('should handle the Unix epoch (0 seconds)', () => {
    const timestamp = 0; // Unix epoch: January 1, 1970
    expect(parseMsToDateString(timestamp)).toBe('01/01/1970');
  });

  it('should handle leap years correctly', () => {
    // Example: February 29, 2020
    const timestamp = 1582934400000; // Unix timestamp for 2020-02-29 00:00:00 UTC
    expect(parseMsToDateString(timestamp)).toBe('29/02/2020');
  });
});
