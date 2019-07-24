import React from 'react';
import TodoApp from './TodoApp';
import Todo from './Todo';

class App extends React.Component {
  state = {
    todos: [],
  }

  addTodo = (title) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ],

    }));
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoApp
            listOfTodos={this.state.todos}
            onSubmit={this.addTodo}
          />

        </header>

        <section className="main" style={{ display: 'block' }}>
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {this.state.todos.map(todo => (
              <Todo
                key={todo.id}
                item={todo}
              />
            ))}
          </ul>
        </section>

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
             items left
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
    );
  }
}

export default App;
