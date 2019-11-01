import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this);
    this.isChecked = this.isChecked.bind(this);
  }

  deleteItem(evt) {
    this.props.onDelete(this.props.todo.id);
  }

  isChecked(evt) {
    this.props.isCompleted(this.props.todo);
  }

  render() {
    return (
      <li className={this.props.todo.completed ? 'completed' : ''}>
        <div className="view">
          <input type="checkbox" onChange={this.isChecked} className="toggle"
                 id={this.props.todo.id} checked={this.props.todo.completed} />
          <label htmlFor={this.props.todo.id}>{this.props.todo.title}</label>
          <button type="button" className="destroy" onClick={this.deleteItem} />
        </div>
      </li>
    );
  }
}

export default TodoItem;
