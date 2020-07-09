/* eslint-disable max-len */
import React from 'react';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';
import { TodoCount } from './components/TodoCount';
import { TodosFilter } from './components/TodosFilter';

export class App extends React.Component {
  state = {
    todos: [],
    isAllSelected: true,
    isActiveSelected: false,
    isCompletedSelected: false,
  };

  componentDidMount() {
    const todosFromStorage = JSON.parse(localStorage.getItem('state')).todos
      ? JSON.parse(localStorage.getItem('state')).todos
      : [];

    this.setState({
      todos: todosFromStorage,
    });
  }

  addNewTodo = (newTodo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
    }),
    () => localStorage.setItem('state', JSON.stringify(this.state)));
  }

  handleCheck = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        const todoCopy = { ...todo };

        if (todo.id === id) {
          todoCopy.completed = !todo.completed;
        }

        return todoCopy;
      }),
    }),
    () => localStorage.setItem('state', JSON.stringify(this.state)));
  }

  handleDelete = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }),
    () => localStorage.setItem('state', JSON.stringify(this.state)));
  }

  toggleAll = () => {
    if (this.state.todos.every(todo => todo.completed === true)) {
      this.setState(prevState => ({
        todos: prevState.todos.map((todo) => {
          const todoCopy = { ...todo };

          todoCopy.completed = false;

          return todoCopy;
        }),
      }),
      () => localStorage.setItem('state', JSON.stringify(this.state)));
    } else {
      this.setState(prevState => ({
        todos: prevState.todos.map((todo) => {
          const todoCopy = { ...todo };

          if (!todoCopy.completed) {
            todoCopy.completed = true;
          }

          return todoCopy;
        }),
      }),
      () => localStorage.setItem('state', JSON.stringify(this.state)));
    }
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: JSON.parse(localStorage.getItem('state')).todos.filter(todo => !todo.completed),
    }),
    () => localStorage.setItem('state', JSON.stringify(this.state)));
  }

  handleFilter = (callback, event) => {
    if (event.target.innerHTML === 'Active') {
      this.setState({
        todos: JSON.parse(localStorage.getItem('state')).todos.filter(callback),
        isAllSelected: false,
        isActiveSelected: true,
        isCompletedSelected: false,
      });
    } else if (event.target.innerHTML === 'Completed') {
      this.setState({
        todos: JSON.parse(localStorage.getItem('state')).todos.filter(callback),
        isAllSelected: false,
        isActiveSelected: false,
        isCompletedSelected: true,
      });
    }
  }

  handleFilterAll = () => {
    this.setState({
      todos: JSON.parse(localStorage.getItem('state')).todos,
      isAllSelected: true,
      isActiveSelected: false,
      isCompletedSelected: false,
    });
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addNewTodo={this.addNewTodo} />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={this.toggleAll}
          />
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>

          <TodoList
            todos={this.state.todos}
            handleCheck={this.handleCheck}
            handleDelete={this.handleDelete}
          />
        </section>

        <footer className="footer">
          <TodoCount
            todoLength={
              this.state.todos
                ? this.state.todos.filter(todo => !todo.completed).length
                : 0}
          />

          <TodosFilter
            handleFilter={this.handleFilter}
            handleFilterAll={this.handleFilterAll}
            isAllSelected={this.state.isAllSelected}
            isActiveSelected={this.state.isActiveSelected}
            isCompletedSelected={this.state.isCompletedSelected}
          />

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

export default App;
