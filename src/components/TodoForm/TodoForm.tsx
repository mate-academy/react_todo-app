import React, { useContext, useState } from 'react';
import { DispatchContext } from '../Store';

export const TodoForm: React.FC = () => {
  const dispatch = useContext(DispatchContext);

  const [title, setTitle] = useState('');

  const addNewTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    dispatch({
      type: 'ADD_TODO',
      payload: newTodo,
    });
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={addNewTodo}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
