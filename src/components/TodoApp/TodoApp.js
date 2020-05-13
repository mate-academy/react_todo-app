import React from 'react';
import TodoList from '../TodoList/TodoList';

class TodoApp extends React.Component {
  state = {
    todos: [],
    newTodoTitle: '',
    filterForTodos: 'All',
    isToggleAll: false,
  }

  handleFilterForTodos = (event) => {
    const filter = event.target.innerText;

    this.setState({
      filterForTodos: filter,
    });
  }

  handleTodoTitle = (event) => {
    this.setState({
      newTodoTitle: event.target.value,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.newTodoTitle.trim() === '') {
      return;
    }

    this.setState((prev) => {
      const newTodo = {
        id: +new Date(),
        title: prev.newTodoTitle,
        completed: false,
      };

      return {
        todos: [...prev.todos, newTodo],
        newTodoTitle: '',
      };
    });
  };

  toggleChecked = (todoId) => {
    this.setState(prev => ({
      todos: prev.todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return {
          ...todo,
        };
      }),
    }));
  }

  toggleAllTodos = (event) => {
    const countOfcompletedTodos = this.state.todos
      .filter(todo => todo.completed).length;

    if (countOfcompletedTodos < this.state.todos.length) {
      this.setState(prev => ({
        isToggleAll: true,
        todos: prev.todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      }));
    }

    if (countOfcompletedTodos === this.state.todos.length) {
      this.setState(prev => ({
        isToggleAll: false,
        todos: prev.todos.map(todo => ({
          ...todo,
          completed: false,
        })),
      }));
    }
  }

  destroyItem = (todoId) => {
    this.setState(prev => ({
      todos: prev.todos.filter(todo => todo.id !== todoId),
    }));
  }

  destoyCompletedItems = () => {
    this.setState(prev => ({
      todos: prev.todos.filter(todo => !todo.completed),
    }));
  }

  render() {
    let todos = [...this.state.todos];
    const { filterForTodos, newTodoTitle, isToggleAll } = this.state;

    if (filterForTodos === 'Active') {
      todos = this.state.todos.filter(todo => !todo.completed);
    }

    if (filterForTodos === 'Completed') {
      todos = this.state.todos.filter(todo => todo.completed);
    }

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
              value={newTodoTitle}
              onChange={this.handleTodoTitle}
            />
          </form>
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={isToggleAll}
            onChange={this.toggleAllTodos}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={todos}
            toggleChecked={this.toggleChecked}
            destroyItem={this.destroyItem}
          />
        </section>

        <footer className="footer">
          <span className="todo-count">
            {`${this.state.todos
              .filter(todo => !todo.completed).length} items left`}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/all"
                className={
                  this.state.filterForTodos === 'All'
                    ? 'selected'
                    : undefined
                }
                onClick={this.handleFilterForTodos}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={
                  this.state.filterForTodos === 'Active'
                    ? 'selected'
                    : undefined
                }
                onClick={this.handleFilterForTodos}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={
                  this.state.filterForTodos === 'Completed'
                    ? 'selected'
                    : undefined
                }
                onClick={this.handleFilterForTodos}
              >
                Completed
              </a>
            </li>
          </ul>
          {this.state.todos.filter(todo => todo.completed).length > 0
            ? (
              <button
                type="button"
                className="clear-completed"
                onClick={this.destoyCompletedItems}
              >
                Clear completed
              </button>
            )
            : ''
          }
        </footer>
      </section>
    );
  }
}

export default TodoApp;
