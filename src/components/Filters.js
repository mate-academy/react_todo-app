import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export class Filters extends Component {
  state = {

  }

  render() {
    const {
      filter,
      leftItems,
      handleFilter,
      clearCompleted,
    } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">
          {leftItems()}
          {' items left'}
        </span>
        <ul className="filters">
          <li>
            <button
              type="button"
              onClick={() => handleFilter('all')}
              className={cn({ selected: filter === 'all' })}
            >
              All
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => handleFilter('active')}
              className={cn({ selected: filter === 'active' })}
            >
              Active
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => handleFilter('completed')}
              className={cn({ selected: filter === 'completed' })}
            >
              Completed
            </button>
          </li>
        </ul>
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

Filters.propTypes = {
  leftItems: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
