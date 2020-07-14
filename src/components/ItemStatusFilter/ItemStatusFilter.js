import React, { Component } from 'react';

export class ItemStatusFilter extends Component {
  links = [
    {
      name: 'all',
      label: 'All',
      url: '#/',
    },
    {
      name: 'active',
      label: 'Active',
      url: '#/active',
    },
    {
      name: 'completed',
      label: 'Complete',
      url: '#/completed',
    },
  ];

  render() {
    const { filter, onFilterChange } = this.props;

    const links = this.links.map(({ name, label, url }) => {
      const isActive = filter === name;
      const classNames = isActive ? 'selected' : '';

      return (
        <a
          href={url}
          className={classNames}
          key={name}
          onClick={() => onFilterChange(name)}
        >
          {label}
        </a>
      );
    });

    return (
      <ul className="filters">
        <li>
          {links}
        </li>
      </ul>
    );
  }
}
