import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';
import { deleteTodos } from './api/todos';
import { useTodo } from './TodoContext';
import { ErrorStatus } from './types/Error';

type Props = {
  todos: Todo[],
  active: number,
  completed: number,
  filter: FilterStatus,
  setFilter(status: FilterStatus): void,
  setTodos(todosArray: Todo[]): void,
};

export const Footer: React.FC<Props> = ({
  todos,
  active,
  completed,
  filter,
  setFilter,
  setTodos,
}) => {
  const {
    setError,
    setTodosToDelete,
  } = useTodo();
  const removeCompleted = async () => {
    const completedTodos = todos.filter(todo => todo.completed);

    setTodosToDelete([...completedTodos].map(todo => todo.id));

    setError(ErrorStatus.none);

    try {
      await Promise.all(completedTodos.map(todo => deleteTodos(todo.id)));

      setTodos(
        todos.filter(todo => !todo.completed),
      );
    } catch {
      setError(ErrorStatus.delete);
    } finally {
      setTodosToDelete([]);
    }
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        {active !== 1 ? `${active} items left` : `${active} item left`}
      </span>

      <ul className="filters">
        <li>
          <button
            type="button"
            onClick={() => setFilter(FilterStatus.all)}
          >
            <Link
              to="/"
              className={classNames(
                { selected: filter === FilterStatus.all },
              )}
            >
              All
            </Link>
          </button>
        </li>

        <li>
          <button
            type="button"
            onClick={() => setFilter(FilterStatus.active)}
          >
            <Link
              to="/active"
              className={classNames(
                { selected: filter === FilterStatus.active },
              )}
            >
              Active
            </Link>
          </button>
        </li>

        <li>
          <button
            type="button"
            onClick={() => setFilter(FilterStatus.completed)}
          >
            <Link
              to="/completed"
              className={classNames(
                { selected: filter === FilterStatus.completed },
              )}
            >
              Completed
            </Link>
          </button>
        </li>
      </ul>

      {completed > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={removeCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
