import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useTodos } from '../context/TodoContext';

export const TodoHeader: React.FC = () => {
  const { todos, addTodo, toggleAll } = useTodos();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Zapamiętujemy poprzednią liczbę zadań
  const prevCount = useRef(todos.length);

  useEffect(() => {
    // Jeśli liczba zadań się zmieniła (dodanie lub usunięcie)
    if (todos.length !== prevCount.current) {
      inputRef.current?.focus();
      prevCount.current = todos.length;
    }
  }, [todos.length]);

  // Focus przy pierwszym załadowaniu
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();

    if (trimmed) {
      addTodo(trimmed);
      setQuery('');
    }
  };

  const allCompleted = todos.length > 0 && todos.every(t => t.completed);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          onClick={toggleAll}
          data-cy="ToggleAllButton"
        />
      )}

      <form onSubmit={handleSubmit}>
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
