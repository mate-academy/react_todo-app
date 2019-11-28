import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TodosFilter = ({ handleFilterBy, sortField }) => (
  <>
    <li>
      <a
        className={classNames({
          selected: sortField === 'active',
        })}
        onClick={() => handleFilterBy('active')}
        href="#/"
      >
        Active
      </a>
    </li>
    <li>
      <a
        className={classNames({
          selected: sortField === 'all',
        })}
        activeClassName={sortField}
        href="#/active"
        onClick={() => handleFilterBy('all')}
      >
      All
      </a>
    </li>
    <li>
      <a
        className={classNames({
          selected: sortField === 'completed',
        })}
        href="#/completed"
        onClick={() => handleFilterBy('completed')}
      >
    Completed
      </a>
    </li>
  </>
);

TodosFilter.propTypes = {
  sortField: PropTypes.string.isRequired,
  handleFilterBy: PropTypes.func.isRequired,
};

export default TodosFilter;
