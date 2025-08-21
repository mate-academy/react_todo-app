import { useEffect, useState } from 'react';

export type Filter = 'all' | 'active' | 'completed';

function getFilterFromHash(): Filter {
  switch (window.location.hash) {
    case '#/active':
      return 'active';
    case '#/completed':
      return 'completed';
    default:
      return 'all';
  }
}

export function useHashFilter(): Filter {
  const [filter, setFilter] = useState<Filter>(() => getFilterFromHash());

  useEffect(() => {
    const onHashChange = () => setFilter(getFilterFromHash());

    window.addEventListener('hashchange', onHashChange);

    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return filter;
}
