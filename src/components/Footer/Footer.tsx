import React, { useContext } from 'react';
import cn from 'classnames';
import { Status } from '../../data/enums';
import { TodosContext } from '../TodosContext';

type Props = {
  currentAppliedFilter: Status;
  onFilterChange: (newFilter: Status) => void;
};

export const Footer: React.FC<Props> = ({
  currentAppliedFilter,
  onFilterChange,
}) => {
  const { todos, setTodos } = useContext(TodosContext);
  const notCompletedTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const handleClearCompletedClick = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);

    setTodos(updatedTodos);
  };

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {notCompletedTodos.length === 1 ? (
          '1 item left'
        ) : (
          `${notCompletedTodos.length} items left`
        )}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={cn({ selected: currentAppliedFilter === Status.ALL })}
            onClick={() => onFilterChange(Status.ALL)}
          >
            {Status.ALL}
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({ selected: currentAppliedFilter === Status.ACTIVE })}
            onClick={() => onFilterChange(Status.ACTIVE)}
          >
            {Status.ACTIVE}
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({
              selected: currentAppliedFilter === Status.COMPLETED,
            })}
            onClick={() => onFilterChange(Status.COMPLETED)}
          >
            {Status.COMPLETED}
          </a>
        </li>
      </ul>

      {completedTodos.length !== 0
      && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompletedClick}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
