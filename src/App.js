import React, { Component } from 'react';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import { Filters } from './components/Filters';

export class App extends Component {
  state = {
    todos: [],
    filter: 'all',
  }

  addTodo = (newTodo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        newTodo,
      ],
    }));
  }

  toggleCompletedAll = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: !todo.completed,
      })),
    }));
  }

  handleCompeletedTodo = (id) => {
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
  }

  handleDeleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => (
        todo.id !== id
      )),
    }));
  }

  handleClearAllCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  handleFilter = (filter) => {
    this.setState({
      filter,
    });
  }

  setFilter = () => {
    const {
      todos,
      filter,
    } = this.state;

    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  render() {
    const {
      todos,
      filter,
    } = this.state;

    return (
      <section className="todoapp">
        <NewTodo
          addTodo={this.addTodo}
        />
        <TodoList
          todos={this.setFilter()}
          deleteTodo={this.handleDeleteTodo}
          completedTodo={this.handleCompeletedTodo}
          toggleCompletedAll={this.toggleCompletedAll}
        />
        <Filters
          todos={todos}
          filter={filter}
          leftItems={this.handleLeftItems}
          handleFilter={this.handleFilter}
          clearCompleted={this.handleClearAllCompleted}
        />
      </section>
    );
  }
}
