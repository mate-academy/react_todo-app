// Header.tsx
import React, { useEffect } from 'react';
import { useFocus } from '../FocusContext';
import { useTodos } from '../TodosContext';
import classNames from 'classnames';

interface HeaderProps {
  hasTodos: boolean;
}

export const Header: React.FC<HeaderProps> = ({ hasTodos }) => {
  const { todos, addTodo, toggleAllTodos } = useTodos();
  const { focusInput, inputRef } = useFocus();

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputRef.current && inputRef.current.value.trim()) {
      addTodo(inputRef.current.value.trim());
      inputRef.current.value = '';
      focusInput();
    }
  };

  return (
    <header className="todoapp__header">
      {hasTodos && (
        <button
          type="button"
          data-cy="ToggleAllButton"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(t => t.completed),
          })}
          onClick={toggleAllTodos}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputRef}
        />
      </form>
    </header>
  );
};
