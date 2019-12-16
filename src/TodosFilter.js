import React from 'react';
import PropTypes from 'prop-types';

const filters = ['All', 'Active', 'Completed'];

class TodosFilter extends React.Component {
  state = {
    selected: 'All',
  }

  handleClick = (event, filter) => {
    event.preventDefault();

    if (filter === 'All') {
      this.props.filterTodos('all');
    } else if (filter === 'Active') {
      this.props.filterTodos(false);
    } else {
      this.props.filterTodos(true);
    }

    this.setState({
      selected: filter,
    });
  }

  render() {
    return (
      <ul className="filters">
        {filters.map(filter => (
          <li key={filter}>
            <a
              href="#/"
              className={this.state.selected === filter ? 'selected' : ''}
              onClick={event => this.handleClick(event, filter)}
            >
              {filter}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

TodosFilter.propTypes = {
  filterTodos: PropTypes.func.isRequired,
};

export default TodosFilter;
