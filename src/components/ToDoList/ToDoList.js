import React, { Component } from 'react';
import ToDoListItem from '../todolistitem/ToDoListItem';

export default class ToDoList extends Component {

  render() {

    const { todolist, onDelete, onToggle } = this.props;
    return (
      <ul className="todo-list">
        {todolist.map(item => <ToDoListItem item={item} key={item.id} deleteItem={onDelete}
        toggleItem={onToggle}
        fullList={todolist}
      />)}
      </ul>
    );
  }
}
