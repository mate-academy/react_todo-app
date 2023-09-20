import React, { useContext } from 'react';
import classNames from 'classnames';
import { Status } from '../../types/Todo';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {
};

export const TodosFilter: React.FC<Props> = () => {
  const { filter, setFilter } = useContext(TodosContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: filter === Status.ALL,
          })}
          onClick={() => setFilter(Status.ALL)}
        >
          {Status.ALL}
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: filter === Status.ACTIVE,
          })}
          onClick={() => setFilter(Status.ACTIVE)}
        >
          {Status.ACTIVE}
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: filter === Status.COMPLETED,
          })}
          onClick={() => setFilter(Status.COMPLETED)}
        >
          {Status.COMPLETED}
        </a>
      </li>
    </ul>
  );
};
