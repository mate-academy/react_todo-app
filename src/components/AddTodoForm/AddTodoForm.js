import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export function AddTodoForm({ setTodos, todos }) {
  const [title, setTitle] = useState('');

  const addTitle = (value) => {
    setTitle(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (title.trim().length === 0) {
      return;
    }

    const newTodo = {
      title,
      id: uuidv4(),
      completed: false,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={event => addTitle(event.target.value)}
      />
    </form>
  );
}

AddTodoForm.propTypes = {
  setTodos: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};
