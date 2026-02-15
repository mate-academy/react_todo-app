import React, { useState, useRef, useEffect } from 'react';
import { useTodos } from '../context/TodoContext';

export const TodoHeader: React.FC = () => {
  const { todos, addTodo, toggleAll, setFocusHandler } = useTodos();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();

    setFocusHandler(() => focusInput);
    focusInput();
  }, [setFocusHandler]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addTodo(query);
      setQuery('');
    }
  };

  const allCompleted = todos.length > 0 && todos.every(t => t.completed);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
          onClick={toggleAll}
          data-cy="ToggleAllButton"
        />
      )}
      <form onSubmit={handleAddTodo}>
        <input
          ref={inputRef}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={e => setQuery(e.target.value)}
          data-cy="NewTodoField"
        />
      </form>
    </header>
  );
};
