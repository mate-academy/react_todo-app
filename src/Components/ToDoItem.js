import React, { Component } from 'react';

class ToDoItem extends Component {
  render() {
    const {
      item, index, deleteItem, toggleItem,
    } = this.props;
    const isCompleted = item.done ? `completed` : ``;

    return (
      <li className={isCompleted}>
        <div className="view">
          <input type="checkbox" className="toggle" id={`todo-${item.id}`} checked={item.done} onChange={() => toggleItem(index)} />
          <label htmlFor={`todo-${item.id}`}>{item.text}</label>
          <button type="button" className="destroy" onClick={() => deleteItem(index)} />
        </div>
      </li>
    );
  }
}

export default ToDoItem;
