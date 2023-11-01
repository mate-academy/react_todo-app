import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../contexts/TodosContext';
import { Status } from '../types/Status';

export const TodosFilter: React.FC = () => {
  const { selectedFilter, setSelectedFilter } = useContext(TodosContext);

  const filters = useMemo(() => {
    return Object.values(Status);
  }, []);

  return (
    <ul className="filters" data-cy="todosFilter">
      {filters.map(filter => (
        <li key={filter}>
          <a
            href={`#/${filter !== Status.All
              ? filter.toLowerCase()
              : ''}`}
            className={classNames({ selected: selectedFilter === filter })}
            onClick={() => setSelectedFilter(filter as Status)}
          >
            {filter}
          </a>
        </li>
      ))}
    </ul>
  );
};
