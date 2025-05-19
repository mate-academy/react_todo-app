export const pluralize = (count: number): string => {
  return count !== 1 ? 's' : '';
};

export const capitalize = (text: string): string => {
  if (!text) {
    return '';
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
};
