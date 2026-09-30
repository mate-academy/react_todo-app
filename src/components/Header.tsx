import React from 'react';
import classNames from 'classnames';
import { useTodos } from '../context/TodosContext';
import { NewTodo } from './NewTodo';

export const Header: React.FC = () => {
  const { todos, isAllCompleted, toggleAll } = useTodos();

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <NewTodo />
    </header>
  );
};
