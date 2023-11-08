import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '../../types/Todo';
import { State } from '../../types/State';
import { useTodosDispatch } from '../TodoContext/TodoContext';

export const Header: React.FC = React.memo(() => {
  const [title, setTitle] = useState('');
  const dispatch = useTodosDispatch();
  const [editedTitle, setEditedTitle] = useState('');

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
    if (e.key === 'Enter' && editedTitle.trim().length > 0) {
      const newTodo: Todo = {
        id: +uuidv4(),
        title: editedTitle.trim(),
        completed: false,
      };

      dispatch({
        type: State.EDIT,
        task: newTodo,
      });
      setEditedTitle('');
    } else if (e.key === ' ') {
      e.preventDefault(); // Ігноруємо натискання пробілу
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
