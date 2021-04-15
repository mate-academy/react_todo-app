import React, { useState } from 'react';

export const TodoForm = ({ updateTodos }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const hanbleSubmit = (event) => {
    event.preventDefault();

    if (inputValue === '') {
      return;
    }

    const createTodo = {
      id: +new Date(),
      title: inputValue,
      completed: false,
    };

    updateTodos(createTodo);
    setInputValue('');
  };

  return (
    <form onSubmit={hanbleSubmit}>
      <input
        type="text"
        value={inputValue}
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={handleInput}
      />
    </form>
  );
};
