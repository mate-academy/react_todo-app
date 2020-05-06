import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class TodosFilter extends Component {
  state = {
    activeFilter: 'all',
  }

  handleFilterChange = (appliedFilter) => {
    const { filterTodoList } = this.props;

    this.setState({
      activeFilter: appliedFilter,
    }, () => filterTodoList(appliedFilter));
  }

  render() {
    const {
      todoList,
      handleClearCompleted,
    } = this.props;

    const { activeFilter } = this.state;

    const activeTodoCount = (todoList
      .filter(({ completed }) => !completed) || []
    ).length;

    return (
      <footer className="footer">
        <span className="todo-count">
          {activeTodoCount}
          {' '}
          items left
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className={classNames({ selected: activeFilter === 'all' })}
              onClick={() => this.handleFilterChange('all')}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              className={classNames({ selected: activeFilter === 'active' })}
              onClick={() => this.handleFilterChange('active')}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              className={classNames({ selected: activeFilter === 'completed' })}
              onClick={() => this.handleFilterChange('completed')}
            >
              Completed
            </a>
          </li>
        </ul>

        {todoList.length - activeTodoCount > 0 && (
          <button
            type="button"
            className="clear-completed"
            onClick={handleClearCompleted}
          >
            Clear completed
          </button>
        )}
      </footer>
    );
  }
}

TodosFilter.propTypes = {
  filterTodoList: PropTypes.func.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
  todoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};

export default TodosFilter;
