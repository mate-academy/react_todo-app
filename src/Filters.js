import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const buttons = [
  {
    name: 'All',
  },
  {
    name: 'Active',
  },
  {
    name: 'Completed',
  },
];

const Filters = ({ typeOfFilter, changeFilter }) => (

  <ul className="filters">
    {buttons.map(button => (
      <li key={button.name}>
        <a
          href={`#/${button.name}`}
          className={classNames({
            selected: typeOfFilter === `${button.name}`,
          })}
          onClick={() => changeFilter(`${button.name}`)}
        >
          {button.name}
        </a>
      </li>
    ))}
  </ul>
);

Filters.propTypes = {
  typeOfFilter: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

export default Filters;
