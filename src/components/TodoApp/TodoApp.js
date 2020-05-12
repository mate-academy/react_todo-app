import React from 'react';
import TodoList from '../TodoList/TodoList';

class TodoApp extends React.Component {
  state = {
    todos: [
      {
        title: 'qwerty',
        id: 1,
        completed: false,
      },
      {
        title: 'asdfgh',
        id: 2,
        completed: false,
      },
      {
        title: 'zxcvb',
        id: 3,
        completed: false,
      },
    ],

    newTodoTitle: '',
  }

  handleTodoTitle = (event) => {
    this.setState({
      newTodoTitle: event.target.value.trim(),
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    this.setState((prev) => {
      const newTodo = {
        id: +new Date(),
        title: prev.newTodoTitle,
        completed: false,
      };

      return {
        todos: [...prev.todos, newTodo],
      };
    });
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <form
            onSubmit={this.handleFormSubmit}
          >
            <input
              type="text"
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={this.handleTodoTitle}
            />
          </form>
        </header>

        <section className="main">
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList todos={this.state.todos} />
        </section>

        <footer className="footer">
          <span className="todo-count">
            {`${this.state.todos.length} items left`}
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

export default TodoApp;
