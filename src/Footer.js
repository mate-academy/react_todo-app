import React from 'react';
import PropTypes from 'prop-types';
import TodosFilter from './TodosFilter';

const filterButtons = [
  {
    href: '#/',
    text: 'All',
  },
  {
    href: '#/active',
    text: 'Active',
  },
  {
    href: '#/completed',
    text: 'Completed',
  },
];

const Footer = ({ noComlpetedTodo, onFilteredTodos }) => (
  <footer className="footer">
    <span className="todo-count">
      {noComlpetedTodo}
      {' '}
      items left
    </span>

    <ul className="filters">
      {filterButtons.map(button => (
        <TodosFilter {...button} key={button.text} />
      ))}
    </ul>
    <button type="button" className="clear-completed">
      Clear completed
    </button>
  </footer>
);

Footer.propTypes = {
  noComlpetedTodo: PropTypes.number.isRequired,
  onFilteredTodos: PropTypes.func.isRequired,
};

export default Footer;
