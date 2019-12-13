import React from 'react';
import PropTypes from 'prop-types';

class TodosFilter extends React.Component {
  tabs = ['All', 'Active', 'Completed'];

  state = { activeTabIndex: 0 };

  handleClick = (event, i) => {
    event.preventDefault();
    this.props.filterTodos(event.target.innerText);
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
              onClick={event => this.handleClick(event, index)}
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
