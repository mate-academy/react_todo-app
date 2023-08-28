import React, { useState } from 'react';
import { useTodosContext } from '../../context';

export const AddTodoForm = () => {
  const { addTodo } = useTodosContext();
  const [inputValue, setInputValue] = useState('');

  const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <form
      method="POST"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={handleInputValue}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
};
