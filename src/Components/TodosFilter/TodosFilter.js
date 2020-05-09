import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class TodosFilter extends React.Component {
  state = {
    activeFilter: 'all',
  };

  extractFilter = (href) => {
    const res = href.split('/');

    return res[res.length - 1];
  };

  setActiveFilter = (filter) => {
    if (filter === '') {
      this.setState({ activeFilter: 'all' });
    } else {
      this.setState({ activeFilter: filter });
    }
  }

  render() {
    const {
      filterSelector,
      activeTasksCounter,
      clearButtonStatus,
      removeCheckedTasks,
    } = this.props;
    const { activeFilter } = this.state;

    return (
      <footer className="footer">
        <span className="todo-count">
          unfinished tasks
          {' '}
          {activeTasksCounter()}
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className={cn({
                selected: activeFilter === 'all',
              })}
              onClick={(e) => {
                const { href } = e.target;

                this.setActiveFilter(this.extractFilter(href));

                return filterSelector(this.extractFilter(href));
              }}
            >
              All
            </a>
          </li>

          <li>
            <a
              className={cn({
                selected: activeFilter === 'active',
              })}
              href="#/active"
              onClick={(e) => {
                const { href } = e.target;

                this.setActiveFilter(this.extractFilter(href));

                return filterSelector(this.extractFilter(href));
              }}
            >
              Active
            </a>
          </li>

          <li>
            <a
              className={cn({
                selected: activeFilter === 'completed',
              })}
              href="#/completed"
              onClick={(e) => {
                const { href } = e.target;

                this.setActiveFilter(this.extractFilter(href));

                return filterSelector(this.extractFilter(href));
              }}
            >
              Completed
            </a>
          </li>
        </ul>
        {clearButtonStatus && (
          <button
            type="button"
            className="clear-completed"
            onClick={removeCheckedTasks}

          >
            Clear completed
          </button>
        )}

      </footer>
    );
  }
}

TodosFilter.propTypes = {
  removeCheckedTasks: PropTypes.func.isRequired,
  activeTasksCounter: PropTypes.func.isRequired,
  filterSelector: PropTypes.func.isRequired,
  clearButtonStatus: PropTypes.bool.isRequired,
};

export default TodosFilter;
