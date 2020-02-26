<<<<<<< HEAD
import React, { Component } from 'react';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';

export class App extends Component {
  state = {
    todos: [],
  }

  // componentDidMount() {
  //   const persistedNotes = localStorage.getItem('todos');
  //
  //   if (persistedNotes) {
  //     const todos = JSON.parse(persistedNotes);
  //
  //     this.setState({ todos });
  //   }
  // }
  //
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.todos !== this.state.todos) {
  //     localStorage.setItem('todos', JSON.stringify(this.state.todos));
  //   }
  // }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        todo,
      ],
    }));
  }

  toggledCheck = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        todo.id === id
          ? {
            ...todo, completed: !todo.completed,
          }
          : todo
      )),
    }));
  }

  deleteTask = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  }

  render() {
    const { todos } = this.state;
    const leftList = todos.filter(todo => todo.completed === false);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addTodo={this.addTodo} />
        </header>

        <section className="main">
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            todos={todos}
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
=======
import React from 'react';

function App() {
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos App</h1>

        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus=""
        />
      </header>

      <section className="main" style={{ display: 'block' }}>
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          <li className="">
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>sdfsdfsdf</label>
              <button className="destroy"></button>
            </div>
          </li>
          <li className="">
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>dsfgsdfgdsrg</label>
              <button className="destroy"></button></div>
          </li>
          <li className="">
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>sddfgdfgdf</label>
              <button className="destroy"></button>
            </div>
          </li>
        </ul>
>>>>>>> b4ae3916edab124d6c23e6e389c933f2cc5f950e
      </section>

    );
  }
}
