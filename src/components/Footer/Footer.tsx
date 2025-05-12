import React, { useContext, useMemo } from 'react';
import { TodoContext } from '../../store/TodoProvider';
import { FilterStatus } from '../../enums/filter-status';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { todos, setTodos, filterStatus, setFilterStatus } =
    useContext(TodoContext);

  const todosCompleted = useMemo(
    () => todos.filter(todo => todo.completed).length,
    [todos],
  );

  const todosActive = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  if (!todos.length) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todosActive} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterStatus).map(status => (
          <a
            key={status}
            href={
              status === FilterStatus.All ? `#/` : `#/${status.toLowerCase()}`
            }
            className={classNames('filter__link', {
              selected: filterStatus === status,
            })}
            data-cy={`FilterLink${status}`}
            onClick={() => setFilterStatus(status)}
          >
            {status}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todosCompleted}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
