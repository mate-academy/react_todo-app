/* eslint-disable */
import React from 'react';

class ToDosFilter extends React.Component {
  todosFilter = (props) => {
    this.props.injectFilteredTodos(props)
  };
  
  render() {
    return (
      <ul className="filters">
        <li>
          <a onClick={() => this.todosFilter('all')} data-filter={'all'} href="#/" className="selected">All</a>
        </li>
    
        <li>
          <a onClick={() => this.todosFilter(false)} data-filter={false} href="#/active">Active</a>
        </li>
    
        <li>
          <a onClick={() => this.todosFilter(true)} data-filter={true} href="#/completed">Completed</a>
        </li>
      </ul>
    )
  }
}

export default ToDosFilter;
