import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AddTodoForm = ({ onTodoAdded }) => {
  const [newTitle, setNewTitle] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    if (!newTitle) {
      return;
    }

    onTodoAdded(newTitle);
    setNewTitle('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={newTitle}
        onChange={({ target }) => {
          setNewTitle(target.value);
        }}
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};

AddTodoForm.propTypes = {
  onTodoAdded: PropTypes.func.isRequired,
};
