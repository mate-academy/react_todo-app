import React, { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  const { addTodo } = useContext(TodoContext);

  const newTodo = {
    id: +new Date(),
    title,
    completed: false,
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() !== '') {
      addTodo(newTodo, event);
      setTitle('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={event => setTitle(event.target.value)}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
