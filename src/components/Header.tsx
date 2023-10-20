import React, { useState, useContext, useCallback } from 'react';
import { TodoContext } from './TodoContext';

type Props = {};

export const Header: React.FC<Props> = () => {
  const { setTodos, todos } = useContext(TodoContext);

  const [title, setTitle] = useState('');

  const handleSubmit = useCallback((
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTodo = {
      id: +(new Date()),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
  }, [title, todos, setTodos]);

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
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
