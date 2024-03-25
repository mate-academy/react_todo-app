import React, { useState } from 'react';
import { useTodos } from '../../utils/TodoContext';

export const Header: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const { addTodo } = useTodos();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!query) {
      return;
    }

    e.preventDefault();
    addTodo({ id: Date.now(), title: query, completed: false });
    setQuery('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form name="todo-text" onSubmit={handleSubmit}>
        <input
          value={query}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={e => setQuery(e.target.value)}
        />
      </form>
    </header>
  );
};
