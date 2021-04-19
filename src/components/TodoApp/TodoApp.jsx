import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const TodoApp = ({ setTodos, todos }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const todo = {
      title,
      id: +new Date(),
      completed: false,
    };

    setTodos(
      todos ? [todo, ...todos] : [todo],
    );
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
    </form>
  );
};

TodoApp.propTypes = {
  setTodos: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
