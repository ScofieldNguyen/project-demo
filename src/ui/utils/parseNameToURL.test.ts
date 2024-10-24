import parseNameToURL from '@ui/utils/parseNameToURL';

describe('test parse name to URL', () => {
  test('parse correctly', () => {
    expect(parseNameToURL('something has name like this 10')).toBe(
      'something-has-name-like-this-10',
    );
    expect(parseNameToURL('')).toBe('');
  });
});
