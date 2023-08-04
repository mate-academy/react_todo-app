import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../TodosContext/TodosContext';
import { Status } from '../Types/Status';

export const TodosFilter: React.FC = React.memo(() => {
  const { selectedStatus, setSelectedStatus } = useContext(TodosContext);

  const handleSelected = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const targetValue = event.target as HTMLElement;
    const ourText = targetValue.innerText;

    setSelectedStatus(ourText as Status);
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: selectedStatus === Status.ALL,
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
            selected: selectedStatus === Status.ACTIVE,
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
            selected: selectedStatus === Status.COMPLETED,
          })}
          onClick={handleSelected}
        >
          Completed
        </a>
      </li>
    </ul>
  );
});
