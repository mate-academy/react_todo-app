import React, { useState } from 'react';
import { State } from '../../types/State';
import { useTodosDispatch } from '../TodoContext/TodoContext';

export const Header: React.FC = React.memo(() => {
  const [title, setTitle] = useState('');
  const dispatch = useTodosDispatch();

  const handleTitleEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (title) {
      dispatch({
        type: State.ADDED,
        id: +new Date(),
        title,
      });
    }

    setTitle('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      const text = e.currentTarget.value;

      if (text.trim().length === 0) {
        e.preventDefault(); // Ігноруємо натискання пробілу, якщо поле порожнє
      }
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={submitForm}>
        <input
          onChange={handleTitleEvent}
          onKeyDown={handleKeyDown}
          value={title.trimStart()}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
});
