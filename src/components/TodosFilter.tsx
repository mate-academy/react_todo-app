import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../TodosContext';
import { Status } from '../types/Status';

export const TodosFilter: React.FC = React.memo(() => {
  const { filter, setFilter } = useContext(TodosContext);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const target = event.target as HTMLElement;
    const newFilter = target.innerText;

    setFilter(newFilter as Status);
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: filter === Status.ALL,
          })}
          onClick={handleClick}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: filter === Status.ACTIVE,
          })}
          onClick={handleClick}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: filter === Status.COMPLETED,
          })}
          onClick={handleClick}
        >
          Completed
        </a>
      </li>
    </ul>
  );
});
