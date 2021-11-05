import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const Header = ({ onAddTodo }) => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    if (value === '') {
      return;
    }

    const newTodo = {
      id: `${+new Date()}`,
      title: value,
      completed: false,
    };

    onAddTodo(newTodo);
    setValue('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Header.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};
