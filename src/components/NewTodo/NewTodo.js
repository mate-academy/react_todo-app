import React from 'react';
import PropTypes from 'prop-types';
import './NewTodo.css';

const NewTodo = ({ onChange, onKeyPress }) => (
  <input
    className="new-todo"
    placeholder="What needs to be done?"
    onChange={onChange}
    onKeyPress={onKeyPress}
  />
);

NewTodo.propTypes = {
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
};

export default NewTodo;
