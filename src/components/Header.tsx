import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoState } from '../types/TodoState';

type Props = {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
};

export const Header: React.FC<Props> = ({ todos, setTodos }) => {
  const [query, setQuery] = useState('');

  const handler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let todoId = 1;

    if (todos.length > 0) {
      todoId = todos[todos.length - 1].id + 1;
    }

    const newTodo = {
      id: todoId,
      title: query,
      state: TodoState.ACTIVE,
    };

    if (newTodo.title !== '') {
      setTodos([...todos, newTodo]);
      setQuery('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handler}>
        <input
          type="text"
          value={query}
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
};
