import React from 'react';

export const NewTodo = props => {
  const { value, onChange, onKeyDown } = props;

  const handleInputChange = evt => onChange(evt);

  const handleInputKeyDown = evt => {
    if (evt.keyCode === 13) {
      onKeyDown();
    }
  };

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      value={value}
      onChange={handleInputChange}
      onKeyDown={handleInputKeyDown}
    />
  );
};
