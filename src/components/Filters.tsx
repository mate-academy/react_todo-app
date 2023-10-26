import React, { useCallback, useMemo, useState } from 'react';
import cn from 'classnames';

enum Status {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

type EnumType = {
  [key: string]: Status;
};

export const Filters: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState(Status.All);

  const enumToArray = useCallback((data: EnumType): Status[] => {
    return Object.keys(data).map(key => (
      data[key]
    ));
  }, []);

  const filters = useMemo(() => enumToArray(Status), [enumToArray]);

  return (
    <ul className="filters">
      {filters.map(filter => (
        <li>
          <a
            href={`#/${filter !== Status.All
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
