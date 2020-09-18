import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

export const TodosFilter = ({
  todoTools,
  filter,
  FILTER_OPT: { all, active, completed },
  selectedFilter,
  selectFilter,
}) => {
  const { todos, updateTodos } = todoTools;

  const changeFilter = (filterType) => {
    selectFilter(filterType);
    filter(filterType);
  };

  return (
    <>
      <span className="todo-count">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <ul className="filters">
        <li>
          <button
            className={ClassNames(
              { selected: selectedFilter === all },
            )}
            type="button"
            onClick={() => {
              changeFilter(all);
            }}
          >
            All
          </button>
        </li>

        <li>
          <button
            className={ClassNames(
              { selected: selectedFilter === active },
            )}
            type="button"
            onClick={() => {
              changeFilter(active);
            }}
          >
            Active
          </button>
        </li>

        <li>
          <button
            className={ClassNames(
              { selected: selectedFilter === completed },
            )}
            type="button"
            onClick={() => {
              changeFilter(completed);
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
          updateTodos(
            todos.filter(todo => !todo.completed),
          );
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
  FILTER_OPT: PropTypes.objectOf(PropTypes.string).isRequired,
  selectedFilter: PropTypes.string.isRequired,
  selectFilter: PropTypes.func.isRequired,
};
