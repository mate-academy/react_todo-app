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
  const todosLeft = todos.filter(todo => !todo.completed).length;

  const changeFilter = (filterType) => {
    selectFilter(filterType);
    filter(filterType);
  };

  return (
    <>
      <span className="todo-count">
        {`${todosLeft} ${todosLeft !== 1 ? 'items' : 'item'} left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href={`#/${all}`}
            className={ClassNames(
              { selected: selectedFilter === all },
            )}
            type="button"
            onClick={() => {
              changeFilter(all);
            }}
          >
            All
          </a>
        </li>

        <li>
          <a
            href={`#/${active}`}
            className={ClassNames(
              { selected: selectedFilter === active },
            )}
            type="button"
            onClick={() => {
              changeFilter(active);
            }}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href={`#/${completed}`}
            className={ClassNames(
              { selected: selectedFilter === completed },
            )}
            type="button"
            onClick={() => {
              changeFilter(completed);
            }}
          >
            Completed
          </a>
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
