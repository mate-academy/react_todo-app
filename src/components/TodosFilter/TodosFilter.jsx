import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

export const TodosFilter = ({
  todoTools,
  filter,
  selectedFilter,
  selectFilter,
}) => {
  const { todos, updateTodos } = todoTools;

  return (
    <>
      <span className="todo-count">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <ul className="filters">
        <li>
          <button
            className={ClassNames(
              { selected: selectedFilter === 'All' },
            )}
            value="All"
            type="button"
            onClick={({ target }) => {
              filter(target.value);
            }}
          >
            All
          </button>
        </li>

        <li>
          <button
            className={ClassNames(
              { selected: selectedFilter === 'Active' },
            )}
            value="Active"
            type="button"
            onClick={({ target }) => {
              selectFilter(target.value);
              filter(target.value);
            }}
          >
            Active
          </button>
        </li>

        <li>
          <button
            className={ClassNames(
              { selected: selectedFilter === 'Completed' },
            )}
            value="Completed"
            type="button"
            onClick={({ target }) => {
              selectFilter(target.value);
              filter(target.value);
            }}
          >
            Completed
          </button>
        </li>
      </ul>

      <button
        hidden={!todos.some(todo => todo.completed)}
        type="button"
        className="clear-completed"
        onClick={() => {
          const updatedTodos = todos.filter(todo => !todo.completed);

          updateTodos(updatedTodos);
          localStorage.setItem('todos', JSON.stringify(updatedTodos));
        }}
      >
        Clear completed
      </button>
    </>
  );
};

TodosFilter.propTypes = {
  todoTools: PropTypes.shape({
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateTodos: PropTypes.func.isRequired,
  }).isRequired,
  filter: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
  selectFilter: PropTypes.func.isRequired,
};
