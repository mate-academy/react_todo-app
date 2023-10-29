import React, { useContext, useState } from 'react';
import { TodoContext } from '../TodoContext';

export const Header: React.FC = () => {
  const { todos, setTodos, setVisibleTodos } = useContext(TodoContext);

  const [value, setValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value.trim()) {
      const newTodo = {
        id: +new Date(),
        title: value,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setVisibleTodos([...todos, newTodo]);
      setValue('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
