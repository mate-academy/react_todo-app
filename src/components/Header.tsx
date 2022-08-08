import React, { useState } from 'react';
import { Todo } from '../types/types';

type Props = {
  todos: Todo[],
  setTodos: (str: Todo[]) => void;
};

export const Header: React.FC<Props> = ({ setTodos, todos }) => {
  const [query, setQuery] = useState('');

  const creatTodo = (str: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title: str,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          creatTodo(query);
          setQuery('');
        }}
      >
        <input
          type="text"
          value={query}
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={(event) => {
            event.preventDefault();
            setQuery(event.target.value);
          }}
        />
      </form>
    </header>

  );
};
