import React from 'react';
import PropTypes from 'prop-types';
import { FILTERS } from './filters';

const TodosFilter = (props) => {
  const { changeVisibleList,
    clearCompletedTodo,
    currentFilter,
    hideClearButton } = props;

  return (

    <>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={currentFilter === FILTERS.all && 'selected'}
            onClick={() => changeVisibleList(FILTERS.all)}
          >
            All
          </a>

        </li>

        <li>
          <a
            className={currentFilter === FILTERS.active ? 'selected' : ''}
            href="#/active"
            onClick={() => changeVisibleList(FILTERS.active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            className={currentFilter === FILTERS.completed ? 'selected' : ''}
            href="#/completed"
            onClick={() => changeVisibleList(FILTERS.completed)}
          >
            Completed
          </a>
        </li>

      </ul>
      {hideClearButton && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => clearCompletedTodo()}
        >
          Clear completed
        </button>
      )}

    </>
  );
};

export default TodosFilter;

TodosFilter.propTypes = {
  changeVisibleList: PropTypes.func.isRequired,
  clearCompletedTodo: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
  hideClearButton: PropTypes.bool.isRequired,
};
