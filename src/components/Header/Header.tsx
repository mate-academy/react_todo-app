import React, { useRef, useEffect, useState } from 'react';

interface HeaderProps {
  todosCount: number;
  allCompleted: boolean;
  onToggleAll: () => void;
  onAddTodo: (title: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  todosCount,
  allCompleted,
  onToggleAll,
  onAddTodo,
}) => {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todosCount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title);
      setTitle('');
    }

    inputRef.current?.focus();
  };

  return (
    <header className="todoapp__header">
      {todosCount > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={onToggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
