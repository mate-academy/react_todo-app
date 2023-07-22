import { FC } from 'react';
import classNames from 'classnames';
import { useTodoContext } from '../hooks/useTodoContext';
import { Status } from '../types';

export const TodosFilter: FC = () => {
  const {
    todosCount,
    activeTodosLeft,
    filterStatus,
    onFilterStatusChange,
    onDeleteCompetedTodos,
  } = useTodoContext();

  const filterLinkClass = (currentStatus: Status) => {
    return classNames({
      selected: filterStatus === currentStatus,
    });
  };

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodosLeft} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={filterLinkClass(Status.All)}
            onClick={() => onFilterStatusChange(Status.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={filterLinkClass(Status.Active)}
            onClick={() => onFilterStatusChange(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={filterLinkClass(Status.Completed)}
            onClick={() => onFilterStatusChange(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {(activeTodosLeft !== todosCount) && (
        <button
          type="button"
          className="clear-completed"
          onClick={onDeleteCompetedTodos}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
