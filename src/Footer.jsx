import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames/bind';

const buttonsFilter = [
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

const Footer = ({
  noComlpetedTodo,
  onFilteredTodos,
  clearCompleted,
  visibleClearCompleted,
  filterType,
}) => (
  <footer className="footer">
    <span className="todo-count">
      {noComlpetedTodo}
      {' '}
      items left
    </span>

    <ul className="filters">
      {buttonsFilter.map(button => (
        <li key={button.text}>
          <a
            href={button.href}
            className={cn({ selected: filterType === `${button.text}` })}
            onClick={e => onFilteredTodos(e.target.text)}
          >
            {button.text}
          </a>
        </li>
      ))}
    </ul>
    {visibleClearCompleted
        && (
          <button
            type="button"
            className="clear-completed"
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        )
    }
  </footer>
);

Footer.propTypes = {
  noComlpetedTodo: PropTypes.number.isRequired,
  onFilteredTodos: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  visibleClearCompleted: PropTypes.bool.isRequired,
  filterType: PropTypes.string.isRequired,
};

export default Footer;
