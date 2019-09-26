/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import TodoList from './Components/TodoList/TodoList';
import NewTodo from './Components/NewTodo/NewTodo';

class App extends Component {
  state = {
    todoList: [],
  };

  addNewTodo = (newTodo) => {
    this.setState(prevState => ({
      todoList: [newTodo, ...prevState.todoList],
    }));
  };

  deleteTodo = (id) => {
    const { todoList } = this.state;
    const index = todoList.findIndex(item => item.id === id);

    this.setState(prevState => ({
      todoList: [
        ...prevState.todoList.slice(0, index),
        ...prevState.todoList.slice(index + 1),
      ],
    }));
  }

  render() {
    const { todoList } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo
            todoListLength={todoList.length}
            addNewTodo={this.addNewTodo}
          />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            <TodoList todos={todoList} deleteTodo={this.deleteTodo} />
          </ul>
        </section>

        <footer
          className="footer"
          style={{
            display: todoList.length
              ? 'block'
              : 'none',
          }}
        >
          <span className="todo-count">
            {`${todoList.length} items left`}
          </span>

          <ul className="filters">
            <li>
              <a href="#/" className="selected">All</a>
            </li>

            <li>
              <a href="#/active">Active</a>
            </li>

            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            style={{ display: 'block' }}
          />
        </footer>
      </section>
    );
  }
}

export default App;
