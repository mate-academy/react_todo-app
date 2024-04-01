import React, { useState, useContext } from 'react';
import { DispatchContext } from '../managment/TodoContext';

export const Header: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim()) {
      dispatch({
        type: 'addTodo',
        title,
      });
    }

    setTitle('');
  };

  return (
    <header className="header" onSubmit={handleSubmit}>
      <h1>todos</h1>

      <form>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={handleSubmit}
        />
      </form>
    </header>
  );
};
