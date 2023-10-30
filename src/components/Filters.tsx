import React, { useCallback, useMemo, useContext } from 'react';
import cn from 'classnames';

import { Tabs } from '../types/Tabs';
import { TodosContext } from '../contexts/TodosContext';

export const Filters: React.FC = () => {
  const { selectedFilter, setSelectedFilter } = useContext(TodosContext);

  const enumToArray = useCallback((data: typeof Tabs): string[] => {
    return Object.values(data);
  }, []);

  const filters = useMemo(() => enumToArray(Tabs), [enumToArray]);

  return (
    <ul className="filters" data-cy="todosFilter">
      {filters.map(filter => (
        <li key={filter}>
          <a
            href={`#/${filter !== Tabs.All
              ? filter.toLowerCase()
              : ''}`}
            className={cn({ selected: selectedFilter === filter })}
            onClick={() => setSelectedFilter(filter as Tabs)}
          >
            {filter}
          </a>
        </li>
      ))}
    </ul>
  );
};
