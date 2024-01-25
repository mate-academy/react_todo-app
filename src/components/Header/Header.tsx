import React, { useContext, useState } from 'react';
import { TodoUpdateContext } from '../../context/TodoContext';

export const Header: React.FC = () => {
  const [value, setValue] = useState('');

  const { addTodo } = useContext(TodoUpdateContext);

  const newTodo = {
    id: +new Date(),
    title: value.trim(),
    completed: false,
  };

  const handleKeyDown = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(newTodo);
    setValue('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleKeyDown}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </header>
  );
};
