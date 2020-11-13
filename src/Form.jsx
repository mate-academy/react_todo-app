import React, { useState } from 'react';

export const Form = ({ addNewTodo }) => {
  const [newTodo, setNewTodo] = useState('');

  const enterNewTodo = (event) => {
    const { value } = event.target;

    setNewTodo(value);
  };

  const sandNewTodo = (event) => {
    event.preventDefault();

    addNewTodo(newTodo);
    setNewTodo('');
  };

  return (
    <form
      onSubmit={sandNewTodo}
    >
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodo}
        onChange={enterNewTodo}
      />
    </form>
  );
};
