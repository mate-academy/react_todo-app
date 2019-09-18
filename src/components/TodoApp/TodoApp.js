import React, { Component } from 'react';
import './TodoApp.scss';
import { TodoAppTypes } from '../../constants/proptypes';

export default class TodoApp extends Component {
  state = {
    todoTitle: '',
  };

  onTodoAppSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.todoTitle);
    this.setState({ todoTitle: '' });
  };

  onInputChange = (value) => {
    this.setState({ todoTitle: value });
  };

  render() {
    const { onTodoAppSubmit, onInputChange } = this;

    return (
      <form onSubmit={e => onTodoAppSubmit(e)}>
        <input
          className="new-todo"
          type="text"
          placeholder="What needs to be done?"
          onChange={e => onInputChange(e.target.value)}
          value={this.state.todoTitle}
        />
      </form>
    );
  }
}

TodoApp.propTypes = TodoAppTypes;
