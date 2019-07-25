import React from 'react';
import PropTypes from 'prop-types';

const TodosFilter = ({ handleFilterBy }) => (
  <>
    <li>
      <a
        onClick={() => handleFilterBy('Active')}
        href="#/"
        className="selected"
      >
    Active
      </a>
    </li>
    <li>
      <a
        href="#/active"
        onClick={() => handleFilterBy('All')}
      >
      All
      </a>
    </li>
    <li>
      <a
        href="#/completed"
        onClick={() => handleFilterBy('Completed')}
      >
    Completed
      </a>
    </li>
  </>
);

TodosFilter.propTypes = {
  handleFilterBy: PropTypes.func.isRequired,
};

export default TodosFilter;
