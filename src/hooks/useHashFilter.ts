import { useEffect, useState } from 'react';
import { FilterType } from '../types/constants';

export const useHashFilter = () => {
  const [filter, setFilter] = useState<FilterType>(FilterType.All);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      switch (hash) {
        case '#/active':
          setFilter(FilterType.Active);
          break;
        case '#/completed':
          setFilter(FilterType.Completed);
          break;
        default:
          setFilter(FilterType.All);
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return filter;
};
