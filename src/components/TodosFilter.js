import React from 'react';
import PropTypes from 'prop-types';

export class TodosFilter extends React.Component {
  state = {
    activeFilter: 'All',
  }

  setActiveFilter = (event) => {
    this.setState({
      activeFilter: event.target.id,
    });
  }

  render() {
    return (
      <ul className="filters">
        <li>
          <a
            id="All"
            onFocus={this.setActiveFilter}
            onClick={this.props.handleStatusChange}
            href="#/"
            className={this.state.activeFilter === 'All' ? 'selected' : ''}
          >
            All
          </a>
        </li>
        <li>
          <a
            id="Active"
            onClick={this.props.handleStatusChange}
            onFocus={this.setActiveFilter}
            href="#/active"
            className={this.state.activeFilter === 'Active' ? 'selected' : ''}
          >
            Active
          </a>
        </li>

        <li>
          <a
            id="Completed"
            onFocus={this.setActiveFilter}
            onClick={this.props.handleStatusChange}
            className={this.state.activeFilter === 'Completed'
              ? 'selected' : ''}
            href="#/completed"
          >
            Completed
          </a>
        </li>
      </ul>
    );
  }
}

TodosFilter.propTypes = {
  handleStatusChange: PropTypes.func.isRequired,
};
