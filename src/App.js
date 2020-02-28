import React, { Component } from 'react';
import cn from 'classnames';
import { InputTodo } from './components/InputTodo';
import { TodoList } from './components/TodoList';

const filterTodos = (todos, filter) => {
  switch (filter) {
    case 'active':
      return todos.filter(todo => todo.completed === false);
    case 'completed':
      return todos.filter(todo => todo.completed === true);
    default:
      return todos;
  }
};

export class App extends Component {
  state = {
    todos: [],
    filter: 'all',
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  }

  toggleComplited = (id) => {
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

  handleCheckedAll = (event) => {
    if (event.target.checked) {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo, completed: true,
        })),
      }));
    } else {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo, completed: false,
        })),
      }));
    }
  }

  clearComplited = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.completed === false),
    }));
  }

  changeFilter = (event) => {
    this.setState({
      filter: event.target.id,
    });
  }

  render() {
    const { todos, filter } = this.state;
    const notFinishedTodo = todos.filter(todo => todo.completed === false);
    const prepTodos = filterTodos(todos, filter);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <InputTodo addTodo={this.addTodo} />
        </header>
        <section className="main">
          <TodoList
            todos={prepTodos}
            deleteTodo={this.deleteTodo}
            toggleComplited={this.toggleComplited}
            handleCheckedAll={this.handleCheckedAll}
          />
        </section>

        <footer className="footer">
          <span className="todo-count">
            {`${notFinishedTodo.length} items left`}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                id="all"
                className={cn({ selected: filter === 'all' })}
                onClick={this.changeFilter}
              >
              All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                id="active"
                className={cn({ selected: filter === 'active' })}
                onClick={this.changeFilter}
              >
              Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                id="completed"
                className={cn({ selected: filter === 'completed' })}
                onClick={this.changeFilter}
              >
              Completed
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            onClick={this.clearComplited}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}
