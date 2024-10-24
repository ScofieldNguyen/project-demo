export default function parseNameToURL(name: string): string {
  const words = name.split(' ');
  return words.join('-');
}
