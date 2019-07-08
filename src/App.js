import React, { Component } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

import './app.css';

class App extends Component {
  state = {
    todos: [
      {
        title: 'drink coffee',
        completed: false,
        id: new Date().toISOString(),
      },
    ],
    filter: 'all',
  };

  addTodo = todo => {
    this.setState(prevState => {
      const newTodo = {
        title: todo,
        completed: false,
        id: new Date().toISOString(),
      };

      return {
        todos: [...prevState.todos, newTodo],
      };
    });
  };

  toggleTodo = togledTodo => {
    this.setState(prevState => {
      const { todos } = prevState;
      const index = todos.findIndex(({ id }) => id === togledTodo);
      const newTodo = { ...todos[index], completed: !todos[index].completed };

      return {
        todos: [...todos.slice(0, index), newTodo, ...todos.slice(index + 1)],
      };
    });
  };

  deleteTodo = deletedTodo => {
    this.setState(prevState => {
      const { todos } = prevState;
      const index = todos.findIndex(({ id }) => id === deletedTodo);
      const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];

      return {
        todos: newTodos,
      };
    });
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  getTodos(todos, filter) {
    switch (filter) {
      case 'active':
        return todos.filter(({ completed }) => !completed);
      case 'completed':
        return todos.filter(({ completed }) => completed);
      default:
        return todos;
    }
  }

  render() {
    const { todos, filter } = this.state;
    const todoList = this.getTodos(todos, filter);

    return (
      <section className="todoapp">
        <Header addTodo={this.addTodo} />
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList todos={todoList} deleteTodo={this.deleteTodo} toggleTodo={this.toggleTodo} />
        </section>
        <Footer todosTotal={todoList.length} changeFilter={this.changeFilter} filter={filter} />
      </section>
    );
  }
}

export default App;
