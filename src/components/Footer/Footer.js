import React from 'react';
import classNames from 'classnames';
import { NavLink, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { footerPropTypes } from '../../propTypes/propTypes';

import { getCompletedLength } from '../../redux/store';
import { deleteAllCompleted } from '../../redux/todos';

const Footer = ({ todosLength, completedLength, ...props }) => {
  const clearBtnClasses = classNames({
    'clear-completed': true,
    'clear-completed--disable': completedLength === 0,
  });

  return (
    <footer className="footer">
      <span className="todo-count">
        { `${todosLength - completedLength} items left` }
      </span>
      <ul className="filters">
        <li>
          <NavLink
            exact="/"
            to="/"
            activeClassName="selected"
          >
            All
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/active"
            activeClassName="selected"
          >
            Active
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/completed"
            activeClassName="selected"
          >
            Completed
          </NavLink>
        </li>
      </ul>

      <button
        onClick={props.deleteAllCompleted}
        type="button"
        className={clearBtnClasses}
      >
        Clear completed
      </button>
    </footer>
  );
};

const mapState = state => ({
  todosLength: state.todos.length,
  completedLength: getCompletedLength(state),
});

const mapActions = {
  deleteAllCompleted,
};

export default connect(mapState, mapActions)(Footer);

Footer.propTypes = footerPropTypes;
