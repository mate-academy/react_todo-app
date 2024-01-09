import React, { useContext, useState } from 'react';
import { ReducerType } from '../../Types/ReducerType';
import { DispatchContext } from '../../Context/TodoContext';

export const Header: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const [title, setTitle] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim()) {
      dispatch({
        type: ReducerType.AddTodo,
        payload: {
          id: +new Date(),
          title: title.trim(),
          completed: false,
        },
      });
    }

    setTitle('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </form>
    </header>
  );
};
