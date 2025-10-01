import React, { useState, useRef } from 'react';
import { Footer, TodoList, useTodos } from './components';

export const AppContent: React.FC = () => {
  const {
    todos,
    addTodo,
    toggleAll,
    filter,
    setFilter,
    deleteTodo,
    clearCompleted,
  } = useTodos();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addTodo(query);
      setQuery('');
      inputRef.current?.focus();
    }
  };

  const handleDelete = (id: number) => {
    deleteTodo(id);
    inputRef.current?.focus();
  };

  const handleClearCompleted = () => {
    clearCompleted();
    inputRef.current?.focus();
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <header className="todoapp__header">
        {todos.length > 0 && (
          <button
            type="button"
            className={`todoapp__toggle-all ${
              todos.every(t => t.completed) ? 'active' : ''
            }`}
            data-cy="ToggleAllButton"
            onClick={toggleAll}
          />
        )}

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="todoapp__new-todo"
            data-cy="NewTodoField"
            placeholder="What needs to be done?"
            value={query}
            autoFocus
            onChange={e => setQuery(e.target.value)}
          />
        </form>
      </header>

      <TodoList onDelete={handleDelete} />

      <Footer
        filter={filter}
        setFilter={setFilter}
        onClearCompleted={handleClearCompleted}
      />
    </div>
  );
};
