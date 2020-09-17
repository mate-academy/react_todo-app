import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AddTodo = ({ onCreate }) => {
  const [value, setValue] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();

    if (value.trim()) {
      onCreate(value);

      setValue('');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
    </form>
  );
};

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
