import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const CreateTodo = ({ todos, pushTodo }) => {
  const [newTodo, setNewTodo] = useState({
    id: 3,
    title: '',
    completed: false,
  });

  const handleNewTodo = (event) => {
    setNewTodo({
      ...newTodo,
      title: event.target.value,
    });
  };

  const handleKey = (event) => {
    if (event.key === 'Enter') {
      setNewTodo({
        ...newTodo,
        id: todos.length + 1,
        title: '',
      });

      pushTodo(newTodo.title);
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form>
        <input
          type="text"
          value={newTodo.title}
          onChange={handleNewTodo}
          onKeyPress={handleKey}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

CreateTodo.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  pushTodo: PropTypes.func.isRequired,
};
