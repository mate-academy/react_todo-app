import React, { Component } from 'react';

import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';
import { FilterItems } from './components/FilterItems/FilterItems';

const filterTypes = ['All', 'Active', 'Completed'];

const filterTodos = (todos, filter) => {
  switch (filter) {
    case 'Active':
      return todos.filter(todo => todo.completed === false);
    case 'Completed':
      return todos.filter(todo => todo.completed === true);
    default:
      return todos;
  }
};

export class App extends Component {
  state = {
    todos: [],
    visibleTodos: [],
    filter: 'All',
  }

  componentDidMount() {
    const todosFromStorage = localStorage.getItem('todos');

    if (todosFromStorage) {
      const todos = JSON.parse(todosFromStorage);

      this.setState({ todos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { todos } = this.state;

    if (prevState.todos !== todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  addTodo = (todo) => {
    const { filter, todos } = this.state;

    this.setState((prevState) => {
      const allTodos = [...todos, todo];

      return {
        todos: allTodos,
        visibleTodos: filterTodos(allTodos, filter),
      };
    });
  }

  toggledCheck = (id, checked) => {
    const { filter } = this.state;

    this.setState((prevState) => {
      const allTodos = prevState.todos.map(todo => (
        todo.id === id
          ? {
            ...todo, completed: checked,
          }
          : todo
      ));

      return {
        todos: allTodos,
        visibleTodos: filterTodos(allTodos, filter),
      };
    });
  }

  filtered = (event) => {
    const filter = event.target.getAttribute('data-filter');
    const { todos } = this.state;

    this.setState((prevState) => {
      const allTodos = [...todos];

      return {
        visibleTodos: filterTodos(allTodos, filter),
        filter,
      };
    });
  }

  deleteTask = (id) => {
    const { filter } = this.state;

    this.setState((prevState) => {
      const allTodos = prevState.todos.filter(todo => todo.id !== id);

      return {
        todos: allTodos,
        visibleTodos: filterTodos(allTodos, filter),
      };
    });
  }

  clearCompleted = () => {
    const { filter } = this.state;

    this.setState((prevState) => {
      const allTodos = prevState.todos.filter(todo => !todo.completed);

      return {
        todos: allTodos,
        visibleTodos: filterTodos(allTodos, filter),
      };
    });
  }

  checkedAll = ({ target }) => {
    const { checked } = target;

    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: checked,
      })),
      visibleTodos: prevState.todos.map(todo => ({
        ...todo,
        completed: checked,
      })),
    }));
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
            onClick={this.checkedAll}
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
            {`${activeTodos.length} items left`}
          </span>
          <FilterItems
            filtered={this.filtered}
            filterTypes={filterTypes}
            filter={filter}
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
