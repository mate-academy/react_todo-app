import React from 'react';
import PropTypes from 'prop-types';

const TodoHeader = ({
  handleChange,
  handleSubmit,
  value,
}) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={handleChange}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

TodoHeader.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default TodoHeader;
