import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Filters extends Component {
  state = {
    currentItem: 1,
  }

  linkList = [
    {
      id: 1, title: 'All',
    },
    {
      id: 2, title: 'Active',
    },
    {
      id: 3, title: 'Completed',
    },
  ]

  clickHandler = (event, id) => {
    event.preventDefault();
    this.setState({ currentItem: id });
    this.props.onFilters(id);
  }

  render() {
    return (
      <ul className="filters">
        {this.linkList.map(link => (
          <li key={link.id}>
            <a
              href={`#/${link.title}`}
              className={this.state.currentItem === link.id ? 'selected' : ''}
              onClick={event => this.clickHandler(event, link.id)}
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

Filters.propTypes = {
  onFilters: PropTypes.func.isRequired,
};
