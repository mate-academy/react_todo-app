import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const TodoApp = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = (ev) => {
    setValue(ev.target.value.trim());
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (value.length === 0) {
      return;
    }

    onSubmit(value);
    setValue('');
  };

  return (
    <form className="NewTodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        name="title"
        placeholder="What needs to be done?"
        autoComplete="off"
        value={value}
        onChange={handleChange}
      />
    </form>
  );
};

TodoApp.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
