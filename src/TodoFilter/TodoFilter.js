import React from 'react';
import PropTypes from 'prop-types';

class TodoFilter extends React.Component {
  static propTypes = {
    onFilterClick: PropTypes.func.isRequired,
  };

  state = {
    selected: '',
  };

  filterTodo = (event) => {
    event.preventDefault();
    const activeFilter = event.target.href.split('/').slice(-1)[0];

    this.setState({ selected: activeFilter });
    this.props.onFilterClick(activeFilter);
  };

  isActive = value => (value === this.state.selected ? 'selected' : '');

  render() {
    return (
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={this.isActive('')}
            onClick={this.filterTodo}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={this.isActive('active')}
            onClick={this.filterTodo}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={this.isActive('completed')}
            onClick={this.filterTodo}
          >
            Completed
          </a>
        </li>
      </ul>
    );
  }
}

export default TodoFilter;
