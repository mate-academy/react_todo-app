import React, { useState } from 'react';
import PropTypes, { shape } from 'prop-types';

export const AddTodos = ({ todos, setTodos }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const addNewTodo = (event) => {
    event.preventDefault();

    if (newTodoTitle.trim() === '') {
      return;
    }

    setTodos(prevTodos => [...prevTodos, {
      title: newTodoTitle,
      id: todos.length === 0 ? 1
        : todos.reduce((accum, currentTodo) => (
          accum > currentTodo.id ? accum : currentTodo.id),
        0) + 1,
      completed: false,
    }]);

    setNewTodoTitle('');
  };

  return (
    <form onSubmit={event => addNewTodo(event)}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodoTitle}
        onChange={({ target }) => setNewTodoTitle(target.value)}
      />
    </form>
  );
};

AddTodos.propTypes = {
  todos: PropTypes.arrayOf(shape({
    id: PropTypes.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  setTodos: PropTypes.func.isRequired,
};
