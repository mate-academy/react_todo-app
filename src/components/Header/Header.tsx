import React, { useState } from 'react';
import { useTodosDispatch } from '../TodosContext/TodosContext';
import { State } from '../../types/State';

export const Header: React.FC = React.memo(() => {
  const [title, setTitle] = useState('');
  const dispatch = useTodosDispatch();

  const handleTitleEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (title !== '') {
      dispatch({
        type: State.ADDED,
        id: +new Date(),
        title,
      });
    }

    setTitle('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={submitForm}>
        <input
          onChange={handleTitleEvent}
          value={title.trim()}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
});
