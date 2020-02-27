import React, { Component } from 'react';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';

export class App extends Component {
  state = {
    todos: [],
    allTodos: [],
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
      allTodos: [
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
      allTodos: prevState.allTodos.map(todo => (
        todo.id === id
          ? {
            ...todo, completed: !todo.completed,
          }
          : todo
      )),
    }));
  }

  filtered = (event) => {
    let filter = event.target.getAttribute('data-filter');

    if (filter === 'Active') {
      filter = false;
    }

    if (filter === 'Completed') {
      filter = true;
    }

    this.setState(prevState => ({
      allTodos: filter === 'All' ? prevState.todos : prevState.todos.filter(todo => todo.completed === Boolean(filter)),
    }));
  }

  deleteTask = (id) => {
    this.setState(prevState => ({
      allTodos: prevState.allTodos.filter(todo => todo.id !== id),
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  }

  clearedCompleted = () => {
    this.setState(prevState => ({
      allTodos: prevState.allTodos.filter(todo => todo.completed === false),
      todos: prevState.todos.filter(todo => todo.completed === false),
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
        allTodos: prevState.allTodos.map(todo => (
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
        allTodos: prevState.allTodos.map(todo => (
          {
            ...todo,
            completed: false,
          }
        )),
      }));
    }
  }

  render() {
    const { todos, allTodos } = this.state;
    const leftList = todos.filter(todo => todo.completed === false);
    console.log(allTodos);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addTodo={this.addTodo} />
        </header>

        <section className="main">
          <input type="checkbox" id="toggle-all" className="toggle-all" onChange={this.checkedAll} />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            todos={allTodos}
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
              <a href="#/" className="selected" data-filter="All" onClick={this.filtered}>All</a>
            </li>

            <li>
              <a href="#/active" data-filter="Active" onClick={this.filtered}>Active</a>
            </li>

            <li>
              <a href="#/completed" data-filter="Completed" onClick={this.filtered}>Completed</a>
            </li>
          </ul>

          <button type="button" className="clear-completed" onClick={this.clearedCompleted}>
           Clear completed
          </button>
        </footer>
      </section>

    );
  }
}
