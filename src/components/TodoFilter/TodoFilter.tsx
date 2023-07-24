import { useContext } from 'react';
import classNames from 'classnames';

import { TodoContext, TodoUpdateContext } from '../../context/TodoContext';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const { status } = useContext(TodoContext);
  const { setStatus } = useContext(TodoUpdateContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: status === Status.All,
          })}
          onClick={() => setStatus(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: status === Status.Active,
          })}
          onClick={() => setStatus(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: status === Status.Completed,
          })}
          onClick={() => setStatus(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
