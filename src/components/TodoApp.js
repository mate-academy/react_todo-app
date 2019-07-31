import React from 'react';
import TodoList from './TodoList';

class TodoApp extends React.Component {
  state = {
    todos: [],
    newTodo: { title: '' },
  }

  addTodo = (event) => {
    event.preventDefault();
    this.setState(prevState => ({
      todos: [...prevState.todos, prevState.newTodo],
      newTodo: { title: '' },
    }));
  }

  getTodo = (event) => {
    const title = event.target.value,
      id = Math.floor(Math.random() * Math.floor(1000)),
      newTodo = { id, title, completed: false };

    event.preventDefault();
    this.setState({
      newTodo,
    });
  }

  handleToggle = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        todo.id === todoId
          ? { ...todo, completed: !todo.completed }
          : todo
      )),
    }));
  };

  render() {
    return (
      <form onSubmit={this.addTodo}>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={this.getTodo}
              value={this.state.newTodo.title}
            />
          </header>
          <section className="main" style={{ display: 'block' }}>
            <input type="checkbox" id="toggle-all" className="toggle-all" />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <TodoList todos={this.state.todos} handleToggle={this.handleToggle} />
          </section>
          <footer className="footer" style={{ display: 'block' }}>
            <span className="todo-count">
              {this.state.todos.length} items left
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
            <button
              type="button"
              className="clear-completed"
              style={{ display: 'block' }}
            />
          </footer>
        </section>
      </form>
    );
  }
}

export default TodoApp;
