import React from 'react';
import PropTypes from 'prop-types';
import { KEYCODE } from '../utils/const';

export const NewTodo = (props) => {
  const { value, onChange, onKeyDown } = props;

  const handleInputChange = evt => onChange(evt);

  const handleInputKeyDown = (evt) => {
    if (evt.keyCode === KEYCODE.ENTER) {
      onKeyDown();
    }
  };

  return (
    <input
      type="text"
      className="new-todo"
      placeholder="What needs to be done?"
      value={value}
      onChange={handleInputChange}
      onKeyDown={handleInputKeyDown}
    />
  );
};

NewTodo.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};
