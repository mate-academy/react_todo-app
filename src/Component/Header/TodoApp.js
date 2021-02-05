import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/todo-list.css';
import '../../styles/index.css';
import '../../styles/filters.css';

export const TodoApp = ({ onAdd, todos }) => {
  const [title, setTitle] = useState('');

  const addTodo = (event) => {
    event.preventDefault();

    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    onAdd(newTodo);

    setTitle('');
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
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ),
};

TodoApp.defaultProps = {
  todos: [],
};
