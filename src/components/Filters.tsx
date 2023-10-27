import React, { useCallback, useMemo, useContext } from 'react';
import cn from 'classnames';

import { Tabs } from '../types/Tabs';
import { TodosContext } from '../contexts/TodosContext';

type EnumType = {
  [key: string]: Tabs;
};

export const Filters: React.FC = () => {
  const { selectedFilter, setSelectedFilter } = useContext(TodosContext);

  const enumToArray = useCallback((data: EnumType): Tabs[] => {
    return Object.keys(data).map(key => (
      data[key]
    ));
  }, []);

  const filters = useMemo(() => enumToArray(Tabs), [enumToArray]);

  return (
    <ul className="filters">
      {filters.map(filter => (
        <li key={filter}>
          <a
            href={`#/${filter !== Tabs.All
              ? filter.toLowerCase()
              : ''}`}
            className={cn({ selected: selectedFilter === filter })}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </a>
        </li>
      ))}
    </ul>
  );
};
