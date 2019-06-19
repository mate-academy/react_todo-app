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
    total: 1,
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

  updateLenght = length => {
    this.setState({
      length,
    });
  };

  render() {
    const { todos, filter, length } = this.state;
    return (
      <section className="todoapp">
        <Header addTodo={this.addTodo} />
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            todos={todos}
            filter={filter}
            length={length}
            deleteTodo={this.deleteTodo}
            toggleTodo={this.toggleTodo}
            updateLength={this.updateLenght}
          />
        </section>
        <Footer todosTotal={length} changeFilter={this.changeFilter} />
      </section>
    );
  }
}

export default App;
