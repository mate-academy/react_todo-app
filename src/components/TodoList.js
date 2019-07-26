/* eslint-disable */
import React from 'react';

class TodoList extends React.Component {
  todoCheck = (event) => {
    this.props.todoIsCompleted(event.target.dataset.todoid);
  };

  render() {
    const todos = this.props.todos;
    return (
      <ul className="todo-list">
        {todos.length !== 0
          ? todos.map(todo => (
            <li key={todo.id} className="">
              <div className="view">
                <input
                  type="checkbox"
                  className="toggle"
                  id="todo-1"
                  data-todoid={todo.id}
                  checked={todo.completed}
                  onChange={this.todoCheck}
                />
                <label htmlFor="todo-1">{todo.title}</label>
                <button
                  type="button"
                  className="destroy"
                  value={todo.id}
                />
              </div>
            </li>
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
