import React from 'react';
import PropTypes from 'prop-types';

function Footer(props) {
  const {
    sortState, handleSort, handleDestroyComleted, todoItemsArr,
  } = props;

  const itemsLeft = todoItemsArr
    .filter(item => !item.completed).length;

  const numberOfComleted = todoItemsArr
    .filter(item => item.completed).length;

  let footerClass = 'footer';

  if (todoItemsArr.length < 1) {
    footerClass += ' hidden';
  }

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
            onClick={() => handleSort('All')}
            href="#/"
            className={sortState === 'All' ? 'selected' : undefined}
          >
            All
          </a>
        </li>

        <li>
          <a
            onClick={() => handleSort('Active')}
            href="#/active"
            className={sortState === 'Active'
              ? 'selected' : undefined}
          >
            Active
          </a>
        </li>

        <li>
          <a
            onClick={() => handleSort('Completed')}
            href="#/completed"
            className={sortState === 'Completed'
              ? 'selected' : undefined}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        style={{ display: numberOfComleted ? 'block' : 'none' }}
        onClick={handleDestroyComleted}
      >
        {' '}
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  sortState: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired,
  handleDestroyComleted: PropTypes.func.isRequired,
  todoItemsArr: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Footer;
