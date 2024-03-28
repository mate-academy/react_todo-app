import React, { useState } from 'react';
import { useTodos } from '../../store/Store';

const Header: React.FC = () => {
  const [query, setQuery] = useState('');
  const { addTodo } = useTodos();

  const handleSubmit = (formEvent: React.FormEvent) => {
    formEvent.preventDefault();

    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      addTodo(trimmedQuery);
      setQuery('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </form>
    </header>
  );
};

export default Header;
