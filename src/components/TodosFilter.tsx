import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../contexts/TodosContext';
import { TodoActions } from '../types/TodoActions';

export const TodosFilter: React.FC = () => {
  const { selectedFilter, setSelectedFilter } = useContext(TodosContext);

  const filters = useMemo(() => {
    return Object.values(TodoActions);
  }, []);

  return (
    <ul className="filters" data-cy="todosFilter">
      {filters.map(filter => (
        <li key={filter}>
          <a
            href={`#/${filter !== TodoActions.All
              ? filter.toLowerCase()
              : ''}`}
            className={classNames({ selected: selectedFilter === filter })}
            onClick={() => setSelectedFilter(filter as TodoActions)}
          >
            {filter}
          </a>
        </li>
      ))}
    </ul>
  );
};
