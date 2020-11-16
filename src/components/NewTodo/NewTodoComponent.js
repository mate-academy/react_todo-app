import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const NewTodoComponent = ({ setTodos }) => {
  const [title, setTitle] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;

    setTitle(value);
  };

  const newTodo = (e) => {
    const todo = {
      id: Date.now(),
      title,
      completed: false,
    };

    if (e.key === 'Enter') {
      e.preventDefault();

      if (!title) {
        return;
      }

      setTodos(prevState => [...prevState, todo]);
      setTitle('');
    }
  };

  return (
    <form>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleChange}
        onKeyDown={newTodo}
      />
    </form>
  );
};

NewTodoComponent.propTypes = {
  setTodos: PropTypes.func.isRequired,
};
