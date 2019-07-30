import React from 'react';
import PropTypes from 'prop-types';

class Filters extends React.Component {
  state = {
    filterButton: {
      all: true,
      active: false,
      completed: false,
    },
  };

  handleClick = (event) => {
    const filter = event.target.name;

    if (filter) {
      this.setState({
        filterButton: {
          all: false,
          active: false,
          completed: false,
          [filter]: true,
        },
      });

      this.props.setFilter(filter);
    }
  };

  render() {
    return (
      <ul className="filters">
        <li>
          <a
            href="#/"
            name="all"
            className={this.state.filterButton.all ? 'selected' : ''}
            onClick={this.handleClick}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            name="active"
            className={this.state.filterButton.active ? 'selected' : ''}
            onClick={this.handleClick}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            name="completed"
            className={this.state.filterButton.completed ? 'selected' : ''}
            onClick={this.handleClick}
          >
            Completed
          </a>
        </li>
      </ul>
    );
  }
}

Filters.propTypes = {
  setFilter: PropTypes.func.isRequired,
};
export default Filters;
