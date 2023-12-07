import React, { useState, useContext } from 'react';

import { TodosContext } from '../TodosContext/TodosContext';

export const Header: React.FC = () => {
  const { addTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }

    addTodos(title);
    setTitle('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
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
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
