import React, { Component } from 'react';
import TodoCreator from './components/TodoCreator/TodoCreator';
import TodoList from './components/TodoList/TodoList';
import TodoFilter from './components/TodoFilter/TodoFilter';

const filterTodosWithQuery = (
  todos, filter,
) => {
  if (filter === 'all') {
    return todos;
  }

  return todos.filter(todo => todo.completed === filter);
};

export default class App extends Component {
  state = {
    todos: [],
    filter: 'all',
  };

  onHandleFilter = (e) => {
    const filter = e.target.name;

    switch (filter) {
      case 'false':
        this.setState({
          filter: false,
        });
        break;
      case 'true':
        this.setState({
          filter: true,
        });
        break;
      case 'all':
        this.setState({
          filter: 'all',
        });
        break;
      default:
    }
  }

  countNotCompleted = () => {
    const { todos } = this.state;

    return todos.filter(todo => !todo.completed).length;
  }

  onAddTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  onDeleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  }

  onUpdateCompleted = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (todo.id === id ? {
        ...todo, completed: !todo.completed,
      } : todo)),
    }));
  }

  onClearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  onHandleToggleAll = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: true,
      })),
    }));
  }

  render() {
    const { filter, todos } = this.state;
    const filteredTodos = filterTodosWithQuery(todos, filter);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoCreator addTodo={this.onAddTodo} />
        </header>

        <section className="main">
          <TodoList
            todos={filteredTodos}
            deleteTodo={this.onDeleteTodo}
            updateCompleted={this.onUpdateCompleted}
            handleToggleAll={this.onHandleToggleAll}
          />

        </section>

        <footer className="footer">
          <span className="todo-count">
            {`${this.countNotCompleted()} items left`}
          </span>
          <TodoFilter
            handleSelect={this.onHandleFilter}
            handleClearCompleted={this.onClearCompleted}
          />
        </footer>
      </section>
    );
  }
}
