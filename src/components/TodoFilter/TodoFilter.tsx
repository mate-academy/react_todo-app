import React, { useContext } from 'react';
import cn from 'classnames';
import { TodosContext } from '../../contexts/TodosContext';
import { Status } from '../../types/Status';

type Props = {};

export const TodoFilter: React.FC<Props> = () => {
  const { filterValue, setFilterValue } = useContext(TodosContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href={Status.All}
          className={cn({
            selected: filterValue === Status.All,
          })}
          onClick={() => setFilterValue(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href={Status.Active}
          className={cn({
            selected: filterValue === Status.Active,
          })}
          onClick={() => setFilterValue(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href={Status.Completed}
          className={cn({
            selected: filterValue === Status.Completed,
          })}
          onClick={() => setFilterValue(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
