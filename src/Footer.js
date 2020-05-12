import React from 'react';
import PropTypes from 'prop-types';
import Filters from './Filters';

/* eslint-disable max-len */
const Footer = ({ changeFilter, clearCompleted, countOfNotFinishedTodos, typeOfFilter }) => (

  <footer className="footer">
    <span className="todo-count">
      {countOfNotFinishedTodos}
      {' '}
      items left
    </span>
    <Filters
      typeOfFilter={typeOfFilter}
      handleChangeFilter={changeFilter}
    />
    <button
      type="button"
      onClick={clearCompleted}
      className="clear-completed"
    >
      Clear completed
    </button>
  </footer>

);

Footer.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  countOfNotFinishedTodos: PropTypes.number.isRequired,
  typeOfFilter: PropTypes.string.isRequired,
};

export default Footer;
