export function removeExtraSpaces(text: string) {
  const newText = text
    .trim()
    .split(' ')
    .map(word => word)
    .join(' ');

  return newText;
}
