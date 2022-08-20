export function convertToHumanReadableCount(
  amount: number,
  singularWord: string,
) {
  if (amount === 1) {
    return `${amount} ${singularWord}`;
  }

  return `${amount} ${singularWord}s`;
}
