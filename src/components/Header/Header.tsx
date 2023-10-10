/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useContext } from 'react';
import { DispatchTodos } from '../TodosContext/TodosContext';

type Props = {};

export const Header: React.FC<Props> = () => {
  const [value, setValue] = useState('');
  const dispatch = useContext(DispatchTodos);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    dispatch({
      type: 'addTodo',
      newTodo: {
        id: +new Date(),
        title: value,
        completed: false,
      },
    });

    event.preventDefault();

    setValue('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={event => handleSubmit(event)}>
        <input
          value={value}
          onChange={handleChange}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
