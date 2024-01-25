import React, { useContext } from 'react';
import cn from 'classnames';
import { Status } from '../../types/Status';
import { FilterContext } from '../../context/TodoContext';

export const TodoFilter: React.FC = () => {
  const { status, changeStatus } = useContext(FilterContext);

  const handleClick = (selectedStatus: Status) => {
    changeStatus(selectedStatus);
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({ selected: status === Status.All })}
          onClick={() => handleClick(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({ selected: status === Status.Active })}
          onClick={() => handleClick(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({ selected: status === Status.Completed })}
          onClick={() => handleClick(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
