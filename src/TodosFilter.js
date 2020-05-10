import React from 'react';
import PropTypes from 'prop-types';
import { FILTERS } from './filters';

const TodosFilter = (props) => {
  const { handlerChangeList,
    handleClearCompleted,
    currentFilter,
    hideClearButton } = props;

  return (

    <>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={currentFilter === FILTERS.all && 'selected'}
            name="all"
            onClick={() => handlerChangeList(FILTERS.all)}
          >
            All
          </a>

        </li>

        <li>
          <a
            className={currentFilter === FILTERS.active ? 'selected' : ''}
            name="active"
            href="#/active"
            onClick={() => handlerChangeList(FILTERS.active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            className={currentFilter === FILTERS.completed ? 'selected' : ''}
            name="completed"
            href="#/completed"
            onClick={() => handlerChangeList(FILTERS.completed)}
          >
            Completed
          </a>
        </li>

      </ul>
      {hideClearButton && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => handleClearCompleted()}
        >
          Clear completed
        </button>
      )}

    </>
  );
};

export default TodosFilter;

TodosFilter.propTypes = {
  handlerChangeList: PropTypes.func.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
  hideClearButton: PropTypes.bool.isRequired,
};
