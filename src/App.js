import React from 'react';
import TodoList from './components/TodoList';

class App extends React.PureComponent {
  state={
    todos: [],
    title: '',
    currentId: 1,
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, currentId } = this.state;

    if (title === '') {
      // add error handling
      return;
    } 

    const newTodo = {
      title,
      id: currentId,
      completed: false,
    };

    this.setState(state => ({
      currentId: currentId + 1,
      todos: [...state.todos, newTodo],
      title: '',
    }));
  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  handleCompleteChange = (event) => {
    const { id, checked } = event.target;
    const { todos } = this.state;

    this.setState({
      todos: todos.map((todo) => {
        if (todo.id === +id) {
          const result = { ...todo };

          result.completed = checked;

          return result;
        }

        return todo;
      }),
    });
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={this.handleTitleChange}
              value={this.state.title}
            />
          </form>

        </header>

        <section className="main">
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            todos={this.state.todos}
            onComplete={this.handleCompleteChange}
          />
        </section>

        <footer className="footer">
          <span className="todo-count">
            {this.state.todos.filter(todo => !todo.completed).length}
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

          <button type="button" className="clear-completed">
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
