import React, { Component } from 'react';

import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import TodosFilter from './components/TodosFilter';

class App extends Component {
  state = {
    todos: [],
    filter: 'all',
  }

  componentDidMount() {
    if (localStorage.todos) {
      this.setState({
        todos: JSON.parse(localStorage.todos),
      });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('todos',
      JSON.stringify(this.state.todos));
  }

  addNewTodo = (value) => {
    if (!value.trim()) {
      return;
    }

    const newTodo = {
      completed: false,
      id: `todo-${new Date().getTime()}`,
      value,
    };

    this.setState(state => ({
      todos: [
        ...state.todos, newTodo,
      ],
    }));
  }

  changeCompleted = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  handleToogleAll = (e) => {
    const { checked } = e.target;

    this.setState(state => ({
      todos: state.todos.map(todo => ({
        ...todo,
        completed: !!checked,
      })),
    }));
  }

  deleteItem = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => todo.id !== id),
    }));
  }

  clearCompleted = () => {
    this.setState(({ todos }) => {
      const clearCompleted = todos.filter(todo => !todo.completed);

      return {
        todos: clearCompleted,
      };
    });
  }

  clickFilter = (name) => {
    this.setState({
      filter: name,
    });
  }

  editTodo = (value, id) => {
    if (!value.trim()) {
      return;
    }

    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            value,
          };
        }

        return todo;
      }),
    }));
  }

  filterStatus = (todos, filter) => {
    switch (filter) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter(todo => todo.completed === false);
      case 'completed':
        return todos.filter(todo => todo.completed === true);
      default:
        return todos;
    }
  }

  render() {
    const { todos, filter } = this.state;
    const remainingTasks = todos.filter(todo => !todo.completed).length;
    const visibleTodos = this.filterStatus(todos, filter);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addNewTodo={this.addNewTodo} />
        </header>

        <section className="main">
          <input
            onChange={this.handleToogleAll}
            type="checkbox"
            id="toggle-all"
            checked={remainingTasks === 0 && visibleTodos.length > 0}
            className="toggle-all"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            onItemClick={this.changeCompleted}
            deleteItem={this.deleteItem}
            editTodo={this.editTodo}
            todos={visibleTodos}
          />
        </section>

        <footer className="footer">
          <span className="todo-count">
            {remainingTasks}
            {' '}
            items left
          </span>
          <TodosFilter clickFilter={this.clickFilter} filter={filter} />

          <button
            type="button"
            onClick={this.clearCompleted}
            className="clear-completed"
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
