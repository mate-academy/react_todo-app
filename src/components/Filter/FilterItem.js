import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context/Context';

export function FilterItem({ filterName }) {
  const { addFilter, filter } = useContext(Context);

  return (
    <li>
      <a
        href={`#/${filterName}`}
        onClick={() => addFilter(filterName)}
        className={filterName === filter ? 'selected' : ''}
      >
        {filterName}
      </a>
    </li>
  );
}

FilterItem.propTypes = {
  filterName: PropTypes.string.isRequired,
};
