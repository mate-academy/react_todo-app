import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const TodoFilter = ({ filterChange }) => {
  const [selected, setSelected] = useState(false);
  const handleClick = (filter) => {
    filterChange(filter);
    setSelected(true);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={`${selected} ? 'selected' : ''`}
          onClick={() => handleClick('All')}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={`${selected} ? 'selected' : ''`}
          onClick={() => handleClick('Active')}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={`${selected} ? 'selected' : ''`}
          onClick={() => handleClick('Completed')}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

TodoFilter.propTypes = {
  filterChange: PropTypes.func.isRequired,
};
