import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const NewTodo = ({ addTodo }) => {
  const [todo, setTodo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo.trim().length) {
      addTodo(todo);
    }

    setTodo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={todo}
        onChange={e => setTodo(e.target.value)}
      />
    </form>
  );
};

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
