import React from 'react';
import TodoApp from './TodoApp';
import Todo from './Todo';

class App extends React.Component {
  state = {
    todos: [],
    completed: false,
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

      completed: prevState.completed,
    }));
  };

  handleToggle = (id) => {
    this.setState((prevState) => {
      const task = prevState.todos.find(todo => todo.id === id);
      task.completed = !task.completed;

      return {
        todos: prevState.todos,
      };
    });
  }

  handleChackAll = (event) => {
    const isTodoChecked = event.target.checked;

    this.setState((prevState) => {
      const allCheckedTodos = [
        ...prevState.todos,
      ];
      allCheckedTodos.forEach(todo => (todo.completed = isTodoChecked));

      return {
        todos: allCheckedTodos,
      };
    });
  }

  render() {
    const { todos } = this.state;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoApp
            onSubmit={this.addTodo}
          />

        </header>

        <section className="main" style={{ display: 'block' }}>
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {todos.map(todo => (
              <Todo
                key={todo.id}
                item={todo}
                toggle={this.handleToggle}
              />
            ))}
          </ul>
        </section>

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {`${todos.filter(todo => (!todo.completed)).length}
            items left`}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className="selected"
              >
                Active
              </a>
            </li>

            <li>
              <a href="#/active">
                <input
                  type="checkbox"
                  className="toggle"
                  id="todo-1"
                  checked={!(todos.some(todo => !todo.completed))}
                  onChange={this.handleChackAll}
                />
                  All
              </a>
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
