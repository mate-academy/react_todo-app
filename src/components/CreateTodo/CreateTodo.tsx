import React, { useState } from 'react';
import { Todo } from '../types';

type Props = {
  todosCallback: (newTodo: Todo) => void
};

export const CreateTodo: React.FC<Props> = ({ todosCallback }) => {
  const [todo, setTodo] = useState('');

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={(event) => {
        event.preventDefault();
        if (todo !== '') {
          todosCallback({
            id: Math.random(),
            title: todo,
            completed: false,
          });
        }

        setTodo('');
      }}
      >
        <input
          data-cy="createTodo"
          type="text"
          className="new-todo"
          value={todo}
          placeholder="What needs to be done?"
          onChange={event => setTodo(event.target.value)}
        />
      </form>
    </header>
  );
};
