import { FilterOption } from '../types/FilterOptions';

export const getInitialFilterFromHash = (): FilterOption => {
  const hash = window.location.hash.substring(2) as FilterOption;

  if (Object.values(FilterOption).includes(hash)) {
    return hash;
  }

  return FilterOption.ALL;
};
