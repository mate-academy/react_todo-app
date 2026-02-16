import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../../context/TodoContext';
import { NewTodo } from '../NewTodo/NewTodo';

export const Header: React.FC = () => {
  const { onToggleAll, todos } = useContext(TodoContext);

  const isAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllCompleted,
          })}
          onClick={onToggleAll}
          data-cy="ToggleAllButton"
        />
      )}
      <NewTodo />
    </header>
  );
};
