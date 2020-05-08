import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodosFilter extends Component {
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
        {this.buttons.map(({ name, label }) => (
          <li key={name}>
            <a
              href={`#${name}`}
              name={name}
              className={filter === name ? 'selected' : null}
              onClick={this.clickFilter}
            >
              {label}
            </a>
          </li>
        ))
        }
      </ul>
    );
  }
}

TodosFilter.propTypes = {
  clickFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default TodosFilter;
