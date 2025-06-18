import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { useTodoContext } from '../../globalProvider';

export const AppHeader = () => {
  const { isAllTodoCompleted, todoData, hasTodo, toggleAll, addTodo } =
    useTodoContext();

  const [todoTitle, setTodoTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todoData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(todoTitle);

    setTodoTitle('');
  };

  return (
    <header className="todoapp__header">
      {hasTodo && (
        <button
          type="button"
          data-cy="ToggleAllButton"
          className={cn('todoapp__toggle-all', {
            active: isAllTodoCompleted,
          })}
          onClick={toggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={event => setTodoTitle(event.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
