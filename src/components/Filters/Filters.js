import React from 'react';
import PropTypes from 'prop-types';

class Filters extends React.PureComponent {
  state = {
    allSelected: true,
    activeSelected: false,
    completedSelected: false,
  }

  onAllClick = () => {
    this.setState({
      allSelected: true,
      activeSelected: false,
      completedSelected: false,
    });

    this.props.changeFilter(todo => true);
  }

  onActiveClick = () => {
    this.setState({
      allSelected: false,
      activeSelected: true,
      completedSelected: false,
    });

    this.props.changeFilter(todo => !todo.completed);
  }

  onCompletedClick = () => {
    this.setState({
      allSelected: false,
      activeSelected: false,
      completedSelected: true,
    });

    this.props.changeFilter(todo => todo.completed);
  }

  render() {
    return (
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={this.state.allSelected ? 'selected' : ''}
            onClick={this.onAllClick}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={this.state.activeSelected ? 'selected' : ''}
            onClick={this.onActiveClick}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={this.state.completedSelected ? 'selected' : ''}
            onClick={this.onCompletedClick}
          >
            Completed
          </a>
        </li>
      </ul>
    );
  }
}

export default Filters;

Filters.propTypes = {
  changeFilter: PropTypes.func.isRequired,
};
