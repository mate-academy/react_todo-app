import React, { useContext } from 'react';
import classNames from 'classnames';
import { Status } from '../../types/Status';
import { TodosContext } from '../../TodosContext';

export const TodosFilter: React.FC = React.memo(() => {
  const { filter, setFilter } = useContext(TodosContext);

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
            selected: filter === Status.ALL,
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
            selected: filter === Status.ACTIVE,
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
            selected: filter === Status.COMPLETED,
          })}
          onClick={handleSelected}
        >
          Completed
        </a>
      </li>
    </ul>
  );
});
