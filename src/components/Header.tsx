import React, { useState } from 'react';
import { Todo } from '../types/todo';

type Props = {
  todos: Todo[];
  setTodos: (value: Todo[]) => void;
};

export const Header: React.FC<Props> = ({ todos, setTodos }) => {
  const [query, setQuery] = useState('');

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo: Todo = {
      id: +new Date(),
      title: query,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setQuery('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={addTodo}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
};
