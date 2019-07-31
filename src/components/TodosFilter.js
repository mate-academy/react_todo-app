/* eslint-disable */
import React from 'react';

class ToDosFilter extends React.Component {
  activeFilter = () => {
    this.props.injectFilteredTodos(false)
  };
  
  backToAll = () => {
    this.props.injectFilteredTodos('all')
  };
  
  completedFilter = () => {
    this.props.injectFilteredTodos(true)
  };
  
  render() {
    return (
      <ul className="filters">
        <li>
          <a onClick={this.backToAll} href="#/" className="selected">All</a>
        </li>
    
        <li>
          <a onClick={this.activeFilter} href="#/active">Active</a>
        </li>
    
        <li>
          <a onClick={this.completedFilter} href="#/completed">Completed</a>
        </li>
      </ul>
    )
  }
}

export default ToDosFilter;
