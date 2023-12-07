import React, { useContext, useState } from 'react';
import { DispachContext } from './TodosContext/TodosContext';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  const dispatch = useContext(DispachContext);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({
      type: 'addTodo',
      title,
    });

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
          value={title}
          onChange={handleTitleChange}
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
