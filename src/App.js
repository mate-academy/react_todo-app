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

  if (filter === 'completed') {
    return todos.filter(todo => todo.completed);
  }

  return todos.filter(todo => !todo.completed);
};

export default class App extends Component {
  state = {
    todos: [],
    filter: 'all',
  };

  componentDidMount() {
    const persistedTodos = localStorage.getItem('todos');

    if (persistedTodos) {
      const todos = JSON.parse(persistedTodos);

      this.setState({ todos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  onHanleFilter = (e) => {
    const { name } = e.target;

    switch (name) {
      case 'all':
        this.setState({
          filter: 'all',
        });
        break;
      case 'completed':
        this.setState({
          filter: 'completed',
        });
        break;
      case 'active':
        this.setState({
          filter: 'active',
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
      todos: prevState.todos.map(todo => (todo.id === id
        ? {
          ...todo, completed: !todo.completed,
        } : todo)),
    }));
  }

  onClearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  isAllChecked = () => this.state.todos.every(todo => todo.completed);

  onHandleToggleAll = (checked) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: !checked,
      })),
    }));
  }

  render() {
    const {
      filter,
      todos,
    } = this.state;
    const filteredTodos = filterTodosWithQuery(todos, filter);
    const isAllChecked = this.isAllChecked();

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
            checked={isAllChecked}
          />
        </section>
        {todos.length > 0 && (
          <footer className="footer">
            <span className="todo-count">
              {`${this.countNotCompleted()} items left`}
            </span>
            <TodoFilter
              handleFilter={this.onHanleFilter}
              handleSelect={this.onHandleFilter}
              handleClearCompleted={this.onClearCompleted}
            />
          </footer>
        )}
      </section>
    );
  }
}
