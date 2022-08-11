export type SearchParams = {
  [key: string]: string | string[] | null,
};

export function getSearchRequest(
  currentSearch: URLSearchParams,
  prevSearch: SearchParams,
): string {
  const newSearch = new URLSearchParams(currentSearch.toString());

  Object.entries(prevSearch)
    .forEach(([key, value]) => {
      if (value === null) {
        newSearch.delete(key);
      } else if (Array.isArray(value)) {
        newSearch.delete(key);
        value.forEach(part => {
          newSearch.append(key, part);
        });
      } else {
        newSearch.set(key, value);
      }
    });

  return newSearch.toString();
}
