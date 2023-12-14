import cn from 'classnames';
import React, { useContext } from 'react';
import { TodosContext } from '../../Context/TodosContext';
import { Status } from '../../Types/Status';

export const TodosFilter: React.FC = () => {
  const { todos, handleStatus, status } = useContext(TodosContext);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href={Status.all}
            className={cn({
              selected: status === Status.all,
            })}
            onClick={() => handleStatus(Status.all)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href={Status.active}
            className={cn({
              selected: status === Status.active,
            })}
            onClick={() => handleStatus(Status.active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href={Status.completed}
            className={cn({
              selected: status === Status.completed,
            })}
            onClick={() => handleStatus(Status.completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
