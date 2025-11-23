import React, { FC, useMemo } from 'react';
import { useTodos } from '../../hooks/useTodos';
import { TodoStatus } from '../../types/TodoStatus';
import classNames from 'classnames';
import { useTodosActions } from '../../hooks/useTodosActions';

interface Props {
  status: TodoStatus;
  onChangeStatus: (status: TodoStatus) => void;
}

export const Footer: FC<Props> = React.memo(function Footer({
  onChangeStatus,
  status,
}) {
  const todos = useTodos();
  const dispatch = useTodosActions();

  const activeTodos = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const handleFilterTodos = (
    event: React.MouseEvent<HTMLAnchorElement>,
    filter: TodoStatus,
  ) => {
    event.preventDefault();

    onChangeStatus(filter);
  };

  const handleClearTodos = () => {
    dispatch({ type: 'clearCompletedTodos' });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: status === TodoStatus.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={e => handleFilterTodos(e, TodoStatus.ALL)}
        >
          {TodoStatus.ALL}
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: status === TodoStatus.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={e => handleFilterTodos(e, TodoStatus.ACTIVE)}
        >
          {TodoStatus.ACTIVE}
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: status === TodoStatus.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={e => handleFilterTodos(e, TodoStatus.COMPLETED)}
        >
          {TodoStatus.COMPLETED}
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todos.some(todo => todo.completed)}
        onClick={handleClearTodos}
      >
        Clear completed
      </button>
    </footer>
  );
});
