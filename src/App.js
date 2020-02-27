import React from 'react';
import { TodoApp } from './components/TodoApp/TodoApp';
import { TodoList } from './components/TodoList/TodoList';

export class App extends React.Component {
  state = {
    todos: [],
    filter: 'All',
  }

  componentDidMount() {
    const persistedtodos = localStorage.getItem('todos');

    if (persistedtodos) {
      const todos = JSON.parse(persistedtodos);

      this.setState({ todos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  addNewTodo = (todo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        todo,
      ],
    }));
  }

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  handleCompleted = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        (todo.id === id)
          ? {
            ...todo,
            completed: !todo.completed,
          }
          : todo
      )),
    }));
  };

  toggleAllCompleted = (event) => {
    if (event.target.checked) {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo, completed: true,
        })),
      }));
    } else {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo, completed: false,
        })),
      }));
    }
  }

  deleteCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  filterTodos = (event) => {
    const { value } = event.target;

    this.setState({
      filter: value,
    });
  }

  handleFilters = () => {
    const { filter, todos } = this.state;

    switch (filter) {
      case 'Active': return todos.filter(todo => !todo.completed);
      case 'Completed': return todos.filter(todo => todo.completed);
      default: return todos;
    }
  }

  render() {
    const { todos } = this.state;

    const uncompletedTodo = [...todos].filter(todo => todo.completed === false);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoApp addNewTodo={this.addNewTodo} />
        </header>

        <section className="main">
          <TodoList
            todos={this.handleFilters()}
            onDeleteTodo={this.deleteTodo}
            onUpdateCompleted={this.handleCompleted}
            onToggleCompleted={this.toggleAllCompleted }
          />
        </section>

        <footer className="footer">
          <span className="todo-count">
            Items left:
            {uncompletedTodo.length}
          </span>

          <ul className="filters">
            <li>
              <button
                type="button"
                className="selected"
                onClick={this.filterTodos}
                value="All"
              >
              All
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={this.filterTodos}
                value="Active"
              >
              Active
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={this.filterTodos}
                value="Completed"
              >
                 Completed
              </button>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            onClick={this.deleteCompleted}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
