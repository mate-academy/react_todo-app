import React from 'react';
import PropTypes from 'prop-types';

const classNames = require('classnames');

function Footer(props) {
  const {
    filterStatut, handlefilter, destroyAllComleted, todos,
  } = props;

  const itemsLeft = todos
    .filter(item => !item.completed).length;

  const footerClass = classNames({
    footer: true,
    hidden: (todos.length < 1),
  });

  const allButtonClass = classNames({
    selected: filterStatut === 'All',
  });

  const activeButtonClass = classNames({
    selected: filterStatut === 'Active',
  });

  const completedButtonClass = classNames({
    selected: filterStatut === 'Completed',
  });

  const clearComletedClass = classNames({
    'clear-completed': true,
    hidden: !todos.some(item => item.completed),
  });

  return (
    <footer className={footerClass}>
      <span className="todo-count">
        {itemsLeft}
        {' '}
        items left
      </span>

      <ul className="filters">
        <li>
          <a
            onClick={() => handlefilter('All')}
            href="#/"
            className={allButtonClass}
          >
            All
          </a>
        </li>

        <li>
          <a
            onClick={() => handlefilter('Active')}
            href="#/active"
            className={activeButtonClass}
          >
            Active
          </a>
        </li>

        <li>
          <a
            onClick={() => handlefilter('Completed')}
            href="#/completed"
            className={completedButtonClass}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className={clearComletedClass}
        onClick={destroyAllComleted}
      >
        {' '}
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  filterStatut: PropTypes.string.isRequired,
  handlefilter: PropTypes.func.isRequired,
  destroyAllComleted: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Footer;
