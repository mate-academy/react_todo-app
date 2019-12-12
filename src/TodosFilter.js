import React from 'react';
import PropTypes from 'prop-types';

class TodosFilter extends React.Component {
  tabs = ['All', 'Active', 'Completed'];

  handleClick = (event) => {
    event.preventDefault();
    this.props.filterTodos(event.target.innerText);
  };

  render() {
    return (
      <ul className="filters">
        {this.tabs.map(tab => (
          <li>
            <a
              href="#/"
              className=""
              onClick={this.handleClick}
            >
              {tab}
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
