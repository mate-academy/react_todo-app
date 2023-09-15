import { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { Filter } from '../../types/Filter';
import { TodosContext } from '../TodosContext';
import { ActionType } from '../../types/Action';

type Props = {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
};

export const TodoFilter: React.FC<Props> = ({ filter, onFilterChange }) => {
  const { todos, dispatch } = useContext(TodosContext);

  const handleActiveLinkClick = () => {
    if (filter !== Filter.Active) {
      onFilterChange(Filter.Active);
    }
  };

  const handleCompletedLinkClick = () => {
    if (filter !== Filter.Completed) {
      onFilterChange(Filter.Completed);
    }
  };

  const handleAllLinkClick = () => {
    if (filter !== Filter.All) {
      onFilterChange(Filter.All);
    }
  };

  const uncomplitedTodos = useMemo(() => todos
    .filter(({ completed }) => !completed).length, [todos]);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncomplitedTodos} item${uncomplitedTodos === 1 ? '' : 's'} left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: filter === Filter.All,
            })}
            onClick={handleAllLinkClick}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({
              selected: filter === Filter.Active,
            })}
            onClick={handleActiveLinkClick}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: filter === Filter.Completed,
            })}
            onClick={handleCompletedLinkClick}
          >
            Completed
          </a>
        </li>
      </ul>

      {uncomplitedTodos !== todos.length && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => dispatch({ type: ActionType.DeleteComplited })}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
