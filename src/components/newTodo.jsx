import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const NewTodo = ({ addTodo }) => {
  const [value, setValue] = useState('');

  const handleChange = (ev) => {
    setValue(ev.target.value);
  };

  return (
    <form>
      <input
        type="text"
        value={value}
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={handleChange}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            ev.preventDefault();
            addTodo(value);
            setValue('');
          }
        }}
      />
    </form>
  );
};

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
