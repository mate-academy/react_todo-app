import React, { Component } from 'react';

import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';
import { FilterItems } from './components/FilterItems/FilterItems';

const filterTypes = ['All', 'Active', 'Completed'];

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

    this.setState((prevState) => {
      const obj = {
        todos: [...todos, todo],
      };

      return {
        todos: obj.todos,
        visibleTodos: filter === 'All'
          ? obj.todos
          : obj.todos.filter(task => task.completed === Boolean(filter)),
      };
    });
  }

  toggledCheck = (id, checked) => {
    const { filter } = this.state;

    this.setState((prevState) => {
      const obj = {
        todos: prevState.todos.map(todo => (
          todo.id === id
            ? {
              ...todo, completed: checked,
            }
            : todo
        )),
      };

      return {
        todos: obj.todos,
        visibleTodos: filter === 'All'
          ? obj.todos
          : obj.todos.filter(task => task.completed === Boolean(filter)),
      };
    });
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
    const { filter } = this.state;

    this.setState((prevState) => {
      const obj = {
        todos: prevState.todos.filter(todo => todo.id !== id),
      };

      return {
        todos: obj.todos,
        visibleTodos: filter === 'All'
          ? obj.todos
          : obj.todos.filter(task => task.completed === Boolean(filter)),
      };
    });
  }

  clearCompleted = () => {
    this.setState((prevState) => {
      const obj = {
        todos: prevState.todos.filter(todo => !todo.completed),
      };

      return {
        todos: obj.todos,
        visibleTodos: obj.todos,
      };
    });
  }

  checkedAll = (event) => {
    if (event.target.checked) {
      this.setState((prevState) => {
        const obj = {
          todos: prevState.todos.map(todo => (
            {
              ...todo,
              completed: true,
            }
          )),
        };

        return {
          todos: obj.todos,
          visibleTodos: obj.todos,
        };
      });
    } else {
      this.setState((prevState) => {
        const obj = {
          todos: prevState.todos.map(todo => (
            {
              ...todo,
              completed: false,
            }
          )),
        };

        return {
          todos: obj.todos,
          visibleTodos: obj.todos,
        };
      });
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
