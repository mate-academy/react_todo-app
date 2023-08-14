import React, { useState } from 'react';
import { useTodos } from '../utils/TodoContext';

export const AddTodoForm = () => {
  const [value, setValue] = useState('');
  const { addTodo } = useTodos();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(value.trim());
    setValue('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </form>
  );
};
