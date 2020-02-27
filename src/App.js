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

  handleLeftItems = () => (
    this.state.todos.filter(todo => !todo.completed).length
  )

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

    let preparedTodos;

    switch (filter) {
      case 'active':
        preparedTodos = [...todos].filter(todo => !todo.completed);

        return preparedTodos;
      case 'completed':
        preparedTodos = [...todos].filter(todo => todo.completed);

        return preparedTodos;
      default:
        preparedTodos = todos;

        return preparedTodos;
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
