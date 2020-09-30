import React, { useState } from 'react';

import PropTypes from 'prop-types';

export function TodoApp ({ handleInput}) {
  const [value, setValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    handleInput(e, value);
    setValue('');
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  )
}

TodoApp.propTypes = {
  handleInput: PropTypes.func.isRequired,
}
