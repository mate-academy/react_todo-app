import React from 'react';
import getTodos from './api/todos';
import TodoApp from './TodoApp';
import NewTodo from './NewTodo';

class App extends React.Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    this.setState({ todos: getTodos });
  }

  addTodo = (title) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          title,
          id: prevState.todos.length + 1,
          completed: false,
        },
      ],
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addTodo={this.addTodo} />
        </header>

        <TodoApp
          todos={todos}
        />

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {`${todos.length} items left`}
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
