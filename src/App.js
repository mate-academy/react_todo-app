import React from 'react';

const App = () => <TodoApp />;

class TodoApp extends React.Component {
  state = {
    title: '',
    todos: [],
    selectedFilter: 'all',
  };

  handleTitleChange = (event) => {
    const { value } = event.target;

    this.setState({
      title: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.addTodo({
      title: this.state.title,
      id: new Date().getUTCMilliseconds(),
      completed: false,
    });

    this.setState({
      title: '',
    });
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  handleDelete = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  handleComplete = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo)),
    }));
  };

  handleAllComplete = () => {
    this.setState((prevState) => {
      if (prevState.todos.every(todo => (todo.completed))) {
        return {
          todos: prevState.todos.map(todo => ({
            ...todo,
            completed: !todo.completed,
          })),
        };
      }

      return {
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      };
    });
  };

  clearAllCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  render() {
    const { todos, title, selectedFilter } = this.state;
    const visibleTodos = todos.filter((todo) => {
      if (selectedFilter === 'active') {
        return !todo.completed;
      }

      if (selectedFilter === 'completed') {
        return todo.completed;
      }

      return true;
    });

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={this.handleTitleChange}
              value={title}
            />
          </form>
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onClick={this.handleAllComplete}
          />
          { /* eslint-disable-next-line */ }
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {visibleTodos.map(item => (
              <li
                key={item.id}
                className={item.completed ? 'completed' : ''}
              >
                <div className="view">
                  <input
                    type="checkbox"
                    className="toggle"
                    id={`todo-${item.id}`}
                    checked={item.completed}
                    onChange={() => this.handleComplete(item.id)}
                  />
                  { /* eslint-disable-next-line */ }
                  <label htmlFor={`todo-${item.id}`}>
                    {item.title}
                  </label>
                  <button
                    type="button"
                    className="destroy"
                    onClick={() => this.handleDelete(item.id)}
                  />
                </div>
              </li>

            ))}
          </ul>

        </section>

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {todos.filter(todo => !todo.completed).length}
            {' '}
            items left
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={selectedFilter === 'all' ? 'selected' : ''}
                onClick={() => this.setState({ selectedFilter: 'all' })}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={selectedFilter === 'active' ? 'selected' : ''}
                onClick={() => this.setState({ selectedFilter: 'active' })}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={selectedFilter === 'completed' ? 'selected' : ''}
                onClick={() => this.setState({ selectedFilter: 'completed' })}
              >
                Completed
              </a>
            </li>
          </ul>
          {visibleTodos.some(todo => todo.completed)
            ? (
              <button
                type="button"
                className="clear-completed"
                style={{ display: 'block' }}
                onClick={this.clearAllCompleted}
              >
                Clear completed
              </button>
            )
            : null}
        </footer>
      </section>
    );
  }
}

export default App;
