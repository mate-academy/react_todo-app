import React from 'react';
import PropTypes from 'prop-types';

function TodosFilter(props) {
  const buttons = [
    { name: 'All' },
    { name: 'Active' },
    { name: 'Completed' },
  ];

  return (
    <ul className="filters">
      {
        buttons.map(button => (
          <li key={button.name}>
            <a
              href={`#/${button.name}`}
              className={props.filterState === button.name ? `selected` : ``}
              onClick={() => props.onFilterChange(button.name)}
            >
              {button.name}
            </a>
          </li>
        ))
      }
    </ul>
  );
}

TodosFilter.defaultProps = {
  filterState: 'All',
  onFilterChange: {},
};

TodosFilter.propTypes = {
  filterState: PropTypes.string,
  onFilterChange: PropTypes.func,
};

export default TodosFilter;
