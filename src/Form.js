import React from 'react';
import PropTypes from 'prop-types';

export const Form = (props) => {
  const {
    handleAddTodo,
    handleInputTodoChange,
    inputValue,
  } = props;

  return (
    <form onSubmit={handleAddTodo}>
      <input
        className="new-todo"
        name="new-todo"
        placeholder="What needs to be done?"
        onChange={handleInputTodoChange}
        value={inputValue}
      />
    </form>
  );
};

Form.propTypes = {
  handleAddTodo: PropTypes.func.isRequired,
  handleInputTodoChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};
