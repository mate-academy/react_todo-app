import React, { Component } from 'react';
import ToDoItem from './ToDoItem';

class ToDoList extends Component {
  render() {
    const {
      todolist, deleteItem, toggleItem, toggleAll,
    } = this.props;

    return (
      <section className="main" style={{ display: `${todolist.length > 0 ? 'block' : 'none'}` }}>
        <input type="checkbox" id="toggle-all" className="toggle-all" onChange={toggleAll} />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list">
          {todolist.map((item, index) => <ToDoItem item={item} index={index} deleteItem={deleteItem} key={item.id} toggleItem={toggleItem} />)}
        </ul>
      </section>
    );
  }
}

export default ToDoList;
