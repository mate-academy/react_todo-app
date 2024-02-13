import React, { useContext, useState } from 'react';
import { DispatchContext } from '../contexts/TodoContext';

export const Header: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim()) {
      dispatch({
        type: 'addTodo',
        title,
      });
    }

    setTitle('');
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
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onBlur={handleSubmit}
        />
      </form>
    </header>
  );
};
