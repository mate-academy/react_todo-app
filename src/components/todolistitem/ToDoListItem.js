import React, { Component } from 'react';

export default class ToDoListItem extends Component {
  render() {
    const { item, deleteItem, toggleItem } = this.props;
    const isCompleted = item.done ? `completed` : ``;
    return (
      <li className={isCompleted}>
        <div className="view">
          <input type="checkbox" className="toggle" id={`todo-${item.id}`} checked={item.done} onChange={() => toggleItem(item.id)} />
          <label htmlFor={`todo-${item.id}`}>{item.text}
          <button type="button" className="destroy" onClick={() => deleteItem(item.id)}/></label>

        </div>
      </li>
    );
  }
}
