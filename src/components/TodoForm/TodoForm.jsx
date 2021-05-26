import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const TodoForm = React.memo(({ onAddNewTodo }) => {
  const [newTodo, setNewTodo] = useState({
    id: +new Date(),
    title: '',
    completed: false,
  });

  const handleSubmit = (clickEvent) => {
    clickEvent.preventDefault();

    onAddNewTodo(newTodo);

    setNewTodo({
      id: +new Date(),
      title: '',
      completed: false,
    });
  };

  const handleChangeInput = (handleEvent) => {
    const { value } = handleEvent.target;

    setNewTodo(previousTodo => ({
      ...previousTodo,
      title: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodo.title}
        onChange={handleChangeInput}
      />
    </form>
  );
});

TodoForm.propTypes = {
  onAddNewTodo: PropTypes.func.isRequired,
};
