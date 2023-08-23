import React, { useContext, useState } from 'react';
import { StateContext } from '../context/StateContext';
import { ActionTypes } from '../types/Action';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  const { dispatch } = useContext(StateContext);

  const handleAddTodo = (
    event: React.FocusEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    dispatch({ type: ActionTypes.ADD_TODO, payload: newTodo });
    setTitle('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleAddTodo}>
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
