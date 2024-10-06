// #region imports
import cn from 'classnames';
import { useContext } from 'react';
import { FilterStatus } from '../types/FilterStatus';
import { Todo } from '../types/Todo';
import { TodosContext } from './TodosContext';
// #endregion

type Props = {
  sortedTodos: {
    active: Todo[];
    completed: Todo[];
  };
  filterStatus: FilterStatus;
  onStatusChange: (status: FilterStatus) => void;
};

export const Footer: React.FC<Props> = ({
  sortedTodos,
  filterStatus,
  onStatusChange,
}) => {
  const { changeTodos } = useContext(TodosContext);
  const { active, completed } = sortedTodos;
  const filterLinks: {
    [key: string]: string;
  } = {
    All: '#/',
    Active: '#/active',
    Completed: '#/completed',
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${active.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterStatus).map(status => (
          <a
            key={status}
            href={filterLinks[status]}
            className={cn('filter__link', {
              selected: status === filterStatus,
            })}
            data-cy={`FilterLink${status}`}
            onClick={() => onStatusChange(status)}
          >
            {status}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completed.length}
        onClick={() => changeTodos(active)}
      >
        Clear completed
      </button>
    </footer>
  );
};
