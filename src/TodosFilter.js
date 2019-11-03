import React from 'react';
import propTypes from 'prop-types';

const TodosFilter = ({ handlerFilter }) => {

  return (
    <ul className="filters">
      <li>
        <a href="#/" className="filters--active" onClick={() => handlerFilter('all')}>
          All
        </a>
      </li>

      <li>
        <a href="#/active" className="filters--active" onClick={() => handlerFilter('active')}>
          Active
        </a>
      </li>

      <li>
        <a href="#/completed" className="filters--active" onClick={() => handlerFilter('completed')}>
          Completed
        </a>
      </li>
    </ul>
  );
};

TodosFilter.propTypes = {
  filterAll: propTypes.func,
  filterCompleted: propTypes.func,
  filterActive: propTypes.func,
};

export default TodosFilter;
