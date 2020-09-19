import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const NewTodo = ({ onTodoAddition }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onTodoAddition(inputValue);

        setInputValue('');
      }}
    >
      <input
        value={inputValue}
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={e => setInputValue(e.target.value.trimLeft())}
      />
    </form>
  );
};

NewTodo.propTypes = {
  onTodoAddition: PropTypes.func.isRequired,
};
