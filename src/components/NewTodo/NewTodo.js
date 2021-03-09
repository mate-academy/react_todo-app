import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const NewTodo = ({ setTodos }) => {
  const [title, setTitle] = useState('');
  const [counter, setCounter] = useState(1);

  const createTodo = () => ({
    id: counter,
    title: title.trim(),
    completed: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }

    setTodos(todos => [...todos, createTodo()]);
    setCounter(prevCounter => prevCounter + 1);
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
  setTodos: PropTypes.func.isRequired,
};
