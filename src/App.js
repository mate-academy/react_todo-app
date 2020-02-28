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

    if (persistedNotes.length > 0) {
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
    const { filter, todos } = this.state;
    const filteredTodos = [...todos, todo];

    this.setState((prevState) => {
      const obj = {
        todos: [...todos, todo],
        visibleTodos: filter === 'All'
          ? filteredTodos
          : filteredTodos.filter(task => task.completed === Boolean(filter)),
      };

      return {
        todos: obj.todos,
        visibleTodos: obj.visibleTodos,
      };
    });
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
        filter = 'All';
        break;
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

  clearCompleted = () => {
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
    const activeTodos = todos.filter(todo => !todo.completed);

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
            checked={todos.length && todos.every(todo => todo.completed)}
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
            {activeTodos.length}
            items left
          </span>

          <ul className="filters">
            <li>
              <button
                type="button"
                className={
                  cx({ selected: filter === 'All' })
                }
                data-filter="All"
                onClick={this.filtered}
              >
                All
              </button>
            </li>

            <li>
              <button
                type="button"
                className={
                  cx({ selected: filter === false })
                }
                data-filter="Active"
                onClick={this.filtered}
              >
                Active
              </button>
            </li>

            <li>
              <button
                type="button"
                className={
                  cx({ selected: filter === true })
                }
                data-filter="Completed"
                onClick={this.filtered}
              >
                Completed
              </button>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            onClick={this.clearCompleted}
          >
            Clear completed
          </button>
        </footer>
      </section>

    );
  }
}
