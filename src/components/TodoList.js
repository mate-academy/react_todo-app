/* eslint-disable */
import React from 'react';
import Todo from './Todo';

class TodoList extends React.Component {
  todoCheck = (event) => {
    this.props.todoIsCompleted(event.target.dataset.todoid);
  };
  
  removeItem = (event) => {
    this.props.removeFromState(event.target.value)
  };

  render() {
    const todos = this.props.todos;
    return (
      <ul className="todo-list">
        {todos.length !== 0
          ? todos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              todoCheck={this.todoCheck}
              removeItem={this.removeItem}
            />
          ))
          : <li className="">
              <div className="view">
                <label htmlFor="todo-1">No todo yet</label>
              </div>
            </li>
        }
      </ul>
    );
  }
}

export default TodoList;
