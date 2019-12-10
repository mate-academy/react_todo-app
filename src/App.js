import React from 'react';
import TodoList from './components/TodoList';
import AddNewTodo from './components/AddNewTodo';

class App extends React.Component {
  state = {
    todos: [],
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }
    ));
  };

  render() {
    const { todos } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <AddNewTodo
            onSubmit={this.addTodo}
            todos={todos}
          />

        </header>

        <TodoList todos={todos} />

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {todos.length}
            {' items left'}
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
