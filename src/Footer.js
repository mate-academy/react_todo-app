import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({
  todoes,
  filterBy,
  isDoneTodoes,
  changeFilter,
  destroyCompleted,
}) => (
  <footer className="footer">
    <span className="todo-count">
      {`${todoes.filter(todo => (!todo.isDone)).length} items left`}
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          className={filterBy === 'All' && 'selected'}
          onClick={() => changeFilter('All')}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={filterBy === 'Active' && 'selected'}
          onClick={() => changeFilter('Active')}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={filterBy === 'Completed' && 'selected'}
          onClick={() => changeFilter('Completed')}
        >
          Completed
        </a>
      </li>
    </ul>

    {isDoneTodoes && (
      <button
        type="button"
        onClick={destroyCompleted}
        className="clear-completed"
      >
        Clear completed
      </button>
    )}

  </footer>
);

Footer.propTypes = {
  todoes: PropTypes.shape({
    idDone: PropTypes.bool,
  }).isRequired,
  filterBy: PropTypes.string.isRequired,
  isDoneTodoes: PropTypes.string.isRequired,
  changeFilter: PropTypes.func,
  destroyCompleted: PropTypes.func,
};

Footer.defaultProps = {
  changeFilter: null,
  destroyCompleted: null,
};

export default Footer;
