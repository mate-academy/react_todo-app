import React from 'react';

import { TodoFiltersTypes } from '../PropTypes/PropTypes';

class Filters extends React.Component {
  state = {
    active: '',
  }

  render() {
    const { active } = this.state;
    const { nonCompletedCount } = this.props;

    return (
      <footer className="footer" style={{ display: this.props.footerDisplay }}>
        <span className="todo-count">
          {nonCompletedCount()}
        </span>

        <ul className="filters">
          <li>
            <a
              className={active === 1 ? 'selected' : ''}
              href="#/"
              onClick={this.props.allTodosToShowSorting}
              onFocus={() => this.setState({ active: 1 })}
            >
              All
            </a>
          </li>

          <li>
            <a
              className={active === 2 ? 'selected' : ''}
              href="#/active"
              onClick={this.props.nonCompletedTodosSorting}
              onFocus={() => this.setState({ active: 2 })}
            >
              Active
            </a>
          </li>

          <li>
            <a
              className={active === 3 ? 'selected' : ''}
              href="#/completed"
              onClick={this.props.completedTodosSorting}
              onFocus={() => this.setState({ active: 3 })}
            >
              Completed
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="clear-completed"
          style={{ display: 'block' }}
          onClick={this.props.clearCompleted}
        >
          {this.props.completedAppears() && 'Clear completed' }
        </button>
      </footer>
    );
  }
}

Filters.propTypes = TodoFiltersTypes;

export default Filters;
