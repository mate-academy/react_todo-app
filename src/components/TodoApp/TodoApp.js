import React from 'react';
import TodoForm from '../TodoForm/TodoForm';
import Todo from '../Todo/Todo';

export default class TodoApp extends React.Component {
  state = {
    todos: [],
    todosToShow: 'all',
  }

  addTodo = (todo) => {
    if (todo.text.trim() !== '') {
      this.setState(prevState => ({
        todos: [todo, ...prevState.todos],
      }));
    }
  };

  handleDelete = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  }

  toggleComplete = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete,
          };
        }

        return todo;
      }),
    }));
  };

  updateTodoToShow = (value) => {
    this.setState({
      todosToShow: value,
    });
  }

  clearAllComplete = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.complete),
    }));
  }

  lengthOfTodos = () => (
    this.state.todos.filter(todo => todo.complete === false).length
  )

  toggleAllComplete = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        complete: !prevState.toggleAllComplete,
      })),
      toggleAllComplete: !prevState.toggleAllComplete,
    }));
  }

  render() {
    let todos = [];

    if (this.state.todosToShow === 'all') {
      todos = [...this.state.todos];
    } else if (this.state.todosToShow === 'active') {
      todos = this.state.todos.filter(todo => !todo.complete);
    } else if (this.state.todosToShow === 'complete') {
      todos = this.state.todos.filter(todo => todo.complete);
    }

    if (this.state.todos.length === 0) {
      return (
        <section className="todoapp">
          <TodoForm className="header" onSubmit={this.addTodo} />
        </section>
      );
    }
    return (
      <section className="todoapp">
        <TodoForm className="header" onSubmit={this.addTodo} />

        <section className="main" style={{ display: 'block' }}>
          <input
            onClick={this.toggleAllComplete}
            type="checkbox"
            id="toggle-all"
            name="toggleAll"
            className="toggle-all"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {todos.map(todo => (
              <Todo
                todos={todos}
                todo={todo}
                key={todo.id}
                text={todo.text}
                toDelete={() => this.handleDelete(todo.id)}
                toggleComplete={() => this.toggleComplete(todo.id)}
              />
            ))}
          </ul>
        </section>

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {`${this.lengthOfTodos()} items left`}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                onClick={() => this.updateTodoToShow('all')}
                style={{
                  borderColor:
                    this.state.todosToShow === 'all'
                      ? 'rgba(175, 47, 47, 0.2)'
                      : '',
                }}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                onClick={() => this.updateTodoToShow('active')}
                style={{
                  borderColor:
                    this.state.todosToShow === 'active'
                      ? 'rgba(175, 47, 47, 0.2)'
                      : '',
                }}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                onClick={() => this.updateTodoToShow('complete')}
                style={{
                  borderColor:
                    this.state.todosToShow === 'complete'
                      ? 'rgba(175, 47, 47, 0.2)'
                      : '',
                }}
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            style={{ display: 'block' }}
            onClick={this.clearAllComplete}
          >
            Clear all complete
          </button>
        </footer>
      </section>
    );
  }
}
