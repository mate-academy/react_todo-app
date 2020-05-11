import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class TodosFilter extends React.Component {
  state = {
    activeFilter: 'All',
  };

  setActiveFilter = (filter) => {
    this.setState({ activeFilter: filter });
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
                selected: activeFilter === 'All',
              })}
              onClick={(e) => {
                const { text } = e.target;

                this.setActiveFilter(text);
                filterSelector(activeFilter);
              }}
            >
              All
            </a>
          </li>

          <li>
            <a
              className={cn({
                selected: activeFilter === 'Active',
              })}
              href="#/active"
              onClick={(e) => {
                const { text } = e.target;

                this.setActiveFilter(text);
                filterSelector(activeFilter);
              }}
            >
              Active
            </a>
          </li>

          <li>
            <a
              className={cn({
                selected: activeFilter === 'Completed',
              })}
              href="#/completed"
              onClick={(e) => {
                const { text } = e.target;

                this.setActiveFilter(text);
                filterSelector(activeFilter);
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
