import React from 'react';
import PropTypes from 'prop-types';

export const NewTodo = ({ inputValue, setInputValue, onTodoAddition }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onTodoAddition(inputValue);
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

NewTodo.propTypes = {
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  onTodoAddition: PropTypes.func.isRequired,
};
