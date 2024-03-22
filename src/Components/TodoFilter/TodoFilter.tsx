import React, { useContext } from 'react';
import cn from 'classnames';
import { Status, TodosContext } from '../../Store';

export const TodoFilter: React.FC = () => {
  const { filter, setFilter } = useContext(TodosContext);

  const handleFilterChange = (status: Status) => {
    setFilter(status);
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      {Object.values(Status).map(status => (
        <li key={status}>
          <a
            href={status === Status.All ? '#/' : `#/${status.toLowerCase()}`}
            className={cn({ selected: status === filter })}
            onClick={() => handleFilterChange(status)}
          >
            {status}
          </a>
        </li>
      ))}
    </ul>
  );
};
