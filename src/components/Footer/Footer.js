import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

export const Footer = (props) => {
  const { activeTodos, activeTab, changeFilter, removeCompleted } = props;

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${activeTodos} tasks left`}
      </span>

      <ul className="filters">
        <li>
          <button
            type="button"
            className={cx({ selected: activeTab === 'All' })}
            name="All"
            onClick={changeFilter}
          >
          All
          </button>
        </li>

        <li>
          <button
            type="button"
            className={cx({ selected: activeTab === 'Active' })}
            name="Active"
            onClick={changeFilter}
          >
          Active
          </button>
        </li>

        <li>
          <button
            type="button"
            className={cx({ selected: activeTab === 'Completed' })}
            name="Completed"
            onClick={changeFilter}
          >
          Completed
          </button>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={removeCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  activeTodos: PropTypes.number.isRequired,
  activeTab: PropTypes.string.isRequired,
  removeCompleted: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
};
