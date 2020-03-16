import React, { Component } from 'react';
import { AddTodo } from './Components/AddTodo/AddTodo';
import { TodoList } from './Components/TodoList/TodoList';
import { Filters } from './Components/Filters/Filters';

export class App extends Component {
  state = {
    todos: [],
    filter: 'all',
  };

  componentDidMount() {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos) {
      const todos = JSON.parse(savedTodos);

      this.setState({
        todos,
      });
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

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => (
        todo.id !== id
      )),
    }));
  }

  markAsCompleted = (id, checked) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        (todo.id === id)
          ? {
            ...todo,
            completed: checked,
          }
          : todo
      )),
    }));
  }

  markAllAsCompleted = ({ target: { checked } }) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        {
          ...todo,
          completed: checked,
        }
      )),
    }));
  }

  handleFilter = (filter) => {
    this.setState({
      filter,
    });
  }

  setFilter = () => {
    const { todos, filter } = this.state;
    const TODO_STATUS_ACTIVE = 'active';
    const TODO_STATUS_COMPLETED = 'completed';

    switch (filter) {
      case TODO_STATUS_ACTIVE:
        return todos.filter(todo => !todo.completed);
      case TODO_STATUS_COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  render() {
    const { todos, filter } = this.state;

    return (
      <section className="todoapp">
        <AddTodo addTodo={this.addTodo} />
        <TodoList
          deleteTodo={this.deleteTodo}
          markAsCompleted={this.markAsCompleted}
          markAllAsCompleted={this.markAllAsCompleted}
          todos={this.setFilter()}
        />
        <Filters
          todos={todos}
          filter={filter}
          handleFilter={this.handleFilter}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}
