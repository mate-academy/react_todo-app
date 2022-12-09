import classNames from 'classnames';
import React, { memo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { Todo } from '../Types/Todo';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = memo(({
  todos,
  setTodos,
}) => {
  const remainingTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.filter(todo => todo.completed);

  const handleClear = useCallback(() => {
    setTodos(todos.filter(todo => !todo.completed));
  }, [todos]);

  const isActiveLink = useCallback(({ isActive }: { isActive: boolean }) => {
    return classNames({ selected: isActive });
  }, []);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${remainingTodos} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <NavLink to="/" className={isActiveLink}>
            All
          </NavLink>
        </li>

        <li>
          <NavLink to="/active" className={isActiveLink}>
            Active
          </NavLink>
        </li>

        <li>
          <NavLink to="/completed" className={isActiveLink}>
            Completed
          </NavLink>
        </li>
      </ul>

      {completedTodos.length > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClear}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
});
