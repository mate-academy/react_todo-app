import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const NewTodo = ({ setTodos }) => {
  const [newTodoQuery, setTodo] = useState('');

  const handleInput = (e) => {
    const { value } = e.target;

    setTodo(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodoQuery) {
      setTodos(prevTodos => (
        [...prevTodos,
          {
            id: +new Date(),
            title: newTodoQuery,
            completed: false,
          }]
      ));

      setTodo('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodoQuery}
        onChange={handleInput}
      />
    </form>
  );
};

NewTodo.propTypes = {
  setTodos: PropTypes.func.isRequired,
};
