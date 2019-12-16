import React from 'react';
import PropTypes from 'prop-types';

class TodosFilter extends React.Component {
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
          <li>
            <a
              href="#/"
              className={this.state.activeTabIndex === index ? 'selected' : ''}
              onClick={() => this.handleClick(index, tab)}
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
