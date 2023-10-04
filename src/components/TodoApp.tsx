import React, { useContext, useState } from 'react';

import { DispatchContext } from '../services/TodosContext';

export const TodoApp: React.FC = () => {
  const [title, setTitle] = useState('');
  const dispatch = useContext(DispatchContext);

  function handleSubmit(event: React.FormEvent<Element>) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    dispatch({
      type: 'add',
      payload: {
        todo: {
          id: +new Date(),
          title,
          completed: false,
        },
      },
    });

    setTitle('');
  }

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
