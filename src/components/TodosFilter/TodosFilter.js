import React from 'react';
import PropTypes from 'prop-types';

class TodosFilter extends React.Component {
  handleFilter = (filterName) => {
    this.props.handleFilter(filterName);
  };

  clearCompleted = () => {
    this.props.clear();
  };

  render() {
    return (
      <footer className="footer">
        <span className="todo-count">
          {`${this.props.todos.filter(el => el.completed === false)
            .length
          } items left`}
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className="selected"
              onClick={() => this.handleFilter('All')}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              onClick={() => this.handleFilter('Active')}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              onClick={() => this.handleFilter('Completed')}
            >
              Completed
            </a>
          </li>
        </ul>
        {this.props.isVisible && (
          <button
            type="button"
            className="clear-completed"
            onClick={this.clearCompleted}
          >
            Clear completed
          </button>
        )}
      </footer>
    );
  }
}

export default TodosFilter;

TodosFilter.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  handleFilter: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};
