import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

const TodoFilter = ({ show, setFilter }) => {
  const linkAllClass = ClassNames(
    { selected: show === 'all' }
  );
  const linkActivelClass = ClassNames(
    { selected: show === 'active' }
  );
  const linkCompletedClass = ClassNames(
    { selected: show === 'completed' }
  );

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={linkAllClass}
          onClick={() => setFilter('all')}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={linkActivelClass}
          onClick={() => setFilter('active')}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={linkCompletedClass}
          onClick={() => setFilter('completed')}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

TodoFilter.propTypes = {
  show: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default TodoFilter;
