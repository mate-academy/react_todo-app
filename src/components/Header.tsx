import React from 'react';
import cn from 'classnames';

import { useTodosContext } from '../context/TodoContext';

export const Header: React.FC = () => {
  const {
    title,
    setTitle,
    addTodo,
    allTodosCompleted,
    toggleAll,
    inputRef,
    todos,
  } = useTodosContext();

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: allTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}
      <form
        onSubmit={event => {
          event.preventDefault();

          addTodo();
        }}
      >
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
