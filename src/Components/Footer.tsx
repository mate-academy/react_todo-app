import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { useTodoContext } from '../TodoContext/TodoContext';
import { FilterStatus } from '../types/Todo';

export const Footer: React.FC = React.memo(() => {
  const { todos, setTodos, inputRef, filterStatus, setFilterStatus } =
    useTodoContext();

  const handleDeleteAllCompletedTodos = useCallback(() => {
    const completedTodos = todos.filter(todo => !todo.completed);

    setTodos(completedTodos);
    inputRef.current?.focus();
  }, [inputRef, setTodos, todos]);

  const countActiveTodo = todos.filter(todo => !todo.completed).length;
  const isCompletedEnabled = useMemo(
    () => todos.some(todo => todo.completed),
    [todos],
  );

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countActiveTodo} items left
      </span>
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterStatus === FilterStatus.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterStatus(FilterStatus.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterStatus === FilterStatus.ACTIVE,
          })}
          onClick={() => setFilterStatus(FilterStatus.ACTIVE)}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterStatus === FilterStatus.COMPLETED,
          })}
          onClick={() => setFilterStatus(FilterStatus.COMPLETED)}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!isCompletedEnabled}
        onClick={handleDeleteAllCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
});

Footer.displayName = 'Footer';
