import React from 'react';
import PropTypes from 'prop-types';
// import todos from '../todos';

export class TodosFilters extends React.Component {
  state ={
    // todos,
    // currentFilter,
  }

  render() {
    const { activeTodoCounter } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">
          {`${activeTodoCounter()} items left`}
        </span>

        <ul className="filters">
          <li>
            <a href="#/" className="selected">All</a>
          </li>

          <li>
            <a href="#/active">Active</a>
          </li>

          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>

        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    );
  }
}

TodosFilters.propTypes = {
  activeTodoCounter: PropTypes.func.isRequired,
};
