import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const TodoApp = ({ getTodo }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodo, setNewTodo] = useState({});

  const onKeyDown = (event) => {
    if ((event.keyCode === 13)) {
      setNewTodo({
        id: +new Date(),
        title: newTodoTitle,
        completed: false,
      });

      setNewTodoTitle('');
    }
  };

  useEffect(() => {
    getTodo(newTodo);
  }, [newTodo]);

  return (
    <form
      onSubmit={event => event.preventDefault()}
    >
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodoTitle}
        onKeyDown={onKeyDown}
        onChange={event => setNewTodoTitle(event.target.value)}
      />
    </form>
  );
};

TodoApp.propTypes = {
  getTodo: PropTypes.func.isRequired,
};
