import React from 'react';
import PropTypes from 'prop-types';

class TodosFilters extends React.Component {
  tabs = ['All', 'Active', 'Completed'];

  state = { activeTabIndex: 0 };

  handleClick = (i, tab) => {
    this.props.filterTodos(tab);
    this.setState({ activeTabIndex: i });
  };

  render() {
    return (
      <ul className="filters">
        {this.tabs.map((tab, index) => (
          <li key={tab}>
            <a
              href="#/"
              onClick={() => this.handleClick(index, tab)}
              className={this.state.activeTabIndex === index ? 'selected' : ''}
            >
              {tab}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

TodosFilters.propTypes = {
  filterTodos: PropTypes.func.isRequired,
};

export default TodosFilters;
