/* eslint-disable */
import React from 'react';

class ToDosFilter extends React.Component {
  todosFilter = (props) => {
    this.setState({
      currentsFilter: props,
    });
    this.props.injectFilteredTodos(props);
  };
  
  render() {
    return (
      <ul className="filters">
        <li>
          <a onClick={() => this.todosFilter('all')} href="#/">All</a>
        </li>
    
        <li>
          <a onClick={() => this.todosFilter(false)} href="#/active">Active</a>
        </li>
    
        <li>
          <a onClick={() => this.todosFilter(true)} href="#/completed">Completed</a>
        </li>
      </ul>
    )
  }
}

export default ToDosFilter;
