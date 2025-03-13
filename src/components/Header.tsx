import classNames from 'classnames';
import React, { useRef, useEffect } from 'react';

interface HeaderProps {
  newTitle: string;
  setNewTitle: (value: string) => void;
  addTodo: (title: string) => void;
  toggleAllTodos: () => void;
  todosLength: number;
  activeTodosCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  newTitle,
  setNewTitle,
  addTodo,
  toggleAllTodos,
  todosLength,
  activeTodosCount,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todosLength]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newTitle.trim()) {
      addTodo(newTitle);
      setNewTitle('');
    }
  };

  return (
    <header className="todoapp__header">
      {todosLength > 0 && (
        <button
          data-cy="ToggleAllButton"
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todosLength > 0 && activeTodosCount === 0,
          })}
          onClick={toggleAllTodos}
        ></button>
      )}
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
