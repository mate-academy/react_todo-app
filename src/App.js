import React, { Component } from 'react';
import * as cx from 'classnames';

import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';

export class App extends Component {
  state = {
    todos: [],
    visibleTodos: [],
    filter: 'All',
  }

  componentDidMount() {
    const persistedNotes = localStorage.getItem('todos');

    if (persistedNotes) {
      const todos = JSON.parse(persistedNotes);

      this.setState({ todos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        todo,
      ],
      visibleTodos: [
        ...prevState.todos,
        todo,
      ],
    }));
  }

  toggledCheck = (id, checked) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        todo.id === id
          ? {
            ...todo, completed: checked,
          }
          : todo
      )),
      visibleTodos: prevState.visibleTodos.map(todo => (
        todo.id === id
          ? {
            ...todo, completed: checked,
          }
          : todo
      )),
    }));
  }

  filtered = (event) => {
    let filter = event.target.getAttribute('data-filter');

    switch (filter) {
      case 'Active':
        filter = false;
        break;

      case 'Completed':
        filter = true;
        break;
      default:
    }

    this.setState(prevState => ({
      visibleTodos: filter === 'All'
        ? prevState.todos
        : prevState.todos.filter(todo => todo.completed === Boolean(filter)),
      filter,
    }));
  }

  deleteTask = (id) => {
    this.setState(prevState => ({
      visibleTodos: prevState.visibleTodos.filter(todo => todo.id !== id),
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  }

  clearedCompleted = () => {
    this.setState(prevState => ({
      visibleTodos: prevState.visibleTodos.filter(
        todo => !todo.completed,
      ),
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  checkedAll = (event) => {
    if (event.target.checked) {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => (
          {
            ...todo,
            completed: true,
          }
        )),
        visibleTodos: prevState.visibleTodos.map(todo => (
          {
            ...todo,
            completed: true,
          }
        )),
      }));
    } else {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => (
          {
            ...todo,
            completed: false,
          }
        )),
        visibleTodos: prevState.visibleTodos.map(todo => (
          {
            ...todo,
            completed: false,
          }
        )),
      }));
    }
  }

  render() {
    const { todos, visibleTodos, filter } = this.state;
    const leftList = todos.filter(todo => !todo.completed);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addTodo={this.addTodo} />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={this.checkedAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            todos={visibleTodos}
            toggledCheck={this.toggledCheck}
            deleteTask={this.deleteTask}
          />
        </section>

        <footer className="footer">
          <span className="todo-count">
            {leftList.length}
             items left
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={
                  cx({ selected: filter === 'All' })
                }
                data-filter="All"
                onClick={this.filtered}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={
                  cx({ selected: filter === false })
                }
                data-filter="Active"
                onClick={this.filtered}
              >
              Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={
                  cx({ selected: filter === true })
                }
                data-filter="Completed"
                onClick={this.filtered}
              >
              Completed
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            onClick={this.clearedCompleted}
          >
           Clear completed
          </button>
        </footer>
      </section>

    );
  }
}
