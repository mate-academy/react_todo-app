import { useState } from 'react';

export const Header = () => {
  const [title, setTitle] = useState('');
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
      </form>
    </header>
  );
};
