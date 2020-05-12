import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const FILTERS = {
  all: 'All',
  completed: 'Completed',
  active: 'Active',
};

export class TodosFilter extends Component {
  buttons = [
    {
      name: 'all', label: 'All',
    },
    {
      name: 'active', label: 'Active',
    },
    {
      name: 'completed', label: 'Completed',
    },
  ]

  clickFilter = (e) => {
    e.preventDefault();
    this.props.clickFilter(e.target.name);
  }

  render() {
    const { filter } = this.props;

    return (
      <ul className="filters">
        {Object.keys(FILTERS).map(name => (
          <li key={name}>
            <a
              href={`#${name}`}
              name={name}
              className={filter === name ? 'selected' : null}
              onClick={this.clickFilter}
            >
              {FILTERS[name]}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

TodosFilter.propTypes = {
  clickFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
