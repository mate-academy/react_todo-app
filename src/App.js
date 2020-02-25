import React, { Component } from 'react';
import TodoCreator from './components/TodoCreator/TodoCreator';
import TodoList from './components/TodoList/TodoList';
import TodoFilter from './components/TodoFilter/TodoFilter';

const filterTodosWithQuery = (
  todos, filter,
) => {
  if (filter === '') {
    return todos;
  }

  return todos.filter(todo => todo.completed === filter);
};

export default class App extends Component {
  state = {
    todos: [],
    filter: '',
    isChecked: false,
    checkActive: false,
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

  onShowAll = () => {
    this.setState({
      filter: '',
    });
  }

  onShowActive = () => {
    this.setState({
      filter: false,
    });
  }

  onShowCompleted = () => {
    this.setState({
      filter: true,
    });
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

  onHandleToggleAll = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
      checkActive: !prevState.checkActive,
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: !prevState.isChecked,
      })),
    }));
  }

  onBlur = () => {
    this.setState({
      checkActive: false,
    });
  }

  render() {
    const { filter, todos, checkActive } = this.state;
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
            handleBlur={this.onBlur}
            checked={checkActive}
          />
        </section>
        {todos.length > 0 && (
          <footer className="footer">
            <span className="todo-count">
              {`${this.countNotCompleted()} items left`}
            </span>
            <TodoFilter
              handleShowAll={this.onShowAll}
              handleShowCompleted={this.onShowCompleted}
              handleShowActive={this.onShowActive}
              handleSelect={this.onHandleFilter}
              handleClearCompleted={this.onClearCompleted}
            />
          </footer>
        )}
      </section>
    );
  }
}
