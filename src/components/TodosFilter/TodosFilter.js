import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { FILTERS } from '../../api/FILTERS';

export const TodosFilter = ({
  choosenFilter,
  setChoosenFilter,
}) => {
  const filters = Object.values(FILTERS);

  return (
    <ul className="filters">
      {filters.map(filter => (
        <button
          key={filter}
          type="button"
          onClick={() => setChoosenFilter(filter)}
        >
          <a
            href={`#/${filter}`}
            className={cn({ selected: choosenFilter === filter })}
          >
            {filter}
          </a>
        </button>
      ))}
    </ul>
  );
};

TodosFilter.propTypes = {
  choosenFilter: PropTypes.string.isRequired,
  setChoosenFilter: PropTypes.func.isRequired,
};
