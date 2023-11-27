import React, { useContext, useState } from 'react';
import { DispatchContext } from '../../Store';

export const Header: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const [newTitle, setNewTitle] = useState('');
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newTitle.trim()) {
      return;
    }

    dispatch({
      type: 'addTodo',
      payload: {
        id: +new Date(),
        title: newTitle,
        completed: false,
      },
    });
    setNewTitle('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTitle}
          data-cy="createTodo"
          placeholder="What needs to be done?"
          className="new-todo"
          onChange={event => setNewTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
