import React from 'react';
import PropTypes from 'prop-types';
import { FILTERS } from './filters';
import Filter from './Filter';

const TodosFilter = (props) => {
  const { changeVisibleList,
    clearCompletedTodo,
    currentFilter,
    hideClearButton }
    = props;

  return (

    <>
      <ul className="filters">
        {Object.values(FILTERS).map(filter => (
          <li key={filter}>
            <Filter
              filter={filter}
              changeVisibleList={changeVisibleList}
              currentFilter={currentFilter}
            />
          </li>
        ))}

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
