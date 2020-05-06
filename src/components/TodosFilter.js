import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const TodosFilter = ({ filterName, currentActiveItems, setActiveItems }) => (

  <li>
    <a
      href={`#/${filterName}`}
      className={classNames({
        selected: filterName === currentActiveItems,
      })}
      onClick={() => setActiveItems(filterName)}
    >
      { `${filterName[0].toUpperCase()}${filterName.slice(1)}` }
    </a>
  </li>
);

TodosFilter.propTypes = {
  filterName: PropTypes.string.isRequired,
  currentActiveItems: PropTypes.string.isRequired,
  setActiveItems: PropTypes.func.isRequired,
};

export default TodosFilter;
