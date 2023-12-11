import React, { useContext, useState } from 'react';
import { DispatchContext } from './TodosContext';

export const Header = () => {
  const dispatch = useContext(DispatchContext);
  const [title, setTitle] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim()) {
      dispatch({
        type: 'addTodo',
        payload: {
          title,
          id: +new Date(),
          completed: false,
        },
      });

      setTitle('');
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
          value={title}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
