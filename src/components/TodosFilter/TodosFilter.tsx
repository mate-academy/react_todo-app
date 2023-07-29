import classNames from 'classnames';
import React, { useContext } from 'react';
import { Status } from '../../types/Status';
import { TodosContex } from '../../TodosContex';

export const TodosFilter: React.FC = React.memo(() => {
  const { filter, setFilter } = useContext(TodosContex);

  const handleSelected = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const targetValue = event.target as HTMLElement;
    const ourText = targetValue.innerText;

    setFilter(ourText as Status);
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: filter === Status.All,
          })}
          onClick={handleSelected}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: filter === Status.Active,
          })}
          onClick={handleSelected}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: filter === Status.Completed,
          })}
          onClick={handleSelected}
        >
          Completed
        </a>
      </li>
    </ul>
  );
});
