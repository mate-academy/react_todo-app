import React, { useState } from 'react';
import cn from 'classnames';
import { Status } from '../Types/Status';

type Props = {
  handleFilterTodos: (newFilter: Status) => void;
};

export const TodosFilter: React.FC<Props> = ({ handleFilterTodos }) => {
  const { all, active, completed } = Status;
  const [filterBy, setFilterBy] = useState(Status.all);

  const handleFilterChange = (newFilter: Status) => {
    setFilterBy(newFilter);
    handleFilterTodos(newFilter);
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({
            selected: filterBy === all,
          })}
          onClick={() => handleFilterChange(Status.all)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({
            selected: filterBy === active,
          })}
          onClick={() => handleFilterChange(Status.active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({
            selected: filterBy === completed,
          })}
          onClick={() => handleFilterChange(Status.completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
