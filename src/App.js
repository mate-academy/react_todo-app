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
      },
    ],
    filter: 'all',
  };

  addTodo = todo => {
    this.setState(state => {
      const newTodo = {
        title: todo,
        completed: false,
      };

      return {
        todos: [...state.todos, newTodo],
      };
    });
  };

  toggleTodo = togledTodo => {
    this.setState(state => {
      const { todos } = state;
      const index = todos.findIndex(({ title }) => title === togledTodo);
      const newTodo = { ...todos[index], completed: !todos[index].completed };

      return {
        todos: [...todos.slice(0, index), newTodo, ...todos.slice(index + 1)],
      };
    });
  };

  deleteTodo = deletedTodo => {
    this.setState(state => {
      const { todos } = state;
      const index = todos.findIndex(({ title }) => title === deletedTodo);
      const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];

      return {
        todos: newTodos,
      };
    });
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  render() {
    const { todos, filter } = this.state;
    let todoList = [];
    switch (filter) {
      case 'active':
        todoList = todos.filter(({ completed }) => !completed);
        break;
      case 'completed':
        todoList = todos.filter(({ completed }) => completed);
        break;
      default:
        todoList = [...todos];
    }
    const length = todoList.length;

    return (
      <section className="todoapp">
        <Header addTodo={this.addTodo} />
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            todos={todoList}
            filter={filter}
            length={length}
            deleteTodo={this.deleteTodo}
            toggleTodo={this.toggleTodo}
            updateLength={this.updateLenght}
          />
        </section>
        <Footer todosTotal={length} changeFilter={this.changeFilter} filter={filter} />
      </section>
    );
  }
}

export default App;
