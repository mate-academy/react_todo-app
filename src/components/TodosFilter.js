/* eslint-disable */
import React from 'react';

class ToDosFilter extends React.Component {
  state = {
    todos: this.props.todos,
  };
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.todos !== this.state.todos) {
      this.setState({ todos: nextProps.todos });
    }
  }
  
  activeFilter = () => {
    const { todos }  = this.state;
    const active = todos.filter(todo => (
      todo.completed !== true
    ));
    this.props.injectFilteredTodos(active)
  };
  
  backToAll = () => {
    this.props.injectFilteredTodos(undefined)
  };
  
  completedFilter = () => {
    const { todos }  = this.state;
    const completed = todos.filter(todo => (
      todo.completed === true
    ));
    this.props.injectFilteredTodos(completed)
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
