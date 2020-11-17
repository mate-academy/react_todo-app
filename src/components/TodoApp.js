import React, { useState } from 'react';

export const TodoApp = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <input
      value={inputValue}
      onChange={handleChange}
      type="text"
      className="new-todo"
      placeholder="What needs to be done?"
    />
  );
};
