import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const TodoApp = ({ newTodo }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (query.trim()) {
      newTodo({
        id: +new Date(),
        title: query,
        completed: false,
      });
    }

    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        value={query}
        placeholder="What needs to be done?"
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
    </form>
  );
};

TodoApp.propTypes = {
  newTodo: PropTypes.func.isRequired,
};
