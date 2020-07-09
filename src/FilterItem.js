import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from './context';

export function FilterItem({ filterName }) {
  const { addFilter } = useContext(Context);

  return (
    <li>
      <a
        href={`#/${filterName}`}
        onClick={() => addFilter(filterName)}
        className="selected"
      >
        {filterName}
      </a>
    </li>
  );
}

FilterItem.propTypes = {
  filterName: PropTypes.string.isRequired,
};
