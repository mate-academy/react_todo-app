import React, { Component } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { Footer } from './components/Footer/Footer';

export class App extends Component {
  state = {
    todos: [],
    isActiveFilter: 'all',
  }

  componentDidMount() {
    const savedTodos = localStorage.getItem('todos');
    const savedFilter = localStorage.getItem('filter');

    const todos = savedTodos ? JSON.parse(savedTodos) : this.state.todos;
    const isActiveFilter = savedFilter || this.state.isActiveFilter;

    if (todos) {
      this.setState({
        todos,
        isActiveFilter,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }

    if (prevState.isActiveFilter !== this.state.isActiveFilter) {
      localStorage.setItem('filter', this.state.isActiveFilter);
    }
  }

  addTodo = (todo) => {
    if (todo.title) {
      this.setState(prevState => ({
        todos: [...prevState.todos, todo],
      }));
    }
  }

  setCompleted = (id) => {
    const callback = (todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    };

    this.setState(prevState => ({
      todos: prevState.todos.map(callback),
    }));
  }

  setAllCompleted = (checked) => {
    const callback = todo => (
      {
        ...todo,
        completed: checked,
      }
    );

    this.setState(prevState => ({
      todos: prevState.todos.map(callback),
    }));
  }

  editTodo = (editTodoTitle, editTododId) => {
    const callback = (todo) => {
      if (todo.id === editTododId) {
        return {
          ...todo,
          title: editTodoTitle,
        };
      }

      return todo;
    };

    this.setState(prevState => ({
      todos: prevState.todos.map(callback),
    }));
  }

  removeTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  }

  clearCompletedTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  setFilter = (filter) => {
    this.setState({
      isActiveFilter: filter,
    });
  }

  setFilteredTodos = () => {
    const { todos, isActiveFilter } = this.state;

    switch (isActiveFilter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  render() {
    const { todos, isActiveFilter } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoForm addTodo={this.addTodo} />
        </header>

        <section className="main">
          <TodoList
            todos={this.setFilteredTodos()}
            setCompleted={this.setCompleted}
            setAllCompleted={this.setAllCompleted}
            removeTodo={this.removeTodo}
            completedTodos={this.completedTodos}
            editTodo={this.editTodo}
          />
        </section>

        {!todos.length
          || (
            <footer className="footer">
              <Footer
                todos={todos}
                clearCompletedTodos={this.clearCompletedTodos}
                isActiveFilter={isActiveFilter}
                setFilter={this.setFilter}
              />
            </footer>
          )}
      </section>
    );
  }
}
