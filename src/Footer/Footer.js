import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Footer.css';

export const Footer = (props) => {
  const {
    setFilter,
    active,
    handleClearCompleted,
  } = props;

  return (
    <footer
      className="footer"
    >
      <span
        className="todo-count"
      >
        {props.todosLeftCount()}
      </span>

      <ul
        className="filters"
      >
        <li>
          <button
            type="button"
            className={classNames('footer__button', {
              active: active === 'all',
            })}
            onClick={() => setFilter('all')}
          >
            All
          </button>
        </li>

        <li>
          <button
            type="button"
            className={classNames('footer__button', {
              active: active === 'active',
            })}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
        </li>

        <li>
          <button
            type="button"
            className={classNames('footer__button', {
              active: active === 'completed',
            })}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  active: PropTypes.string.isRequired,
  todosLeftCount: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
};
