import React from 'react';
import PropTypes from 'prop-types';

export const AddForm = ({ onChange, onSubmit }) => (
  <form onSubmit={event => onSubmit(event)}>
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      onChange={event => onChange(event.target.value)}
    />
  </form>
);

AddForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
