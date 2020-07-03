import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

class Footer extends React.Component {

  filteredTodos = filter => (
    this.props.filterTodo(filter)
  );

  clearCompleted = () => (
    this.props.clearCompletedTodos()
  );

  render() {
    return (
      <footer className="footer">
        <span className="todo-count">
          {`${this.props.countActive} items left`}
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              onClick={() => (this.filteredTodos('All'))}
              className={ClassNames({
                selected: this.props.filter === 'All',
              })}
            >
              All
            </a>
          </li>
          <li>
            <a
              href="#/active"
              onClick={() => (this.filteredTodos('Active'))}
              className={ClassNames({
                selected: this.props.filter === 'Active',
              })}
            >
              Active
            </a>
          </li>
          <li>
            <a
              href="#/completed"
              onClick={() => (this.filteredTodos('Completed'))}
              className={ClassNames({
                selected: this.props.filter === 'Completed',
              })}
            >
              Completed
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="clear-completed"
          onClick={this.clearCompleted}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.propTypes = {
  filterTodo: PropTypes.func.isRequired,
  clearCompletedTodos: PropTypes.func.isRequired,
  countActive: PropTypes.number.isRequired,
};

export default Footer;
