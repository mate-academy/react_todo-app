import React from 'react';
import PropTypes from 'prop-types';
import { TodoType } from '../../types';

export const TodosFilter = React.memo(({
  setFilter,
  removeCompletedTodos,
  todos,
  filterBy,
}) => {
  const filteredTodosLength = todos.filter(todo => !todo.completed).length;

  const removeHandler = () => {
    removeCompletedTodos(todos.filter(todo => !todo.completed));
    setFilter('');
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        {(filteredTodosLength > 0
          ? `${filteredTodosLength} items left`
          : `nothing to do`
        )}
      </span>

      <ul className="filters">
        <li onClick={() => setFilter('all')}>
          <a
            href="#/"
            className={filterBy === 'all' ? 'selected' : ''}
          >
            All
          </a>
        </li>

        <li onClick={() => setFilter('uncompleted')}>
          <a
            href="#/active"
            className={filterBy === 'uncompleted' ? 'selected' : ''}
          >
            Active
          </a>
        </li>

        <li onClick={() => setFilter('completed')}>
          <a
            href="#/completed"
            className={filterBy === 'completed' ? 'selected' : ''}
          >
            Completed
          </a>
        </li>
      </ul>

      {todos.some(todo => todo.completed) && (
      <button
        onClick={removeHandler}
        type="button"
        className="clear-completed"
      >
        Clear completed
      </button>
      )}
    </footer>
  );
});

TodosFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
  removeCompletedTodos: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(TodoType.isRequired),
  filterBy: PropTypes.string.isRequired,
};

TodosFilter.defaultProps = {
  todos: [],
};
