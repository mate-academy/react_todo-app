import React from 'react';
import PropTypes from 'prop-types';

class TodosFilter extends React.Component {
  state = {
    selected: 'all',
  }

  handleAllClick = (event) => {
    event.preventDefault();

    this.props.filterTodos('all');

    this.setState({
      selected: 'all',
    });
  }

  handleActiveClick = (event) => {
    event.preventDefault();

    this.props.filterTodos(false);

    this.setState({
      selected: 'active',
    });
  }

  handleCompletedClick = (event) => {
    event.preventDefault();

    this.props.filterTodos(true);

    this.setState({
      selected: 'completed',
    });
  }

  render() {
    const { selected } = this.state;

    return (
      <ul className="filters">
        <li>
          <a
            href="#/all"
            className={selected === 'all' ? 'selected' : ''}
            onClick={this.handleAllClick}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={selected === 'active' ? 'selected' : ''}
            onClick={this.handleActiveClick}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={selected === 'completed' ? 'selected' : ''}
            onClick={this.handleCompletedClick}
          >
            Completed
          </a>
        </li>
      </ul>
    );
  }
}

TodosFilter.propTypes = {
  filterTodos: PropTypes.func.isRequired,
};

export default TodosFilter;
