import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

export const NewTodo = ({ addTodo }) => {
  const [title, setTitle] = useState('');

  const createTodo = useCallback(() => ({
    id: +new Date(),
    title: title.trim(),
    completed: false,
  }
  ), [title]);

  const newTodo = useMemo(() => createTodo(), [createTodo]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }

    addTodo(newTodo);
    setTitle('');
  };

  return (
    <>
      <form onSubmit={(event) => {
        handleSubmit(event);
      }}
      >
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </form>
    </>
  );
};

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
