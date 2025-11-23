import React, { FC, useMemo } from 'react';
import { useTodos } from '../../hooks/useTodos';
import classNames from 'classnames';
import { TodoForm } from '../TodoForm/TodoForm';
import { useTodosActions } from '../../hooks/useTodosActions';

export const Header: FC = React.memo(function Header() {
  const todos = useTodos();
  const dispatch = useTodosActions();

  const isAllTodosCompleted = useMemo(
    () => todos.every(todo => todo.completed),
    [todos],
  );

  const handleToggleTodos = () => {
    dispatch({ type: 'toggleTodoStatuses' });
  };

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleTodos}
        />
      )}

      <TodoForm />
    </header>
  );
});
