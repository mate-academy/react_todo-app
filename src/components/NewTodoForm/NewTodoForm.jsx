import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const NewTodoForm = ({ addNewTodo }) => {
  const [todoTitle, setTodoTitle] = useState('');

  const handleInputChange = (event) => {
    const { value } = event.target;

    setTodoTitle(value);
  };

  const createNewTodo = (event) => {
    event.preventDefault();

    if (!todoTitle.length) {
      return;
    }

    addNewTodo(todoTitle);
    setTodoTitle('');
  };

  return (
    <form onSubmit={createNewTodo}>
      <input
        type="text"
        value={todoTitle}
        onChange={handleInputChange}
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};

NewTodoForm.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
};
