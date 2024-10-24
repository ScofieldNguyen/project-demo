import BreadcrumbInfo from '@domain/entities/BreadcrumbInfo';

function removeHyphens(str: string) {
  if (!str) return str;
  return str.replace(/-/g, ' ');
}

function capitalizeFirstLetterOfEveryWord(str: string) {
  return str
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function parseName(part: string) {
  return capitalizeFirstLetterOfEveryWord(removeHyphens(part));
}

export default function parseURLToBreadcrumbs(url: string): BreadcrumbInfo[] {
  const parts = url.split('/');

  // remove first part
  parts.shift();

  let finalURL = '';
  const result: BreadcrumbInfo[] = [];

  for (let i = 0; i <= parts.length - 1; i += 1) {
    finalURL = finalURL + '/' + parts[i];
    result.push({
      title: parseName(parts[i]),
      href: finalURL,
    });
  }

  return result;
}
