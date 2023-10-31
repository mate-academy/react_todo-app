import React, { useCallback, useContext, useMemo } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../contexts/TodosContext';
import { TodoActions } from '../types/TodoActions';

export const TodosFilter: React.FC = () => {
  const { selectedFilter, setSelectedFilter } = useContext(TodosContext);

  const TodoActionsToArr = useCallback((data: typeof TodoActions): string[] => {
    return Object.values(data);
  }, []);
  // eslint-disable-next-line
  const filters = useMemo(() => TodoActionsToArr(TodoActions), [TodoActionsToArr]);

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
