import React from 'react';
import PropTypes from 'prop-types';

class Footer extends React.Component {
  state = {

  }

  render() {
    const {
      selectedFilter, todos, todosFilter, clearCompleted,
    } = this.props;

    return (
      <footer className="footer" style={{ display: 'block' }}>
        <span className="todo-count">
          {(todos.filter(todo => todo.completed === false)).length}
           items left
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className={(selectedFilter === 'All') ? 'selected' : ''}
              onClick={() => todosFilter('All')}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              onClick={() => todosFilter('Active')}
              className={(selectedFilter === 'Active') ? 'selected' : ''}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              onClick={() => todosFilter('Completed')}
              className={(selectedFilter === 'Completed') ? 'selected' : ''}
            >
              Completed
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="clear-completed"
          style={{ display: 'block' }}
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.propTypes = {
  selectedFilter: PropTypes.string,
  todos: PropTypes.arrayOf(PropTypes.object),
  todosFilter: PropTypes.func,
  clearCompleted: PropTypes.func,
}.isRequired;

export default Footer;
