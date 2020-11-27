import React from 'react';
import PropTypes from 'prop-types';

export const AddTodoForm = ({ title, onSubmit, addTitle }) => (
  <form onSubmit={onSubmit}>
    <input
      type="text"
      className="new-todo"
      placeholder="What needs to be done?"
      value={title}
      onChange={event => addTitle(event.target.value)}
    />
  </form>
);

AddTodoForm.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  addTitle: PropTypes.bool.isRequired,
};
