import React, { useState, useRef, useEffect } from 'react';
import { useTodos } from '../context/TodosContext';

export const Header: React.FC = () => {
  const { todos, addTodo, toggleAll } = useTodos();
  const [title, setTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus on mount and whenever todos change
  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    await addTodo(title);
    setTitle('');
  };

  const hasTodos = todos.length > 0;
  const allCompleted = todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {hasTodos && (
        <button
          type="button"
          className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
          aria-label="Toggle all todos"
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
        />
      </form>
    </header>
  );
};
