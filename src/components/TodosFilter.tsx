import React, {
  useCallback,
  useState,
} from 'react';
import cn from 'classnames';
import { Status } from '../types/Status';

interface Props {
  handleFilteredTodos: (newStatus: Status) => void;
}

export const TodosFilter: React.FC<Props> = React.memo(({
  handleFilteredTodos,
}) => {
  const [filterBy, setFilterBy] = useState(Status.ALL);

  const handleFilterChange = useCallback((newFilter: Status) => {
    setFilterBy(newFilter);
    handleFilteredTodos(newFilter);
  }, [handleFilteredTodos]);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({
            selected: filterBy === Status.ALL,
          })}
          onClick={() => handleFilterChange(Status.ALL)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({
            selected: filterBy === Status.ACTIVE,
          })}
          onClick={() => handleFilterChange(Status.ACTIVE)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({
            selected: filterBy === Status.COMPLETED,
          })}
          onClick={() => handleFilterChange(Status.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
});
