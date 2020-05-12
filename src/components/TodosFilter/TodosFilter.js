import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

export const TodosFilter = ({ viewStatus, handleChangeViewStatus }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={ClassNames(viewStatus === 'All' ? 'selected' : '')}
        onClick={() => handleChangeViewStatus('All')}
      >
        All
      </a>
    </li>
    <li>
      <a
        href="#/active"
        className={ClassNames(viewStatus === 'Active' ? 'selected' : '')}
        onClick={() => handleChangeViewStatus('Active')}
      >
        Active
      </a>
    </li>
    <li>
      <a
        href="#/completed"
        className={ClassNames(viewStatus === 'Completed' ? 'selected' : '')}
        onClick={() => handleChangeViewStatus('Completed')}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodosFilter.propTypes = {
  viewStatus: PropTypes.string.isRequired,
  handleChangeViewStatus: PropTypes.func.isRequired,
};
