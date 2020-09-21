import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AddingForm = ({ setTodos }) => {
  const [query, setQuery] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!query) {
      return;
    }

    setTodos(current => (
      [
        ...current,
        { id: +new Date(),
          title: query.trim(),
          completed: false },
      ]
    ));
    setQuery('');
  };

  return (
    <form
      onSubmit={handleFormSubmit}
    >
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={query}
        onChange={({ target }) => {
          setQuery(target.value.trimLeft());
        }}
      />
    </form>
  );
};

AddingForm.propTypes = {
  setTodos: PropTypes.func.isRequired,
};
