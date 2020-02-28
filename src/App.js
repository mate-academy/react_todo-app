import React, { Component } from 'react';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import { Footer } from './components/TodoFooter';
import { filterTypes } from './components/Filter';

class App extends Component {
  state = {
    todos: [],
    activeFilter: filterTypes.all,
  }

  componentDidMount() {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      const todos = JSON.parse(storedTodos);

      this.setState({ todos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  deleteTodo = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  }

  clearAllCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  setFilter = (filter) => {
    this.setState({
      activeFilter: filter,
    });
  }

  filterTodos = () => {
    const { activeFilter, todos } = this.state;

    switch (activeFilter) {
      case filterTypes.active:
        return todos.filter(todo => !todo.completed);
      case filterTypes.completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos.filter(todo => todo.id);
    }
  }

  checkTodo = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      }),
    }));
  }

  toggleAll = () => {
    const { todos } = this.state;

    this.setState((prevState) => {
      if (todos.every(todo => todo.completed)) {
        return {
          todos: prevState.todos.map(todo => ({
            ...todo,
            completed: false,
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
  }

  render() {
    const { todos, activeFilter } = this.state;
    const filteredTodos = this.filterTodos();

    const checkComplete = todos.every(todo => todo.completed);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addTodo={this.addTodo} />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={this.toggleAll}
            checked={checkComplete}

          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={todos}
            filteredTodos={filteredTodos}
            deleteTodo={this.deleteTodo}
            checkTodo={this.checkTodo}
          />
        </section>

        <Footer
          todos={todos}
          activeFilter={activeFilter}
          onSetFilter={this.setFilter}
          onClearCompleted={this.clearAllCompleted}
        />
      </section>
    );
  }
}

export default App;
