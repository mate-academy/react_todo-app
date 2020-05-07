import React from 'react';
import PropTypes from 'prop-types';
import { FILTERS } from './filters';

const TodosFilter = ({ handlerChangeList, handleClearCompleted }) => (
  <>
    <ul className="filters">
      <li>
        <a
          href="#/"
          className="selected"
          name="all"
          onClick={() => handlerChangeList(FILTERS.all)}
        >
          All
        </a>

      </li>

      <li>
        <a
          name="active"
          href="#/active"
          onClick={() => handlerChangeList(FILTERS.active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          name="completed"
          href="#/completed"
          onClick={() => handlerChangeList(FILTERS.completed)}
        >
          Completed
        </a>
      </li>
    </ul>

    <button
      type="button"
      className="clear-completed"
      onClick={() => handleClearCompleted()}
    >
      Clear completed
    </button>
  </>
);

export default TodosFilter;

TodosFilter.propTypes = {
  handlerChangeList: PropTypes.func.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
};
