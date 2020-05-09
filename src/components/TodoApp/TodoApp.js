import React from 'react';
import { TodoList } from '../TodoList/TodoList';
import { AddNewTodo } from '../AddNewTodo/AddNewTodo';

export class TodoApp extends React.Component {
  state = {
    todoList: [],
    lastTodoId: 0,
  }

  addNewTodo = (newTodo) => {
    this.setState(state => (
      {
        todoList: [...state.todoList, newTodo],
        lastTodoId: state.lastTodoId + 1,
      }
    ));
  }

  render() {
    const { lastTodoId, todoList } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <AddNewTodo lastTodoId={lastTodoId} addNewTodo={this.addNewTodo} />
        </header>

        <section className="main">
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList todoList={todoList} />
        </section>

        <footer className="footer">
          <span className="todo-count">
            {todoList.length}
            {' '}
            items left
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

          <button type="button" className="clear-completed">
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}
