import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/index.css';

export const TodoApp = ({ onAdd, userId }) => {
  const [title, setTitle] = useState('');

  const addTodo = (event) => {
    event.preventDefault();

    if (title.length > 0) {
      const newTodo = {
        userId,
        id: +new Date(),
        title,
        completed: false,
      };

      onAdd(newTodo);

      setTitle('');
    }
  };

  return (
    <div>
      <form
        className="addTodo"
        onSubmit={addTodo}
      >
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </div>
  );
};

TodoApp.propTypes = {
  onAdd: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
