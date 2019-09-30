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

  lengthOfTodos = () => (
    this.state.todos.filter(todo => todo.complete === false).length
  )

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
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            // checked={filteredTodos.every(item => item.completed)}
          />
          <label htmlFor="toggle-all" id="">Mark all as complete</label>
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
                className="selected"
                onClick={() => this.updateTodoToShow('all')}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                onClick={() => this.updateTodoToShow('active')}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                onClick={() => this.updateTodoToShow('complete')}
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            style={{ display: 'block' }}
          />
        </footer>
      </section>
    );
  }
}
