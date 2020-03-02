import React from 'react';
import cn from 'classnames';
import { TodoApp } from './components/TodoApp/TodoApp';
import { TodoList } from './components/TodoList/TodoList';

const handleFilters = (todos, filter) => {
  switch (filter) {
    case 'Active':
      return todos.filter(todo => !todo.completed);
    case 'Completed':
      return todos.filter(todo => todo.completed);
    default: return todos;
  }
};

export class App extends React.Component {
  state = {
    todos: [],
    filter: 'All',
  }

  componentDidMount() {
    const cachedTodos = localStorage.getItem('todos');

    if (cachedTodos) {
      const todos = JSON.parse(cachedTodos);

      this.setState({ todos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState.todos) === JSON.stringify(this.state)) {
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
    const { checked } = event.target;

    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: checked,
      })),
    }));
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

  render() {
    const { todos, filter } = this.state;
    const filteredTodos = handleFilters(todos, filter);
    const uncompletedTodo = todos.filter(todo => todo.completed === false);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoApp addNewTodo={this.addNewTodo} />
        </header>

        <section className="main">
          <TodoList
            todos={filteredTodos}
            onDeleteTodo={this.deleteTodo}
            onUpdateCompleted={this.handleCompleted}
            onToggleCompleted={this.toggleAllCompleted}
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
                className={cn({ selected: filter === 'All' })}
                onClick={this.filterTodos}
                value="All"
              >
              All
              </button>
            </li>

            <li>
              <button
                type="button"
                className={cn({ selected: filter === 'Active' })}
                onClick={this.filterTodos}
                value="Active"
              >
              Active
              </button>
            </li>

            <li>
              <button
                type="button"
                className={cn({ selected: filter === 'Completed' })}
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
