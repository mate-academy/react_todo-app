import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function FilterButtons({ currentFilter, todosFilter }) {
  return (
    <ul className="filters">

      <li>
        <a
          href="#/"
          id="all"
          className={classNames({ selected: currentFilter === 'all' })}
          onClick={todosFilter}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          id="active"
          onClick={todosFilter}
          className={classNames({ selected: currentFilter === 'active' })}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          id="completed"
          onClick={todosFilter}
          className={classNames({ selected: currentFilter === 'completed' })}
        >
          Completed
        </a>
      </li>

    </ul>
  );
}

FilterButtons.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  todosFilter: PropTypes.func.isRequired,
};

export default FilterButtons;
