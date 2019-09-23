import React, { Component } from 'react';
import './TodoNew.scss';
import { TodoNewTypes } from '../../constants/proptypes';

export default class TodoNew extends Component {
  state = {
    todoTitle: '',
  };

  onTodoAppSubmit = (e) => {
    e.preventDefault();

    if (this.state.todoTitle) {
      this.props.onSubmit(this.state.todoTitle);
      this.setState({ todoTitle: '' });
    }
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

TodoNew.propTypes = TodoNewTypes;
